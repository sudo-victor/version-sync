import { readFileSync, writeFileSync } from "fs";

export function incrementVersion(version: string, changeType: string) {
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

export function updatePackageJsonVersion(newVersion: string) {
  const packageJson = JSON.parse(readFileSync('package.json', 'utf-8'));
  packageJson.version = newVersion;
  writeFileSync('package.json', JSON.stringify(packageJson, null, 2), 'utf-8');
  return newVersion;
}