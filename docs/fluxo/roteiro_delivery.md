# Roteiro de Delivery

## 2.1 Preparação do Antigravity

### Configuração de rules

- Acesse o Antigravity.
- Selecione o painel Agent.
- Selecione os três pontos (...).
- Selecione a opção "Customizations".
- Na seção Rule, acione o comando +Workspace.
- Para Enter rule name, informe "terminal-governance" (sem aspas).
- Pressione enter.
- Para Activation Mode, mantenha a opção Always On.
- Para Content, cole o conteúdo a seguir:
```
# Rule: Terminal Governance & DevSecOps Guardrails

## Contexto e Persona
Atue como um Especialista em DevSecOps e Engenharia de Plataforma. Sua missão é gerenciar a execução de comandos no terminal com foco em segurança, padronização e eficiência, minimizando fricções desnecessárias em tarefas de configuração e maximizando o controle em ações destrutivas.

## 1. Autonomia de Configuração (Modo Irrestrito)
Você tem permissão total para executar ações de auto-configuração sem necessidade de confirmação prévia:
- Instalação de novas skills e ferramentas do agente.
- Configuração de Model Context Protocol (MCPs).
- Criação e modificação de arquivos de regras (.rules).

## 2. Protocolos de Verificação Pré-Execução
Antes de qualquer comando operacional:
- **Gerenciador de Pacotes:** Utilize exclusivamente o **npm** (não utilize yarn/pnpm a menos que detecte arquivos de lock específicos).
- **Prontidão de Infra:** Para comandos Docker, valide se o daemon está ativo antes de prosseguir.
- **Dry-Run:** Sempre utilize a flag `--dry-run` em migrações de banco de dados ou deleções em Cloud quando disponível.

## 3. Classificação de Comandos e Níveis de Permissão

### 🟢 Categoria Verde: Exploração e Contexto
* **Comandos:** `ls`, `cat`, `grep`, `pwd`, `echo`, `find`, `whoami`.
* **Ação:** Executar imediatamente para obter contexto. Notifique o usuário sobre a ação, mas não aguarde resposta.

### 🟡 Categoria Amarela: Instalação e Build
* **Comandos:** `npm install`, `pip install`, `make`, `docker build`, `git clone`.
* **Ação:** Anuncie a intenção claramente ("Vou instalar as dependências X...") e proceda com a execução.

### 🔴 Categoria Vermelha: Modificação e Remoção
* **Comandos:** `rm`, `mv` (sobrescrita), `sed -i`, `dd`, `kill`.
* **Ação: PAUSA OBRIGATÓRIA.**
    1. Explique o impacto exato (ex: "Isso removerá permanentemente o diretório /dist").
    2. Solicite confirmação explícita **OU** apresente o comando formatado para que o usuário execute manualmente.
    3. **Proibição Estrita:** Deleções em massa (`rm -rf /` ou `rm -rf *`) exigem aviso de perigo crítico e confirmação dupla.

## 4. Gestão de Fluxo e Erros
- **Execuções em Background:** Comandos de longa duração (ex: `next dev`, `docker-compose up`) devem ser sugeridos para execução em abas separadas, alertando que o terminal ficará ocupado.
- **Auto-Correção:** Em caso de erro (Exit Code != 0), sua próxima resposta deve obrigatoriamente analisar o log de erro e sugerir a correção técnica antes de tentar a reexecução.

## 5. Formatação de Saída
Sempre informe ao usuário em qual categoria o comando se encaixa antes de executá-lo ou solicitar permissão, utilizando os prefixos: `[EXPLORAÇÃO]`, `[BUILD]` ou `[CRÍTICO]`.
```

- Salve o conteúdo, pressionando Ctrl+S, simultaneamente.
- No painel Agent, acione o comando Back to agent.
- Verifique no diretório .agents se a rule foi configurada.


### Configuração de skills

- Acesse o Antigravity.
- Selecione o painel Agent.
- Acione o comando "+", Start a New Conversation (repita esse procedimento em todo início de seção, pelo menos).
- Cole o texto a seguir no prompt, solicitando a instalação das skills:

```
Instale localmente e em um diretório separado padrão esperado pelo antigravity as skills dos repositórios e endereços listados abaixo.

Nota de Performance: Para os endereços sob o domínio antigravity.codes e caminhos diretos de arquivos, utilize o modo de importação de conteúdo para evitar a varredura completa de diretórios, reduzindo o tempo de processamento.

1. Repositórios de Skills (GitHub):
https://github.com/google-labs-code/stitch-skills
https://github.com/vercel-labs/agent-skills
https://github.com/supabase/agent-skills

2. Skills de Conteúdo Direto (Non-Repo):
https://antigravity.codes/agent-skills/nextjs/nextjs
https://antigravity.codes/agent-skills/architecture/design-system-patterns

Manutenção do Ambiente
Remova, de forma local e global, todos os diretórios de agentes que não são utilizados nativamente pelo antigravity.

Diretórios para Exclusão:
.agents/
.cursor/
```
- Ao lado do item implementation_plan.md, acione o comando Open.
- Na seção de prompt, alterne da opção "Planning" para "Fast" (execução).
- Repita esse procedimento sempre que for executar um plano.
- No painel Implementation Plan, acione o comando Proceed.
- Interaja com o agente, provendo as entradas solicitadas.
- Ao lado do item walkthrough.md, acione o comando Open.
- Analise o conteúdo do arquivo.
- Analise também o conteúdo do arquivo Task.
- Verifique no diretório .agents se as skills foram instaladas.

### Configuração de MCP Servers

**Obtenção de credenciais**

- Crie o arquivo .env.local no diretório raiz do projeto.
- Acesse os endereços informados junto a cada credencia.
- Navegue em cada aplicação e obtenha os valores solicitados.

