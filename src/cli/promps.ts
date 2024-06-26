import inquirer from "inquirer";
import { incrementVersion } from "../utils/package";

export async function promptFeat(currentVersion: string) {
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


export async function promptFeatDescription() {
  const questions = [
    {
      type: 'input',
      name: 'additions',
      message: 'Descreva as adições feitas no código:',
    },
    {
      type: 'input',
      name: 'removals',
      message: 'Descreva as remoções feitas no código:',
    },
    {
      type: 'input',
      name: 'changes',
      message: 'Descreva as mudanças feitas no código:',
    }
  ];
  
  const answers = await inquirer.prompt(questions);
  return `### Adições\n${answers.additions}\n\n### Remoções\n${answers.removals}\n\n### Mudanças\n${answers.changes}`;
}

export async function promptInit() {
  const questions = [
    {
      type: 'list',
      name: 'ai',
      message: 'Qual api de IA deseja utilizar?',
      choices: [
        { name: 'ChatGPT 4', value: 'chatgpt' },
        { name: 'Gemini', value: 'gemini' },
        { name: 'Nenhum', value: 'none' },
      ]
    },
    {
      type: 'list',
      name: 'git',
      message: 'Qual plataforma Git está utilizando?',
      choices: [
        { name: 'Github', value: 'github' },
        { name: 'Nenhum', value: 'none' },
      ]
    },
    {
      type: 'input',
      name: 'baseDir',
      message: 'Qual o diretório que contém seu código?',
    },
  ];

  const answers = await inquirer.prompt(questions);
  return { ...answers };
}