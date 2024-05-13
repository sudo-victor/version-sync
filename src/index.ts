#!/usr/bin/env node
import 'dotenv/config'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { readFileSync, writeFileSync, existsSync } from 'fs'
import { GithubStrategy } from './strategy/git/strategies/github-strategy'
import { updatePackageJsonVersion } from './utils/package'
import { AIContext } from './strategy/ai/context'
import { GeminiStrategy } from './strategy/ai/strategies/gemini-strategy'
import { promptFeat, promptInit } from './cli/promps'
import { ChatGPTStrategy } from './strategy/ai/strategies/chat-gpt-strategy'
import { GitContext } from './strategy/git/context'
import { GitUtils } from './utils/git'
import { updateChangelogFile } from './utils/changelog'

yargs(hideBin(process.argv))
  .command('init', 'Inicializa o arquivo de configuração', async () => {
    const { ai, git } = await promptInit();
    writeFileSync('.version-sync', JSON.stringify({ ai, git }, null, 2));
    console.log('Arquivo .version-sync criado com configuração padrão para Gemini.');
  })
  .command('feat', 'Adicionar uma nova versão', async () => {
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
  })
  .demandCommand(1, 'Você deve fornecer pelo menos um comando.')
  .help()
  .argv;
