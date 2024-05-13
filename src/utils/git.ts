import { execCommand } from "./command";

export class GitUtils {
  static fetchTags() {
    console.log('Buscando tags do repositório remoto...');
    try {
      execCommand('git fetch --tags');
    } catch (error) {
      console.error('Erro ao buscar tags:', error.message);
    }
  }

  static getLastReleaseTag() {
    try {
      this.fetchTags();
      console.log('Capturando a última release...');
      const tag = execCommand('git describe --tags --abbrev=0');
      console.log(`Última tag encontrada: ${tag}`);
      if (!tag) throw new Error("Tag not found")
      return tag;
    } catch (error) {
      console.log('Nenhuma tag encontrada. Usando o primeiro commit como referência.');
      try {
        const firstCommit = execCommand('git rev-list --max-parents=0 HEAD');
        console.log(`Primeiro commit encontrado: ${firstCommit}`);
        return firstCommit;
      } catch (innerError) {
        console.error('Erro ao buscar o primeiro commit:', innerError.message);
        return null;  // Ou tratar de outra maneira adequada
      }
    }
  }

  static getGitDiff(baseDir = '.') {
    const lastTagOrCommit = this.getLastReleaseTag();
    if (lastTagOrCommit) {
      console.log(`Base para o diff: "${lastTagOrCommit}" capturada`);
      console.log(`Capturando as mudanças feitas no git... BaseDir: ${baseDir}`);
      try {
        const diff = execCommand(`git diff ${lastTagOrCommit} HEAD -- ${baseDir}`);
        return diff;
      } catch (error) {
        console.error('Erro ao executar git diff:', error.message);
        return '';
      }
    } else {
      console.log('Nenhum ponto de referência anterior encontrado para comparar.');
      return '';
    }
  }
}
