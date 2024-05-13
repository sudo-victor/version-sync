import { execCommand } from "./command";

export class GitUtils {
  static fetchTags() {
    console.log('Buscando tags do repositório remoto...');
    execCommand('git fetch --tags');
  }

  static getLastReleaseTag() {
    try {
      this.fetchTags();
      console.log('Capturando a última release...');
      return execCommand('git describe --tags --abbrev=0');
    } catch (error) {
      console.log('Nenhuma tag encontrada. Usando o primeiro commit como referência.');
      return execCommand('git rev-list --max-parents=0 HEAD');
    }
  }

  static getGitDiff(baseDir = '.') {
    const lastTag = this.getLastReleaseTag();
    if (lastTag) {
      // Especifica o diretório 'src' no comando git diff
      console.log(`Capturando as mudanças feita no git. BaseDir: ${baseDir}`)
      const diff = execCommand(`git diff ${lastTag} HEAD -- ${baseDir}`);
      return diff;
    } else {
      console.log('Nenhum commit anterior encontrado para comparar.');
      return '';
    }
  }
}