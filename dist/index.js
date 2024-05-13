#!/usr/bin/env node
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/index.ts
var import_config = require("dotenv/config");
var import_yargs = __toESM(require("yargs"));
var import_helpers = require("yargs/helpers");

// src/cli/commands.ts
var import_fs3 = require("fs");

// src/cli/promps.ts
var import_inquirer = __toESM(require("inquirer"));

// src/utils/package.ts
var import_fs = require("fs");
function incrementVersion(version, changeType) {
  let [major, minor, patch] = version.split(".").map(Number);
  switch (changeType) {
    case "major":
      major += 1;
      minor = 0;
      patch = 0;
      break;
    case "minor":
      minor += 1;
      patch = 0;
      break;
    case "patch":
      patch += 1;
      break;
  }
  return `${major}.${minor}.${patch}`;
}
function updatePackageJsonVersion(newVersion) {
  const packageJson = JSON.parse((0, import_fs.readFileSync)("package.json", "utf-8"));
  packageJson.version = newVersion;
  (0, import_fs.writeFileSync)("package.json", JSON.stringify(packageJson, null, 2), "utf-8");
  return newVersion;
}

// src/cli/promps.ts
function promptFeat(currentVersion) {
  return __async(this, null, function* () {
    const questions = [
      {
        type: "list",
        name: "changeType",
        message: "Qual \xE9 a natureza da mudan\xE7a nesta vers\xE3o?",
        choices: [
          { name: "Mudan\xE7a que quebra c\xF3digo (major)", value: "major" },
          { name: "Nova funcionalidade (minor)", value: "minor" },
          { name: "Corre\xE7\xE3o de bug ou pequena altera\xE7\xE3o (patch)", value: "patch" }
        ]
      },
      {
        type: "input",
        name: "title",
        message: "Informe o t\xEDtulo da release:"
      }
    ];
    const answers = yield import_inquirer.default.prompt(questions);
    const newVersion = incrementVersion(currentVersion, answers.changeType);
    return __spreadValues({ newVersion }, answers);
  });
}
function promptFeatDescription() {
  return __async(this, null, function* () {
    const questions = [
      {
        type: "input",
        name: "additions",
        message: "Descreva as adi\xE7\xF5es feitas no c\xF3digo:"
      },
      {
        type: "input",
        name: "removals",
        message: "Descreva as remo\xE7\xF5es feitas no c\xF3digo:"
      },
      {
        type: "input",
        name: "changes",
        message: "Descreva as mudan\xE7as feitas no c\xF3digo:"
      }
    ];
    const answers = yield import_inquirer.default.prompt(questions);
    return `### Adi\xE7\xF5es
${answers.additions}

### Remo\xE7\xF5es
${answers.removals}

### Mudan\xE7as
${answers.changes}`;
  });
}
function promptInit() {
  return __async(this, null, function* () {
    const questions = [
      {
        type: "list",
        name: "ai",
        message: "Qual api de IA deseja utilizar?",
        choices: [
          { name: "ChatGPT 4", value: "chatgpt" },
          { name: "Gemini", value: "gemini" }
        ]
      },
      {
        type: "list",
        name: "git",
        message: "Qual plataforma Git est\xE1 utilizando?",
        choices: [
          { name: "Github", value: "github" },
          { name: "Nenhum", value: "none" }
        ]
      },
      {
        type: "input",
        name: "baseDir",
        message: "Qual o diret\xF3rio que cont\xE9m seu c\xF3digo?"
      }
    ];
    const answers = yield import_inquirer.default.prompt(questions);
    return __spreadValues({}, answers);
  });
}

// src/strategy/ai/context.ts
var AIContext = class {
  constructor(strategy) {
    this.strategy = strategy;
  }
  formatReleaseDescription(diffOutput) {
    return __async(this, null, function* () {
      return this.strategy.formatReleaseDescription(diffOutput);
    });
  }
};

