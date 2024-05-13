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
    Transforme a seguinte saída do comando 'git diff' em um changelog formatado em markdown.
    Analise semanticamente as mudanças no código para determinar se são adições, remoções ou modificações, e categorize-as apropriadamente.
    Use um estilo claro e conciso para descrever as mudanças, garantindo que o changelog seja fácil de entender e útil para os desenvolvedores que acompanham as atualizações.
    Responda em português. Ignore modificaçoes irrelevantes, como remover comentários ou trocar aspas simples para aspas duplas.

    Saída do Git Diff:
    ${diffOutput}
    `;
    const result = await this.model.generateContent([prompt]);
    const response = result.response.text();
    return response;
  }
}