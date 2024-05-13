export abstract class AiStrategy {
  abstract formatReleaseDescription(diffOutput: string): Promise<string> | string
}