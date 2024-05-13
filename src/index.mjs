#!/usr/bin/env node
import 'dotenv/config'
import inquirer from 'inquirer'
import { execSync } from 'child_process'
import { readFileSync, writeFileSync, existsSync } from 'fs'
import { GoogleGenerativeAI } from "@google/generative-ai";
// import { OpenAI } from 'openai'

// const openai = new OpenAI();
const geminiai = new GoogleGenerativeAI(process.env.GEMINI_KEY);
const geminiModel = geminiai.getGenerativeModel({ model: "gemini-1.0-pro" });

function execCommand(command, exit=false) {
  try {
    return execSync(command, { encoding: 'utf-8' }).trim();
  } catch (error) {
    if (exit) {
      console.error('Erro ao executar comando:', error.message);
      process.exit(1);
    }
  }
}

function updateChangelogFile(version, title, description) {
  const changelogPath = 'CHANGELOG.md';
  let changelogContent = existsSync(changelogPath) ? readFileSync(changelogPath, 'utf-8') : '';
  const newEntry = `## ${version} - ${new Date().toISOString().split('T')[0]}\n### ${title}\n${description}\n\n`;
  changelogContent = newEntry + changelogContent;
  writeFileSync(changelogPath, changelogContent, 'utf-8');
}

function fetchTags() {
  console.log('Buscando tags do repositório remoto...');
  execCommand('git fetch --tags');
}

function getLastReleaseTag() {
  try {
    fetchTags();
    return execCommand('git describe --tags --abbrev=0');
  } catch (error) {
    console.log('Nenhuma tag encontrada. Usando o primeiro commit como referência.');
    return execCommand('git rev-list --max-parents=0 HEAD');
  }
}

function getGitDiff() {
  const lastTag = getLastReleaseTag();
  if (lastTag) {
    const diff = execCommand(`git diff ${lastTag} HEAD`);
    return diff;
  } else {
    console.log('Nenhum commit anterior encontrado para comparar.');
    return '';
  }
}

function incrementVersion(version, changeType) {
  let [major, minor, patch] = version.split('.').map(Number);

  switch (changeType) {
    case 'major':
      major += 1;
      minor = 0;
      patch = 0;
      break;
    case 'minor':
      minor += 1;
      patch = 0;
      break;
    case 'patch':
      patch += 1;
      break;
  }

  return `${major}.${minor}.${patch}`;
}

function updatePackageJsonVersion(newVersion) {
  const packageJson = JSON.parse(readFileSync('package.json', 'utf-8'));
  packageJson.version = newVersion;
  writeFileSync('package.json', JSON.stringify(packageJson, null, 2), 'utf-8');
  return newVersion;
}

async function formatReleaseDescriptionWithChatGPT(diffOutput) {
  const prompt = `
  Transforme a seguinte saída do comando 'git diff' em um changelog formatado em markdown.
  Analise semanticamente as mudanças no código para determinar se são adições, remoções ou modificações, e categorize-as apropriadamente.
  Use um estilo claro e conciso para descrever as mudanças, garantindo que o changelog seja fácil de entender e útil para os desenvolvedores que acompanham as atualizações.
  Responda em portguês. Ignore modificaçoes irrelevantes, como remover comentários ou trocar aspas simples para aspas duplas.

  Saída do Git Diff:
  ${diffOutput}
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4-0125-preview",
      messages: [{ role: 'user', content: prompt }]
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('Erro ao conectar-se com o GPT-4:', error.message);
    process.exit(1);
  }
}

async function formatReleaseDescriptionWithGemini(diffOutput) {
  const prompt = `
  Transforme a seguinte saída do comando 'git diff' em um changelog formatado em markdown.
  Analise semanticamente as mudanças no código para determinar se são adições, remoções ou modificações, e categorize-as apropriadamente.
  Use um estilo claro e conciso para descrever as mudanças, garantindo que o changelog seja fácil de entender e útil para os desenvolvedores que acompanham as atualizações.
  Responda em portguês. Ignore modificaçoes irrelevantes, como remover comentários ou trocar aspas simples para aspas duplas.

  Saída do Git Diff:
  ${diffOutput}
  `;

  try {
    const result = await geminiModel.generateContent([
      prompt
    ]);
    const response = result.response.text();
    return response
  } catch (error) {
    console.error('Erro ao conectar-se com o GPT-4:', error.message);
    process.exit(1);
  }
}

function createGithubRelease(tagName, title, description) {
  const command = `gh release create ${JSON.stringify(tagName)} --title ${JSON.stringify(title)} --notes "${description.replace(/`/g, '')}"`;
  execCommand(command);
}

async function promptUser(currentVersion) {
  const questions = [
    {
      type: 'list',
      name: 'changeType',
      message: 'Qual é a natureza da mudança nesta versão?',
      choices: [
        { name: 'Mudança que quebra código (major)', value: 'major' },
        { name: 'Nova funcionalidade (minor)', value: 'minor' },
        { name: 'Correção de bug ou pequena alteração (patch)', value: 'patch' }
      ]
    },
    {
      type: 'input',
      name: 'title',
      message: 'Informe o título da release:'
    }
  ];

  const answers = await inquirer.prompt(questions);
  const newVersion = incrementVersion(currentVersion, answers.changeType);
  return { newVersion, ...answers };
}

async function main() {
  const packageJson = JSON.parse(readFileSync('package.json', 'utf-8'));
  const currentVersion = packageJson.version;
  const { newVersion, title } = await promptUser(currentVersion);
  const diffOutput = getGitDiff();
  const description = await formatReleaseDescriptionWithGemini(diffOutput)
  createGithubRelease(newVersion, title, description);
  updateChangelogFile(newVersion, title, description)
  updatePackageJsonVersion(newVersion);
}

main();
