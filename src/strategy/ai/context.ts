import { AiStrategy } from "./strategies/ai-strategy";

export class AIContext {
  strategy: AiStrategy

  constructor(strategy: AiStrategy) {
    this.strategy = strategy;
  }

  async formatReleaseDescription(diffOutput: string) {
    return this.strategy.formatReleaseDescription(diffOutput);
  }
}