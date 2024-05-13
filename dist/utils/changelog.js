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

// src/utils/changelog.ts
var changelog_exports = {};
__export(changelog_exports, {
  updateChangelogFile: () => updateChangelogFile
});
module.exports = __toCommonJS(changelog_exports);
var import_fs = require("fs");
function updateChangelogFile(version, title, description) {
  const changelogPath = "CHANGELOG.md";
  let changelogContent = (0, import_fs.existsSync)(changelogPath) ? (0, import_fs.readFileSync)(changelogPath, "utf-8") : "";
  const newEntry = `## ${version} - ${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}
### ${title}
${description}

`;
  changelogContent = newEntry + changelogContent;
  (0, import_fs.writeFileSync)(changelogPath, changelogContent, "utf-8");
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  updateChangelogFile
});
