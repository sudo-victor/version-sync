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
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
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

// src/cli/promps.ts
var promps_exports = {};
__export(promps_exports, {
  promptFeat: () => promptFeat,
  promptFeatDescription: () => promptFeatDescription,
  promptInit: () => promptInit
});
module.exports = __toCommonJS(promps_exports);
var import_inquirer = __toESM(require("inquirer"));

// src/utils/package.ts
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
          { name: "Gemini", value: "gemini" },
          { name: "Nenhum", value: "none" }
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  promptFeat,
  promptFeatDescription,
  promptInit
});
