import OpenAI from "openai";
import { AiStrategy } from "./ai-strategy";

export class ChatGPTStrategy implements AiStrategy {
  openai: OpenAI
  constructor() {
    this.openai = new OpenAI();
  }

  async formatReleaseDescription(diffOutput: string) {
    const prompt = `
    Transforme a seguinte saída do comando 'git diff' em um changelog formatado em markdown.
    Analise semanticamente as mudanças no código para determinar se são adições, remoções ou modificações, e categorize-as apropriadamente.
    Use um estilo claro e conciso para descrever as mudanças, garantindo que o changelog seja fácil de entender e útil para os desenvolvedores que acompanham as atualizações.
    Responda em portguês. Ignore modificaçoes irrelevantes, como remover comentários ou trocar aspas simples para aspas duplas.

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