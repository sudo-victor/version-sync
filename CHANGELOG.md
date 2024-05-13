## 3.1.1 - 2024-05-13
### Testando AI Error
# Changelog

## Adições
- Arquivos `.ts` relacionados à lógica CLI foram adicionados, permitindo inicialização de configuração (`commands.ts`) e interações via prompt (`promps.ts`).
- Implementação de estratégias de IA (`AIContext`, `AiStrategy`, `ChatGPTStrategy`, `GeminiStrategy`) para formatação automática de descrições de release baseadas em diferenças de git.
- Implementação de estratégias git (`GitContext`, `GitStrategy`, `GithubStrategy`) para automatização da criação de releases no GitHub.
- Adição de utilitários para manipulação de changelogs (`updateChangelogFile`), execução de comandos (`execCommand`), interações com git (`GitUtils`), e manipulação de versões no `package.json` (`incrementVersion` e `updatePackageJsonVersion`).
- Nova forma de manipulação de comandos CLI através de `yargs`, substituindo o código anterior em `index.mjs` por um mais organizado em `index.ts`.

## Remoções
- Remoção do arquivo `src/index.mjs`, substituído por uma implementação refatorada e modularizada.

## Modificações
- Separação de lógicas anteriormente concentradas em um único script (`index.mjs`), distribuindo responsabilidades por novos módulos TypeScript, permitindo uma manutenção mais fácil e uma melhor organização do código.
- Incorporação de boas práticas de programação, como o padrão de estratégia para IA e Git, facilitando a extensão do código e a introdução de novas APIs ou plataformas Git conforme necessário.

## Nota
- Este changelog foca em mudanças de arquitetura e funcionalidades significativas, omitindo detalhes menos relevantes para manter a clareza e concisão.

