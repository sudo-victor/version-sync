import { execCommand } from "../../../utils/command";
import { GitStrategy } from "./git-strategy";

export class GithubStrategy implements GitStrategy {
  createRelease(version: string, title: string, description: string): string {
    const command = `gh release create ${JSON.stringify(version)} --title ${JSON.stringify(title)} --notes "${description.replace(/`/g, '')}"`;
    return execCommand(command) ?? "";
  }
}