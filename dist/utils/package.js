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

// src/utils/package.ts
var package_exports = {};
__export(package_exports, {
  incrementVersion: () => incrementVersion,
  updatePackageJsonVersion: () => updatePackageJsonVersion
});
module.exports = __toCommonJS(package_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  incrementVersion,
  updatePackageJsonVersion
});
