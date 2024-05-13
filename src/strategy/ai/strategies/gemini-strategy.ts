import { GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";
import { AiStrategy } from "./ai-strategy";

export class GeminiStrategy implements AiStrategy {
  model: GenerativeModel
  constructor() {
    const geminiai = new GoogleGenerativeAI(process.env.GEMINI_KEY as string);
    this.model = geminiai.getGenerativeModel({ model: "gemini-1.0-pro" });
  }
  async formatReleaseDescription(diffOutput: string) {
    const prompt = `
    Por favor, transforme a saída do comando 'git diff' em um changelog formatado em Markdown. Analise as mudanças no código para identificar adições, remoções e modificações significativas. Ignore mudanças triviais como remoção de comentários ou alteração de aspas simples para duplas. Adicionalmente, apenas mencione a inclusão de novas bibliotecas se elas forem efetivamente utilizadas no código. O changelog deve ser claro, conciso e útil para os desenvolvedores acompanharem as atualizações do projeto. Responda em português.

    Saída do Git Diff:
    ${diffOutput}
    `;
    const result = await this.model.generateContent([prompt]);
    const response = result.response.text();
    return response;
  }
}