// src/strategy/git/context.ts
var GitContext = class {
  constructor(strategy) {
    this.strategy = strategy;
  }
  createRelease(version, title, description) {
    return __async(this, null, function* () {
      return this.strategy.createRelease(version, title, description);
    });
  }
};

// src/utils/command.ts
var import_child_process = require("child_process");
function execCommand(command, exit = false) {
  try {
    return (0, import_child_process.execSync)(command, { encoding: "utf-8" }).trim();
  } catch (error) {
    if (exit) {
      console.error("Erro ao executar comando:", error.message);
      process.exit(1);
    }
  }
}

// src/strategy/git/strategies/github-strategy.ts
var GithubStrategy = class {
  createRelease(version, title, description) {
    var _a;
    const command = `gh release create ${JSON.stringify(version)} --title ${JSON.stringify(title)} --notes "${description.replace(/`/g, "")}"`;
    return (_a = execCommand(command)) != null ? _a : "";
  }
};

// src/strategy/ai/strategies/chat-gpt-strategy.ts
var import_openai = __toESM(require("openai"));
var ChatGPTStrategy = class {
  constructor() {
    this.openai = new import_openai.default();
  }
  formatReleaseDescription(diffOutput) {
    return __async(this, null, function* () {
      var _a;
      const prompt = `
    Por favor, transforme a sa\xEDda do comando 'git diff' em um changelog formatado em Markdown. Analise as mudan\xE7as no c\xF3digo para identificar adi\xE7\xF5es, remo\xE7\xF5es e modifica\xE7\xF5es significativas. Ignore mudan\xE7as triviais como remo\xE7\xE3o de coment\xE1rios ou altera\xE7\xE3o de aspas simples para duplas. Adicionalmente, apenas mencione a inclus\xE3o de novas bibliotecas se elas forem efetivamente utilizadas no c\xF3digo. O changelog deve ser claro, conciso e \xFAtil para os desenvolvedores acompanharem as atualiza\xE7\xF5es do projeto. Responda em portugu\xEAs.

    Sa\xEDda do Git Diff:
    ${diffOutput}
    `;
      const response = yield this.openai.chat.completions.create({
        model: "gpt-4-0125-preview",
        messages: [{ role: "user", content: prompt }]
      });
      return (_a = response.choices[0].message.content) != null ? _a : "";
    });
  }
};

// src/strategy/ai/strategies/gemini-strategy.ts
var import_generative_ai = require("@google/generative-ai");
var GeminiStrategy = class {
  constructor() {
    const geminiai = new import_generative_ai.GoogleGenerativeAI(process.env.GEMINI_KEY);
    this.model = geminiai.getGenerativeModel({ model: "gemini-1.0-pro" });
  }
  formatReleaseDescription(diffOutput) {
    return __async(this, null, function* () {
      const prompt = `
    Por favor, transforme a sa\xEDda do comando 'git diff' em um changelog formatado em Markdown. Analise as mudan\xE7as no c\xF3digo para identificar adi\xE7\xF5es, remo\xE7\xF5es e modifica\xE7\xF5es significativas. Ignore mudan\xE7as triviais como remo\xE7\xE3o de coment\xE1rios ou altera\xE7\xE3o de aspas simples para duplas. Adicionalmente, apenas mencione a inclus\xE3o de novas bibliotecas se elas forem efetivamente utilizadas no c\xF3digo. O changelog deve ser claro, conciso e \xFAtil para os desenvolvedores acompanharem as atualiza\xE7\xF5es do projeto. Responda em portugu\xEAs.

    Sa\xEDda do Git Diff:
    ${diffOutput}
    `;
      const result = yield this.model.generateContent([prompt]);
      const response = result.response.text();
      return response;
    });
  }
};

