# AEROCODE

Sistema desenvolvido para gerenciamento do processo de desenvolvimento de aeronaves, incluindo controle de peças, etapas, testes, funcionários e relatórios.

---

## Requisitos de Instalação:

Antes de começar, certifique-se de ter instalado em sua máquina:

* **Node.js**: Versão LTS recente (18 ou superior recomendada).
* **npm**: Gerenciador de pacotes do Node (instalado junto com o Node.js).

---

## Passo a Passo: Do Desenvolvimento à Execução

Siga estas etapas no seu terminal para configurar, compilar e rodar o projeto.

---

### 1. Preparação do Ambiente e Instalação

A estrutura base do projeto e as dependências necessárias já estão definidas. Você precisa apenas baixar o projeto e instalar os pacotes:

```bash
# Clone o repositório ou baixe os arquivos
# Navegue até a pasta do projeto
cd av1

# Instale todas as dependências
npm install
```

---

### 2. Desenvolvimento

O código-fonte principal deve ser escrito dentro da pasta `./scr`.
O arquivo de entrada principal é o `index.ts`.

Sempre que fizer alterações no código TypeScript na pasta `scr`, você precisará recompilar o projeto para que as mudanças tenham efeito.

---

### 3. Compilação do Projeto

Converta os arquivos TypeScript (`.ts`) da pasta `scr` para JavaScript (`.js`) executável na pasta `dist`:

```bash
# Executa o compilador TypeScript
npx tsc
```

**OBSERVAÇÃO:**
O comando acima lê as configurações do arquivo `tsconfig.json` e cria/atualiza a pasta `dist`.

---

### 4. Execução da Aplicação

Após a compilação bem-sucedida, você pode rodar o sistema compilado com o Node.js:

```bash
# Executa o arquivo principal gerado na pasta dist
node dist/index.js
```

---

## Acesso para login de administrador

Para testar as funcionalidades restritas de administrador, utilize os seguintes dados padrão:

* **Usuário:** isa
* **Senha:** 2090

Ja para testar as funcionalidades de operador, utilize os seguintes dados padrão:

* **Usuário:** belly
* **Senha:** 123

**Nota Importante:** Caso você precise consultar outros usuários ou as credenciais acima não funcionem, verifique o arquivo `funcionarios.json` na raiz do projeto.

---

## Solução de Problemas: Menu Duplicado

Um comportamento comum ao compilar o projeto repetidas vezes é o menu aparecer duplicado no terminal ao executar:

```bash
node dist/index.js
```

Isso ocorre devido ao acúmulo de arquivos antigos na pasta `dist` que não foram limpos antes da nova compilação.

---

### Como resolver

A melhor solução é limpar a pasta `dist` antes de compilar novamente.

#### No Windows (PowerShell)

```powershell
rm -r dist ; npx tsc
```

#### No Linux ou Mac

```bash
rm -rf dist && npx tsc
```

---

## Especificações Técnicas:

Esta seção detalha a configuração e as dependências do projeto.

### Arquivos de Configuração:

Os arquivos abaixo já estão configurados no projeto:

#### `package.json`

```json
{
  "devDependencies": {
    "@types/node": "^25.5.2",
    "typescript": "^x.x.x"
  },
  "dependencies": {
    "readline-sync": "^1.4.10"
  },
  "type": "module"
}
```

---

#### `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "outDir": "./dist",
    "rootDir": "./scr",
    "esModuleInterop": true,
    "strict": false,
    "verbatimModuleSyntax": false,
    "types": ["node"]
  }
}
```

---

## Estrutura do Projeto

Abaixo está a organização principal dos arquivos e pastas do projeto:

```bash
av1/
├── scr/               # Código fonte (TypeScript)
├── dist/              # Código compilado (JavaScript)
├── aeronaves.json     # Dados das aeronaves
├── funcionarios.json  # Dados dos usuários
├── pecas.json         # Dados das peças
├── testes.json        # Dados dos testes
├── package.json       # Configuração do projeto
├── tsconfig.json      # Configuração do TypeScript
```

---


## Importante sobre a pasta `dist`

A pasta `dist` é gerada automaticamente pelo TypeScript após a compilação do projeto.

**Não edite arquivos dentro dela**
**Sempre edite os arquivos na pasta `scr`**

!! Qualquer alteração feita diretamente em `dist` será perdida na próxima compilação.

---

## Arquivos Json:

Os dados do sistema são armazenados em arquivos JSON na raiz do projeto.

* `funcionarios.json`: Armazena os usuários cadastrados

OBSERVAÇÃO: Não delete esses arquivos, pois eles contêm os dados do sistema.

---

## IMPORTANTE:

Sempre que alterar arquivos `.ts`, execute novamente:

```bash
npx tsc
```


