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
      console.log(`Capturando as mudan\xE7as feita no git. BaseDir: ${baseDir}`);
      const diff = execCommand(`git diff ${lastTag} HEAD -- ${baseDir}`);
      return diff;
    } else {
      console.log("Nenhum commit anterior encontrado para comparar.");
      return "";
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GitUtils
});
