## 3.2.3 - 2024-05-13
### asd
# Changelog

Este changelog destaca as principais alterações feitas na atualização recente do projeto.

## Adições:
- Adicionada a função `promptFeatDescription` para captura de descrições detalhadas de funcionalidades adicionadas. Esta nova função auxilia no processo de criação de releases, solicitando ao usuário que descreva as adições, remoções e mudanças feitas no código.
- Incluída a captura do diretório base (`baseDir`) na função `commandInit`. Isso permite especificar o diretório que contém o código para uma análise mais precisa das mudanças.
- Implementada lógica adicional no comando `feat` para tratar casos em que a descrição automática falha. Neste cenário, o usuário será solicitado a fornecer manualmente uma descrição para a release.

## Modificações:
- Melhoria na função `getGitDiff` da classe `GitUtils` para aceitar um diretório base como argumento. Esse aprimoramento possibilita uma comparação mais granular das diferenças de código, focando nos arquivos relevantes.
- Atualização da função `commandInit` para incluir o diretório base (`baseDir`) no arquivo `.version-sync`, melhorando a configuração inicial do projeto.
- Refinamento do processo de criação de releases dentro do comando `feat`, incluindo tentativa de geração de descrição automática seguida por input manual do usuário em caso de erro.

## Comentários Gerais:
- A inclusão do diretório base (`baseDir`) em diversas funções do projeto indica um esforço para melhorar a precisão na manipulação e avaliação das mudanças de código.

Estas mudanças têm como objetivo melhorar a usabilidade e funcionalidade do projeto, facilitando o gerenciamento de versões e a criação de documentação relevante para desenvolvedores e usuários finais.

## 3.2.2 - 2024-05-13
### asd
# Changelog

## Adições

- **Prompt de Features**: Incluído um novo prompt `promptFeatDescription` para coletar descrições detalhadas sobre adições, remoções e mudanças efetuadas no código.
- **BaseDir em `commandInit`**: Agora o comando `init` suporta a captura do diretório base (`baseDir`) do projeto, permitindo uma configuração mais precisa do ambiente de trabalho.
- Melhorias na captura de diferenças com `GitUtils.getGitDiff`, aprimorando a precisão ao considerar o diretório base dos projetos.
- Mensagem de log adicionada em `GitUtils.getLastReleaseTag` para informar que a última release está sendo capturada.

## Modificações

- **Tratamento de Erros no Comando de Feature**: Aprimorado o tratamento de erros ao gerar descrições de release, agora utilizando a descrição fornecida pelo usuário através do novo prompt de descrição de mudanças caso ocorra um erro com a descrição automática.
- Refatoração do comando `commandFeat` para inclusão de logs explicativos durante a geração do changelog, criação da release, e atualização do arquivo CHANGELOG.md.

## Remoções

- Nenhuma remoção significativa que não está relacionada à inclusão das funcionalidades mencionadas acima.

---

Estas mudanças introduzem melhorias significativas na usabilidade e precisão dos comandos CLI, especialmente ao trabalhar com features e gerenciamento de versões. A nova capacidade de incluir detalhes sobre o diretório base do projeto (`baseDir`) e a solicitação de descrições manuais em caso de falhas automatizadas proporcionam flexibilidade e segurança adicional para o processo de release.

## 3.2.1 - 2024-05-13
### Add log to release
# Changelog

A seguir, as mudanças significativas realizadas no projeto estão documentadas neste changelog:

## Comandos CLI

### Adições
- Foi introduzida uma nova função `promptFeatDescription` em `src/cli/promps.ts`, permitindo aos usuários descreverem as adições, remoções, e mudanças executadas no código durante o processo de criação de uma nova funcionalidade.
- Adicionado o parâmetro `baseDir` no prompt de inicialização (`promptInit`) e na função `commandInit` para especificar o diretório que contém o código, melhorando assim a especificidade do comando `git diff` utilizado no processo.

### Mudanças
- Na função `commandFeat`, agora é verificado se ocorreram alterações significativas antes de prosseguir com a criação de uma nova release. Caso não haja alterações significativas, o processo é interrompido, notificando ao usuário correspondente.
- O tratamento de erro foi aprimorado na função `commandFeat` para situações em que a descrição da release falhar, solicitando agora uma descrição manual pelo usuário.
- `GitUtils.getGitDiff` foi modificado para aceitar um parâmetro `baseDir`, permitindo a especificação do diretório ao executar o comando `git diff`. Isso é particularmente útil para projetos com estruturas de diretório complexas.

