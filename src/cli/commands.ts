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
  if (config.ai === "none") {
    const gitContext = new GitContext(new GithubStrategy());
    const packageJson = JSON.parse(readFileSync('package.json', 'utf-8'));
    const currentVersion = packageJson.version;
    const { newVersion, title } = await promptFeat(currentVersion);  console.error("Erro ao gerar descrição com ", config.ai);
    const userDescription = await promptFeatDescription();
    console.log("Criando nova release no", config.git);
    const releaseURL = await gitContext.createRelease(newVersion, title, userDescription);
    console.log(releaseURL)
    console.log("Atualizando arquivo CHANGELOG.md");
    updateChangelogFile(newVersion, title, userDescription);
    updatePackageJsonVersion(newVersion);
    return
  }
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
    console.log("Gerando changelog com", config.ai);
    const description = await aiContext.formatReleaseDescription(diffOutput);
    console.log("Criando nova release no", config.git);
    const releaseURL = await gitContext.createRelease(newVersion, title, description);
    console.log(releaseURL)
    console.log("Atualizando arquivo CHANGELOG.md", config.git);
    updateChangelogFile(newVersion, title, description);
    updatePackageJsonVersion(newVersion);
  } catch (error) {
    console.error("Erro ao gerar descrição com ", config.ai);
    const userDescription = await promptFeatDescription();
    console.log("Criando nova release no", config.git);
    const releaseURL = await gitContext.createRelease(newVersion, title, userDescription);
    console.log(releaseURL)
    console.log("Atualizando arquivo CHANGELOG.md");
    updateChangelogFile(newVersion, title, userDescription);
    updatePackageJsonVersion(newVersion);
  }
}