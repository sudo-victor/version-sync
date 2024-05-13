import { execCommand } from "./command";

export class GitUtils {
  static fetchTags() {
    console.log('Buscando tags do repositório remoto...');
    execCommand('git fetch --tags');
  }

  static getLastReleaseTag() {
    try {
      this.fetchTags();
      return execCommand('git describe --tags --abbrev=0');
    } catch (error) {
      console.log('Nenhuma tag encontrada. Usando o primeiro commit como referência.');
      return execCommand('git rev-list --max-parents=0 HEAD');
    }
  }

  static getGitDiff() {
    const lastTag = this.getLastReleaseTag();
    if (lastTag) {
      const diff = execCommand(`git diff ${lastTag} HEAD`);
      return diff;
    } else {
      console.log('Nenhum commit anterior encontrado para comparar.');
      return '';
    }
  }
}