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

// src/strategy/git/strategies/github-strategy.ts
var github_strategy_exports = {};
__export(github_strategy_exports, {
  GithubStrategy: () => GithubStrategy
});
module.exports = __toCommonJS(github_strategy_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GithubStrategy
});