### Melhorias Informacionais
- Foram adicionadas mais saídas de log em vários pontos do processo para melhor informar os usuários sobre o que está acontecendo durante a execução dos comandos, incluindo a captura da última release e as mudanças feitas no Git.

## Utils

### Adições
- Mensagens de log aprimoradas em `GitUtils` para informar sobre a captura da última release tag e as mudanças identificadas no git, contribuindo para uma maior transparência do processo interno e facilitando o diagnóstico de problemas.

## Geral

- A inclusão de mensagens de log e prompts detalhados promove uma maior interatividade e clareza para o usuário, especialmente em processos cruciais como a inicialização de configurações e a criação de releases.
- As mudanças realizadas são direcionadas a aprimorar a experiência do usuário ao fornecer contexto adicional sobre as operações em andamento e ao permitir intervenções manuais em pontos críticos do processo.

---

Este changelog foi gerado com base nas diferenças entre commits, enfocando a adição de funcionalidades, mudanças significativas e melhorias na interação do usuário com o sistema CLI.

## 3.2.0 - 2024-05-13
### teste
# Changelog

## Adições

- Adicionada função `promptFeatDescription` em `src/cli/promps.ts` para coletar descrição do usuário sobre as adições, remoções e mudanças feitas no código.
- O objeto retornado pela função `promptInit` em `src/cli/commands.ts` e `src/cli/promps.ts` agora inclui a propriedade `baseDir`, permitindo especificar o diretório de código.
- Implementada lógica para tratar a ausência de alterações significativas como uma condição válida, evitando a criação de releases desnecessárias.

## Mudanças

- Modificação em `commandInit` e `commandFeat` dentro de `src/cli/commands.ts` para considerar a nova propriedade `baseDir` e melhorar o tratamento de erros e apresentação de mensagens informativas ao gerar releases.
- Na função `commandFeat`, melhorada a lógica de geração do changelog com a inclusão de um bloco try-catch, permitindo ao usuário inserir descrições manualmente caso a automação falhe.
- Ajuste na função `getGitDiff` de `src/utils/git.ts` para aceitar um parâmetro `baseDir`, permitindo a definição do diretório base onde as mudanças devem ser verificadas. Também foram adicionadas mensagens informativas para melhor rastreamento do processo de captura das mudanças e releases.

## Remoções

- Nenhum elemento foi explicitamente removido do código segundo o diff fornecido, apenas alterações e adições foram identificadas.

## Geral

Este changelog foi gerado a partir de mudanças significativas no código-fonte, destacando a crescente capacidade de customização e precisão no processo de gerenciamento de versões e automatização de changelogs. A inclusão de descrições detalhadas pelo usuário oferece flexibilidade adicional no registro de mudanças, complementando as descrições automáticas geradas por contextos AI, como `AIContext`.

## 3.1.2 - 2024-05-13
### add log
# Changelog

## Adições
- Adicionada funcionalidade para capturar descrição das features através de prompts interativos com novas perguntas sobre adições, remoções e mudanças no código (`promptFeatDescription`).
- Suporte para o parâmetro `baseDir` nas funções `commandInit` e `GitUtils.getGitDiff`, permitindo especificar o diretório base onde se encontram os códigos para análise de diferenças.
- Log de mensagens melhorado durante a captura de tags e diferenças de git para fornecer mais contexto ao usuário sobre o que está ocorrendo.

## Modificações
- A função `commandFeat` foi ampliada para lidar com erros na geração de descrições de lançamento via IA. Em caso de erro, o usuário é solicitado a fornecer uma descrição manualmente através de uma nova interação com `promptFeatDescription`.
- Modificação na forma como o arquivo `.version-sync` é gerado por `commandInit`, agora incluindo o parâmetro `baseDir`.
- Aprimoramento no feedback durante execução dos comandos, adicionando mais logs de esclarecimento sobre o processo de criação de release e atualização do changelog e package.json.

## Remoções
- Não houve menção específica a remoções que se ajustem aos critérios (ignorar mudanças triviais como remoção de comentários ou alteração de aspas). 

## Notas Gerais
- As atualizações focam em melhorar a experiência do usuário na utilização de comandos CLI para gerenciamento de versões e criação de releases, além de aprimorar o feedback fornecido ao usuário durante estes processos.
- A adição de um prompt de descrição para releases incrementa a flexibilidade e adaptação a erros ou necessidades de detalhamento manual da descrição das mudanças implementadas.

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

