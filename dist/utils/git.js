"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/utils/git.ts
var git_exports = {};
__export(git_exports, {
  GitUtils: () => GitUtils
});
module.exports = __toCommonJS(git_exports);

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

// src/utils/git.ts
var GitUtils = class {
  static fetchTags() {
    console.log("Buscando tags do reposit\xF3rio remoto...");
    try {
      execCommand("git fetch --tags");
    } catch (error) {
      console.error("Erro ao buscar tags:", error.message);
    }
  }
  static getLastReleaseTag() {
    try {
      this.fetchTags();
      console.log("Capturando a \xFAltima release...");
      const tag = execCommand("git describe --tags --abbrev=0");
      console.log(`\xDAltima tag encontrada: ${tag}`);
      if (!tag)
        throw new Error("Tag not found");
      return tag;
    } catch (error) {
      console.log("Nenhuma tag encontrada. Usando o primeiro commit como refer\xEAncia.");
      try {
        const firstCommit = execCommand("git rev-list --max-parents=0 HEAD");
        console.log(`Primeiro commit encontrado: ${firstCommit}`);
        return firstCommit;
      } catch (innerError) {
        console.error("Erro ao buscar o primeiro commit:", innerError.message);
        return null;
      }
    }
  }
  static getGitDiff(baseDir = ".") {
    const lastTagOrCommit = this.getLastReleaseTag();
    if (lastTagOrCommit) {
      console.log(`Base para o diff: "${lastTagOrCommit}" capturada`);
      console.log(`Capturando as mudan\xE7as feitas no git... BaseDir: ${baseDir}`);
      try {
        const diff = execCommand(`git diff ${lastTagOrCommit} HEAD -- ${baseDir}`);
        return diff;
      } catch (error) {
        console.error("Erro ao executar git diff:", error.message);
        return "";
      }
    } else {
      console.log("Nenhum ponto de refer\xEAncia anterior encontrado para comparar.");
      return "";
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GitUtils
});
