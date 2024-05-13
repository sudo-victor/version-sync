import 'dotenv/config'
import inquirer from 'inquirer'
import { execSync } from 'child_process'
import { readFileSync, writeFileSync } from 'fs'
import { OpenAI } from 'openai'

const openai = new OpenAI();

function execCommand(command) {
  try {
    return execSync(command, { encoding: 'utf-8' }).trim();
  } catch (error) {
    console.error('Erro ao executar comando:', error.message);
    process.exit(1);
  }
}

function getGitDiff() {
  const diff = execCommand('git diff HEAD~1 HEAD');
  return diff;
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
  Transforme a seguinte saída do comando 'git diff' em um changelog formatado em markdown. Analise semanticamente as mudanças no código para determinar se são adições, remoções ou modificações, e categorize-as apropriadamente. Use um estilo claro e conciso para descrever as mudanças, garantindo que o changelog seja fácil de entender e útil para os desenvolvedores que acompanham as atualizações.
  
  ### Saída do Git Diff:
  \`\`\`
  ${diffOutput}
  \`\`\`
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

function createGithubRelease(tagName, title, description) {
  const command = `gh release create ${JSON.stringify(tagName)} --title ${JSON.stringify(title)} --notes ${JSON.stringify(description).replaceAll('`', '')}`;
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
  updatePackageJsonVersion(newVersion);
  const diffOutput = getGitDiff();
  const description = await formatReleaseDescriptionWithChatGPT(diffOutput);
  createGithubRelease(newVersion, title, description);
}

main();
