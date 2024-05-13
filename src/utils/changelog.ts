import { existsSync, readFileSync, writeFileSync } from "fs";

export function updateChangelogFile(version: string, title: string, description: string) {
  const changelogPath = 'CHANGELOG.md';
  let changelogContent = existsSync(changelogPath) ? readFileSync(changelogPath, 'utf-8') : '';
  const newEntry = `## ${version} - ${new Date().toISOString().split('T')[0]}\n### ${title}\n${description}\n\n`;
  changelogContent = newEntry + changelogContent;
  writeFileSync(changelogPath, changelogContent, 'utf-8');
}