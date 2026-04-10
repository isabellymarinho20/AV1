# AEROCODE

Sistema desenvolvido para gerenciamento do processo de desenvolvimento de aeronaves, incluindo controle de peças, etapas, testes, funcionários e relatórios.

---

## Requisitos de Instalação

Antes de começar, certifique-se de ter instalado em sua máquina:

* **Node.js** (versão 18 ou superior recomendada)
* **npm** (gerenciador de pacotes do Node, instalado junto com o Node.js)

---

## Passo a Passo: Do Desenvolvimento à Execução

Siga estas etapas no terminal para configurar, compilar e rodar o projeto.

---

### 1. Preparação do Ambiente e Instalação

A estrutura base do projeto e as dependências necessárias já estão definidas. Você precisa apenas baixar o projeto e instalar os pacotes:

```bash
# Navegue até a pasta do projeto
cd av1

# Instale todas as dependências
npm install
```

---

### 2. Desenvolvimento

O código-fonte principal deve ser escrito na pasta `./scr`.
O arquivo de entrada principal é o `index.ts`.

Sempre que fizer alterações no código TypeScript na pasta `scr`, será necessário recompilar o projeto para que as mudanças tenham efeito.

---

### 3. Compilação do Projeto

Converta os arquivos TypeScript (`.ts`) da pasta `scr` para JavaScript (`.js`) executável na pasta `dist`:

```bash
npx tsc
```

**Observação:**
O comando acima utiliza as configurações do arquivo `tsconfig.json` e cria/atualiza a pasta `dist`.

---

### 4. Execução da Aplicação

Após a compilação, execute o sistema com o Node.js:

```bash
node dist/index.js
```

---

## Acesso ao Sistema

### Administrador

* **Usuário:** isa
* **Senha:** 2090

### Operador

* **Usuário:** belly
* **Senha:** 123

**Observação:** Caso as credenciais não funcionem ou você queira consultar outros usuários, verifique o arquivo `funcionarios.json` na raiz do projeto.

---

## Solução de Problemas: Menu Duplicado

Se o menu aparecer duplicado ao executar:

```bash
node dist/index.js
```

Isso ocorre devido ao acúmulo de arquivos antigos na pasta `dist`.

---

### Como resolver

Limpe a pasta `dist` antes de compilar novamente.

#### Windows (PowerShell)

```powershell
rm -r dist ; npx tsc
```

#### Linux / Mac

```bash
rm -rf dist && npx tsc
```

---

## Especificações Técnicas

### Arquivos de Configuração

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

Abaixo está a organização principal dos arquivos e pastas:

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

A pasta `dist` é gerada automaticamente após a compilação.

* Não edite arquivos dentro dela
* Sempre edite os arquivos na pasta `scr`

Qualquer alteração feita diretamente em `dist` será perdida na próxima compilação.

---

## Arquivos JSON

Os dados do sistema são armazenados em arquivos JSON na raiz do projeto.

* `funcionarios.json`: armazena os usuários cadastrados

Não delete esses arquivos, pois eles contêm os dados do sistema.

---

## Importante

Sempre que alterar arquivos `.ts`, execute novamente:

```bash
npx tsc
```
