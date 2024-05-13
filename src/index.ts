#!/usr/bin/env node
import 'dotenv/config'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { commandFeat, commandInit } from './cli/commands'

yargs(hideBin(process.argv))
  .command('init', 'Inicializa o arquivo de configuração', commandInit)
  .command('feat', 'Adicionar uma nova versão', commandFeat)
  .demandCommand(1, 'Você deve fornecer pelo menos um comando.')
  .help()
  .argv;
