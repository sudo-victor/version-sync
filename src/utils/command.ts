import { execSync } from "child_process";

export function execCommand(command: string, exit=false) {
  try {
    return execSync(command, { encoding: 'utf-8' }).trim();
  } catch (error) {
    if (exit) {
      console.error('Erro ao executar comando:', error.message);
      process.exit(1);
    }
  }
}