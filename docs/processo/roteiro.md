# Roteiro para desenvolvimento de produto

Pré-requisitos:
- Conta e repositório criados no GitHub <https://github.com/>.
- Google Antigravity <https://antigravity.google> instalado localmente.
- Conta Vercel <https://vercel.com/>.
- Conta Clerk <https://www.clerk.com/>.
- Conta Supabase <https://www.supabase.com/>.
- Conta Grafana Cloud <https://grafana.com/cloud/>.

## 1. Discovery

### 1.1 Definição do problema

- Identifique um cenário em que haja um problema ou oportunidade.
- Registre o problema no arquivo docs/definicao_problema.md.

---

### 1.2 Refinamento

- A partir da análise do problema, defina o produto a ser construido.
- Registre o resultado no arquivo docs/prd.md.
- A partir da definição do produto, especifique os detalhes do produto.
- Registre o resultado nos arquivos:
    - docs/spec_tech.md
    - docs/spec_ui.md
- Solicite a uma IA para revisar os documentos criados.

---

### 1.3 Desenho

- Solicite a alguma IA para elaborar um prompt a ser usado na criação de protótipos:

```
Crie um arquivo markdown com um prompt para o papel de designer de UX que solicita a uma ferramenta de prototipagem como o Google Stitch criar templates de protótipos para um projeto.

Siga estritamente as informações providas pelos documentos:

<incluir conteúdo do arquivo docs/prd.md>
<incluir conteúdo do arquivo docs/spec_tech.md>
<incluir conteúdo do arquivo docs/spec_ui.md>
```

- Acesse o Stitch <https://stitch.withgoogle.com/>.
- Selecione "Web" para o design.
- Selecione um modelo com melhor reasoning (ex.: 3.0 Pro).

- Informe o prompt criado anteriormente.
- Avalie os resultados gerados.
- Selecione uma das imagens e explore o recurso Preview, New Tab.
- Selecione uma das imagens e explore o recurso Generate, Variations.
- Selecione todas as imagens e acesse o recurso Generate, Protótipos.
- Selecione o protótipo e o comando Interact.
- No menu superior, acione o comando Renomear projeto (ícone de lápis).
- Informe o nome do produto.

---

## 2. Delivery

### 2.1 Criação do projeto web 

#### Configuração para integração com Stitch

- Acesse o Antigravity.
- Selecione o painel Agent.
- Solicite a instalação da skill do Stitch:

```
Instale a skill disponível em https://github.com/google-labs-code/stitch-skills.
```

- Ao lado do item implementation_plan.md, acione o comando Open.
- Na seção de prompt, alterne da opção "Planning" para "Fast" (execução). Repita esse procedimento sempre que for executar um plano.
- No painel Implementation Plan, acione o comando Proceed.
- Interaja com o agente, provendo as entradas solicitadas.
- Ao lado do item walkthrough.md, acione o comando Open.
- Analise o conteúdo do arquivo.

- Selecione o painel Agent.
- Selecione a opção Additional options (símbolo de três pontos "...").
- Na seção MCP Store, acione o comando Manage MCP Servers.
- No painel Manage MCP servers, acione o comando View raw config.
- Inclua o seguinte conteúdo:

```json
{
  "mcpServers": {
    "stitch": {
      "serverUrl": "https://stitch.googleapis.com/mcp",
      "headers": {
        "X-Goog-Api-Key": "YOUR-API-KEY"
      }
    }
  }
}`
```
- Selecione o Stitch.
- No canto superior direito, acione o perfil do usuário.
- Selecione a opção "Configurações do app Stitch".
- Navegue até a seção Chave de API.
- Acione o comando Criar chave.
- Copie o conteúdo da chave criada.
- Retorne ao Antigravity.
- Troque o trecho YOUR-API-KEY pela chave obtida no Stitch.
- Solicite ao agente para listar os projetos disponíveis:

```
Use o mcp server e liste os projetos do Stitch.
```

- Certifique-se de que o projeto criado anteriormente está disponível.

#### Criação do projeto Next.js

- No painel Agent, selecione a opção Start a new conversation.
- Solicite a instalação de novas skills.

```
Instale no projeto atual as skills https://antigravity.codes/agent-skills/nextjs/nextjs e https://antigravity.codes/agent-skills/architecture/design-system-patterns
```

- Execute o plano.
- Abra uma nova conversação e solicite a criação de um projeto:

```
Crie um projeto web seguindo estritamente as orientações a seguir (troque o <nome do projeto> pelo nome do projeto criado no Stitch e garanta que o @ se refira aos arquivos do projeto):
- skills nextjs e design-systems
- documentos @docs/spec_ui.md e @docs/spec_tech.md
- imagens disponíveis no projeto Stitch <nome do projeto>

Não crie o projeto backend no momento!
Não configure nenhuma integração no momento!
A execução será apenas local inicialmente!
```
- Execute o projeto e monitore o progresso.
- No menu superior, selecione a opção Terminal, New Terminal.
- Inicie o servidor local:

```bash
npm run dev
```
- Acesse a aplicação por meio do navegador web (padrão: <http://localhost:3000>).
- Navegue pela aplicação.
- Faça o commit e o push do projeto para o GitHub.

#### Deploy na Vercel

- Acesse o site da Vercel <https://vercel.com/>.
- No canto superior direito, acione o comando Add New...
- Selecione "Project".
- Selecione "Import Git Repository".
- Selecione o repositório do seu projeto.
- Clique em "Import".
- Clique em "Deploy".
- Aguarde o deploy.
- Clique em "Continue to Dashboard".



