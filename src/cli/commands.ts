import { existsSync, readFileSync, writeFileSync } from "fs";
import { promptFeat, promptFeatDescription, promptInit } from "./promps";
import { AIContext } from "../strategy/ai/context";
import { GitContext } from "../strategy/git/context";
import { GithubStrategy } from "../strategy/git/strategies/github-strategy";
import { ChatGPTStrategy } from "../strategy/ai/strategies/chat-gpt-strategy";
import { GeminiStrategy } from "../strategy/ai/strategies/gemini-strategy";
import { GitUtils } from "../utils/git";
import { updateChangelogFile } from "../utils/changelog";
import { updatePackageJsonVersion } from "../utils/package";

export async function commandInit() {
  const { ai, git, baseDir } = await promptInit();
  writeFileSync('.version-sync', JSON.stringify({ ai, git, baseDir }, null, 2));
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
  const gitContext = new GitContext(new GithubStrategy());
  const packageJson = JSON.parse(readFileSync('package.json', 'utf-8'));
  const currentVersion = packageJson.version;
  const { newVersion, title } = await promptFeat(currentVersion);
  const diffOutput = GitUtils.getGitDiff(config.baseDir ?? undefined);

  if (!diffOutput) {
    console.log("Não houve nenhuma alteração significativa.");
    return;
  }

  try {
    const description = await aiContext.formatReleaseDescription(diffOutput);
    gitContext.createRelease(newVersion, title, description);
    updateChangelogFile(newVersion, title, description);
    updatePackageJsonVersion(newVersion);
  } catch (error) {
    console.error("Erro ao gerar descrição: ", error.message);
    const userDescription = await promptFeatDescription();
    gitContext.createRelease(newVersion, title, userDescription);
    updateChangelogFile(newVersion, title, userDescription);
    updatePackageJsonVersion(newVersion);
  }
}