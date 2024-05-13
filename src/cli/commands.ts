import { existsSync, readFileSync, writeFileSync } from "fs";
import { promptFeat, promptInit } from "./promps";
import { AIContext } from "../strategy/ai/context";
import { GitContext } from "../strategy/git/context";
import { GithubStrategy } from "../strategy/git/strategies/github-strategy";
import { ChatGPTStrategy } from "../strategy/ai/strategies/chat-gpt-strategy";
import { GeminiStrategy } from "../strategy/ai/strategies/gemini-strategy";
import { GitUtils } from "../utils/git";
import { updateChangelogFile } from "../utils/changelog";
import { updatePackageJsonVersion } from "../utils/package";

export async function commandInit() {
  const { ai, git } = await promptInit();
  writeFileSync('.version-sync', JSON.stringify({ ai, git }, null, 2));
  console.log('Arquivo .version-sync criado.');
}

export async function commandFeat() {
  const configFile = '.version-sync';
  if (!existsSync(configFile)) {
    console.error('Erro: Arquivo de configuração não encontrado. Execute o comando `init`.');
    process.exit(1);
  }
  const config = JSON.parse(readFileSync(configFile, 'utf-8'));
  const aiContext = new AIContext(config.ai === 'chatgpt' ? new ChatGPTStrategy() : new GeminiStrategy());
  const gitContext = new GitContext(new GithubStrategy())
  const packageJson = JSON.parse(readFileSync('package.json', 'utf-8'));
  const currentVersion = packageJson.version;
  const { newVersion, title } = await promptFeat(currentVersion);
  const diffOutput = GitUtils.getGitDiff();
  if (!diffOutput) {
    console.log("Não teve nenhuma alteração")
    return
  }
  const description = await aiContext.formatReleaseDescription(diffOutput);
  gitContext.createRelease(newVersion, title, description);
  updateChangelogFile(newVersion, title, description);
  updatePackageJsonVersion(newVersion);

}