// src/utils/git.ts
var GitUtils = class {
  static fetchTags() {
    console.log("Buscando tags do reposit\xF3rio remoto...");
    execCommand("git fetch --tags");
  }
  static getLastReleaseTag() {
    try {
      this.fetchTags();
      console.log("Capturando a \xFAltima release...");
      return execCommand("git describe --tags --abbrev=0");
    } catch (error) {
      console.log("Nenhuma tag encontrada. Usando o primeiro commit como refer\xEAncia.");
      return execCommand("git rev-list --max-parents=0 HEAD");
    }
  }
  static getGitDiff(baseDir = ".") {
    const lastTag = this.getLastReleaseTag();
    if (lastTag) {
      console.log(`Release "${lastTag}" capturada`);
      console.log(`Capturando as mudan\xE7as feita no git... BaseDir: ${baseDir}`);
      const diff = execCommand(`git diff ${lastTag} HEAD -- ${baseDir}`);
      return diff;
    } else {
      console.log("Nenhum commit anterior encontrado para comparar.");
      return "";
    }
  }
};

// src/utils/changelog.ts
var import_fs2 = require("fs");
function updateChangelogFile(version, title, description) {
  const changelogPath = "CHANGELOG.md";
  let changelogContent = (0, import_fs2.existsSync)(changelogPath) ? (0, import_fs2.readFileSync)(changelogPath, "utf-8") : "";
  const newEntry = `## ${version} - ${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}
### ${title}
${description}

`;
  changelogContent = newEntry + changelogContent;
  (0, import_fs2.writeFileSync)(changelogPath, changelogContent, "utf-8");
}

// src/cli/commands.ts
function commandInit() {
  return __async(this, null, function* () {
    const { ai, git, baseDir } = yield promptInit();
    (0, import_fs3.writeFileSync)(".version-sync", JSON.stringify({ ai, git, baseDir }, null, 2));
    console.log("Arquivo .version-sync criado.");
  });
}
function commandFeat() {
  return __async(this, null, function* () {
    var _a;
    const configFile = ".version-sync";
    if (!(0, import_fs3.existsSync)(configFile)) {
      console.error("Erro: Arquivo de configura\xE7\xE3o n\xE3o encontrado. Execute o comando `init`.");
      process.exit(1);
    }
    const config = JSON.parse((0, import_fs3.readFileSync)(configFile, "utf-8"));
    const aiContext = new AIContext(config.ai === "chatgpt" ? new ChatGPTStrategy() : new GeminiStrategy());
    const gitContext = new GitContext(new GithubStrategy());
    const packageJson = JSON.parse((0, import_fs3.readFileSync)("package.json", "utf-8"));
    const currentVersion = packageJson.version;
    const { newVersion, title } = yield promptFeat(currentVersion);
    const diffOutput = GitUtils.getGitDiff((_a = config.baseDir) != null ? _a : void 0);
    if (!diffOutput) {
      console.log("N\xE3o houve nenhuma altera\xE7\xE3o significativa.");
      return;
    }
    try {
      console.log("Gerando changelog com", config.ai);
      const description = yield aiContext.formatReleaseDescription(diffOutput);
      console.log("Criando nova release no", config.git);
      const releaseURL = yield gitContext.createRelease(newVersion, title, description);
      console.log(releaseURL);
      console.log("Atualizando arquivo CHANGELOG.md", config.git);
      updateChangelogFile(newVersion, title, description);
      updatePackageJsonVersion(newVersion);
    } catch (error) {
      console.error("Erro ao gerar descri\xE7\xE3o com ", config.ai);
      const userDescription = yield promptFeatDescription();
      console.log("Criando nova release no", config.git);
      const releaseURL = yield gitContext.createRelease(newVersion, title, userDescription);
      console.log(releaseURL);
      console.log("Atualizando arquivo CHANGELOG.md");
      updateChangelogFile(newVersion, title, userDescription);
      updatePackageJsonVersion(newVersion);
    }
  });
}

// src/index.ts
(0, import_yargs.default)((0, import_helpers.hideBin)(process.argv)).command("init", "Inicializa o arquivo de configura\xE7\xE3o", commandInit).command("feat", "Adicionar uma nova vers\xE3o", commandFeat).demandCommand(1, "Voc\xEA deve fornecer pelo menos um comando.").help().argv;
