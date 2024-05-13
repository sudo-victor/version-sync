import { GitStrategy } from "./strategies/git-strategy";

export class GitContext {
  strategy: GitStrategy

  constructor(strategy: GitStrategy) {
    this.strategy = strategy;
  }

  async createRelease(version: string, title: string, description: string) {
    return this.strategy.createRelease(version, title, description);
  }

}