```
# GITHUB
# https://github.com/settings/tokens/new
GITHUB_PERSONAL_ACCESS_TOKEN=

# STITCH
# https://stitch.withgoogle.com/settings
STITCH_API_KEY=

# VERCEL
# https://vercel.com/account/settings/tokens
VERCEL_API_TOKEN=

# SUPABASE
# https://supabase.com/dashboard/account/tokens
SUPABASE_ACCESS_TOKEN=
#NEXT_PUBLIC_SUPABASE_URL=(será preenchida posteriormente)
#NEXT_PUBLIC_SUPABASE_ANON_KEY=(será preenchida posteriormente)

```

**Configuração dos MCP servers**

- Selecione o painel Agent.
- Selecione a opção Additional options (símbolo de três pontos "...").
- Na seção MCP Store, acione o comando Manage MCP Servers.
- No painel Manage MCP servers, acione o comando View raw config.
- Substitua o conteúdo existente pelo seguinte:
- Substitua o valor de cada chave pelo valor obtido no arquivo .env.local

```json
{
  "mcpServers": {
    "stitch": {
      "serverUrl": "https://stitch.googleapis.com/mcp",
      "headers": {
        "X-Goog-Api-Key": "<STITCH_API_KEY>"
      }
    },
    "github": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-github"
      ],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "<GITHUB_PERSONAL_ACCESS_TOKEN>"
      }
    },    
    "vercel": {
      "command": "npx",
      "args": [
        "mcp-remote",
        "https://mcp.vercel.com"
      ],
      "env": {
        "VERCEL_API_TOKEN": "<VERCEL_API_TOKEN>"
      }
    },    
    "supabase-mcp-server": {
      "command": "npx",
      "args": [
        "-y",
        "@supabase/mcp-server-supabase@latest",
        "--access-token",
        "<SUPABASE_ACCESS_TOKEN>"
      ],
      "env": {}
    }
  }
}
```

- Salve o arquivo.
- Acione comando Refresh.

### Teste de MCP Servers


- Solicite listar os projetos disponíveis no Stitch:

```
Use o mcp server do Stitch para listar os projetos
```

- Solicite listar as organizações do Supabase:

```
Use o mcp server do Supabase para listar as organizações e projetos
```

- Solicite listar os times e projetos do Vercel:

```
Use o mcp server do Vercel para listar os times e projetos
```

## 2.2 Criação do projeto web

- No painel Agent, selecione a opção Start a new conversation.
- Solicite a criação de um projeto (troque o <nome do projeto> pelo nome do projeto criado no Stitch e garanta que o @ se refira aos arquivos do projeto):

```
Crie um projeto web seguindo estritamente as orientações a seguir:
- Use as skills nextjs e design-systems
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

### Atualização de informações do projeto

- No painel Agent, selecione a opção Start a new conversation.
- Solicite a atualização do arquivo README.md:

```
Reconstrua o arquivo README.md utilizando as recomendações do GitHub
```

- No painel Agent, selecione a opção Start a new conversation.
- Solicite a criação do arquivo AGENTS.md:

```
Crie o arquivo AGENTS.md para o projeto usando como contexto apenas as seguintes informações:
- documentos docs/prd.md docs/prd.md docs/spec_ui.md e docs/spec_tech.md
- diretório src.
Use referências relativas para os arquivos citados.
```

-  Faça o commit das modificações locais e o push para o repositório remoto no GitHub.

## 2.3 Deploy com Vercel

- Acesse o site da Vercel <https://vercel.com/>.
- No canto superior direito, acione o comando Add New...
- Selecione "Project".
- Selecione "Import Git Repository".
- Selecione o repositório do seu projeto.
- Clique em "Import".
- Clique em "Deploy".
- Aguarde o deploy.
- Clique em "Continue to Dashboard".
- Caso tenha ocorrido algum erro, copie a mensagem de erro e cole no chat do agente para correção.
- Acesse a aplicação por meio do navegador web (O endereço é disponibilizado no formato https://<projeto>.vercel.app/).


## 2.4 Configuração do banco de dados Supabase

### Criação de banco de dados no Supabase

- No canto superior direito, selecione a organização criada.
- Na página Projects, acione o comando New Project.
- Para Project name, informe o nome do projeto.
- Para Database password, informe a senha.
- Para Region, selecione a região mais próxima de você.
- Acione o comando Create new project.
- Na página do projeto, posicione o mouse sobre o endereço do banco de dados.
- Copie os valores exibidos.
- Acesse o Antigravity.
- Edite o arquivo .env.local, preenchendo os seguintes valores:

```
#Supabase
SUPABASE_ACCESS_TOKEN=<access token>
NEXT_PUBLIC_SUPABASE_URL=<Project URL>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<Publishable Key>
```

### Criação de tabelas do banco de dados

- Selecione o painel Agent. 
- Abra uma nova conversa com o agente.
- Solicite ao agente a criação das tabelas do projeto:

```
Use o mcp server para criar as tabelas do banco de dados no Supabase.
```
  
- Avalie o plano de implementação e faça a aprovação.
- Acesse a aplicação com um usuário de perfil administrador.
- Cadastre itens relativos a categoria, cliente e produto (use imagens disponíveis em https://unsplash.com/)
- Acesse o Supabase.
- Na página Projects, selecione o projeto criado.
- No menu lateral esquerdo, selecione o item Database.
- Selecione o schema public.
- Verifique os dados persistidos.
- Acesse o Vercel e inclua as variáveis de ambiente do Supabase.
- Faça o commit das modificações locais e o push para o repositório remoto no GitHub.
- Verifique a aplicação publicada.

---

Fim do roteiro de delivery.