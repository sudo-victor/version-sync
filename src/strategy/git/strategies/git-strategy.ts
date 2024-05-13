export abstract class GitStrategy {
  abstract createRelease(version: string, title: string, description: string): void
}