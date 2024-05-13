import OpenAI from "openai";
import { AiStrategy } from "./ai-strategy";

export class ChatGPTStrategy implements AiStrategy {
  openai: OpenAI
  constructor() {
    this.openai = new OpenAI();
  }

  async formatReleaseDescription(diffOutput: string) {
    const prompt = `
    Por favor, transforme a saída do comando 'git diff' em um changelog formatado em Markdown. Analise as mudanças no código para identificar adições, remoções e modificações significativas. Ignore mudanças triviais como remoção de comentários ou alteração de aspas simples para duplas. Adicionalmente, apenas mencione a inclusão de novas bibliotecas se elas forem efetivamente utilizadas no código. O changelog deve ser claro, conciso e útil para os desenvolvedores acompanharem as atualizações do projeto. Responda em português.

    Saída do Git Diff:
    ${diffOutput}
    `;
    const response = await this.openai.chat.completions.create({
      model: "gpt-4-0125-preview",
      messages: [{ role: 'user', content: prompt }]
    });
    return response.choices[0].message.content ?? "";
  }
}