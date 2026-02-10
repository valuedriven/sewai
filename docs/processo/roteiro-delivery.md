# Roteiro para desenvolvimento de produto

## 2. Delivery

### 2.1 Preparação do Antigravity

#### Configuração de rules

- Acesse o Antigravity.
- Selecione o painel Agent.
- Acione a opção Additional options (símbolo de três pontos "...").
- Selecione a opção Customizations.
- Na seção Rules, selecione a opção +Workspace.
- Em Enter rule name, informe "command-execution".
- Para Activate model, selecione a opção "Always On".
- Para Content, informe o conteúdo a seguir:

```
# Categorização de Comandos

O agente deve classificar o comando antes da execução e agir de acordo com a categoria:

## Categoria Verde: Leitura e Informação

- **Comandos:** `ls`, `cat`, `grep`, `pwd`, `echo`, `find`, `whoami`.
- **Ação:** Executar imediatamente para obter contexto. Não é necessária confirmação prévia, apenas notificação da ação.

## Categoria Amarela: Instalação e Build

- **Comandos:** `npm install`, `pip install`, `make`, `docker build`, `git clone`.
- **Ação:** Anunciar a intenção ("Vou instalar as dependências necessárias...") e prosseguir com a execução.

## Categoria Vermelha: Modificação e Remoção

- **Comandos:** `rm`, `mv` (quando sobrescreve), `sed -i`, `dd`, `kill`.
- **Ação:** **PAUSA OBRIGATÓRIA.**
    1.  Explique o impacto ("Este comando apagará o arquivo X permanentemente").
    2.  Solicite confirmação explícita OU apresente o comando para o usuário copiar e colar.
```

- Salve as alterações.


#### Configuração de skills com único agente

- Acesse o Antigravity.
- Selecione o painel Agent.
- Solicite a instalação da skill:

```
Instale localmente neste projeto a skill disponível no endereço:
https://github.com/google-labs-code/stitch-skills
```

- Ao lado do item implementation_plan.md, acione o comando Open.
- Na seção de prompt, alterne da opção "Planning" para "Fast" (execução).
- Repita esse procedimento sempre que for executar um plano.
- No painel Implementation Plan, acione o comando Proceed.
- Interaja com o agente, provendo as entradas solicitadas.
- Ao lado do item walkthrough.md, acione o comando Open.
- Analise o conteúdo do arquivo.

#### Configuração de skills usando subagentes

- Na barra superior, acione a opção Open Agent Manager.
- Selecione o workspace do projeto.
- Solicite a instalação das demais skills:

```
Instancie subagentes em paralelo para instalar neste projeto as skills disponíveis nos endereços:
- https://antigravity.codes/agent-skills/nextjs/nextjs
- https://antigravity.codes/agent-skills/architecture/design-system-patterns
- https://github.com/vercel-labs/agent-skills
- https://github.com/clerk/skills
- https://github.com/supabase/agent-skills
- https://github.com/sickn33/antigravity-awesome-skills/blob/main/skills/grafana-dashboards/SKILL.md
```

- Aguarde a conclusão. 
- Na barra superior, acione a opção Open Editor, para retornar ao editor do projeto.
- Solicite a remoção da pasta de agentes que não seja usada pelo antigravity (.agents e .cursor, por exemplo):

```
Remova local e globalmente as pasta de agentes que não sejam usadas pelo antigravity, tais como .agents e .cursor
```

#### Configuração de MCP Servers

**Configuração de MCP Server do Stitch**
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

**Configuração de MCP Server do Supabase**
- Certifique-se de que o projeto criado anteriormente está disponível.
- Selecione o painel Agent.
- Selecione o item Mais Opções (os três pontos "...").
- Selecione a opção MCP Servers.
- No campo Search MCP Servers, procure por "supabase" (sem as aspas).
- Selecione o MCP Server do Supabase.
- No painel Supabase, selecione a opção Configure.
- Cole a access token obtida no Supabase.
- Solicite ao agente para listar os projetos disponíveis:

```
Use o mcp server e liste os projetos do Supabase.
```


### 2.2 Criação do projeto web

- No painel Agent, selecione a opção Start a new conversation.
- Solicite a criação de um projeto:

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

#### Criação de AGENTS.md

- No painel Agent, selecione a opção Start a new conversation.
- Solicite a criação do arquivo AGENTS.md:

```
Crie o arquivo AGENTS.md para o projeto usando como contexto apenas as seguintes informações:
- documentos docs/prd.md docs/prd.md docs/spec_ui.md e docs/spec_tech.md
- diretório src.
Use referências relativas para os arquivos citados.
```

#### Atualização do README.md

- No painel Agent, selecione a opção Start a new conversation.
- Solicite a criação do arquivo AGENTS.md:

```
Reconstrua o arquivo README.md utilizando as recomendações do GitHub
```

-  Faça o commit das modificações locais e o push para o repositório remoto no GitHub.

### 2.3 Deploy com Vercel

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


### 2.4 Configuração de segurança com Clerk

#### Configuração de autenticação

- Acesse o site do Clerk <https://clerk.com/>.
- No menu principal, selecione a seção Applications.
- Acione o comando New Application.
- Para o campo Application name, informe o nome do projeto.
- Acione o comando Create application.
- Na página Overview, navegue até o item Set your Clerk API keys.
- Copie o conteúdo das chaves disponibilizado.
- Retorne ao Antigravity.
- Crie um arquivo .env.local no repositório do projeto.
- Coloque as informações de credenciais no arquivo .env.local.  
- Solicite ao agente a configuração do clerk no projeto:

```
Use a skill específica do Clerk para configurar a autenticação no projeto
```
- Verifique o plano de implementação e faça a aprovação.
- Após a conclusão, navegue na aplicação verifique se tanto o botão Login quanto o Finalizar compra apontam para a página de login.
- Caso ocorra algum erro, copie a mensagem de erro e cole no chat do agente para correção.
- Faça o registro e o login de um usuário.
- Acesse o Clerk.
- Selecione a aplicação.
- Selecione a opção Users.
- Verifique o usuário cadastrado no projeto.
- Faça o commit das modificações locais e o push para o repositório remoto no GitHub.

#### Configuração do Vercel para integração com Clerk

- Acesse a Vercel.
- Selecione o projeto.
- Selecione a opção Settings.
- Selecione a opção Environment variables.
- Adicione as variáveis de ambiente do Clerk.
- Acione o comando Redeploy.
- Acione o comando View Deployment.
- Acesse a aplicação publicada e faça o login.


#### Configuração de autorização

Ajustes na imlementação:
- Solicite ao agente a configuração do controle das páginas protegidas do administrador:

```
Configure o controle das páginas protegidas do administrador no projeto de forma que as páginas sensíveis sejam vistas apenas por um usuário administrador logado
```

- Verifique o plano de implementação e faça a aprovação.

Ajustes na configuração do Clerk:
- Acesse o projeto no Clerk.
- Selecione a aplicação.
- Selecione a opção Configure.
- Selecione a opção Sessions.
- Na página Sessions, selecione a opção Customize session token.
- Para o campo Claims, informe o valor a seguir:

```json
{
    "metadata": "{{user.public_metadata}}"
}
```
- Salve as alterações.
- Selecione a opção Users.
- Selecine o usuário cadastrado.
- Navegue até a seção Metadata.
- Para o item Public, acione o comando Edit.
- Inclua a seguinte informação:

```json
{
    "role": "admin"
}
```

- Salve as alterações.
- Faça um novo login na aplicação e verifique se as páginas protegidas do administrador sejam vistas apenas por um usuário administrador logado.
- Faça o commit das modificações locais e o push para o repositório remoto no GitHub.
- Verifique se o deploy foi realizado com sucesso e se as alterações foram aplicadas na solução implantada.


### 2.5 Configuração do banco de dados Supabase

#### Obtenção das credenciais do usuário

- Faça o login no Supabase <https://supabase.com/>.
- No menu superior, canto superior direito, selecione o perfil do usuário.
- Selecione o item Account Preferences.
- Selecione o item Access Tokens.
- Acione o comando Generate new token.
- Copie o token criado.

#### Criação de banco de dados no Supabase

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

#### Criação de tabelas do banco de dados

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


#### Sincronização entre usuário e cliente

- Selecione o painel Agent.
- Abra uma nova conversa.
- Solicite que seja configurada a sincronização entre o usuário autenticado no Clerk e cliente no Supabase:

```
Ajuste a aplicação de forma que, caso um usuário logado não esteja cadastrado, seja criado um registro na tabela de customers, para permitir efetivar a compra.
```
- Retorne a aplicação, faça cadastro como usuário comum faça uma nova compra.
- Verifique se o cliente foi criado no Supabase.
- Faça o commit das modificações locais e o push para o repositório remoto no GitHub.
- Verifique a aplicação publicada.



## 2.5 Configuração de observabilidade com Grafana Cloud

- Acesse o Grafana Cloud.
- Faça o login.
- No menu superior, canto superior direito, selecione o perfil do usuário.
- Selecione o item Account Preferences.
- Selecione o item Access Tokens.
- Acione o comando Generate new token.
- Copie o token criado.
- Selecione a organização configurada.
- Acione o comando Add Stack.
- Para Stack Identifier, informe o nome do projeto.
- Acione o comando Add Stack.
- Aguarde a configuração do stack.
- Na página Manage Stack: <projeto>, acione o comando Detais, no card Grafana.
- Na seção Instance Details, acione o link do campo Url (https://<projeto>.grafana.net)
- Na página Grafana, menu lateral esquerdo, selecione o Observability.
- No card Frontend, acione o comando Open.
- Na página Frontend Observability, acione o comando Create New.
- Para Application name, informe o nome do projeto.
- Para o tópico Domains, informe os domínios:
  - https://<projeto>.vercel.app
  - https://localhost:3000
- Acione o comando Next.
- Navegue até a seção Add Faro to your application.
- Copie o código fornecido para o campo Url.
- Acione o comando Continue (2x).
- Acione o comando Complete.

- Acesse o Antigravity.
- Edite o arquivo .env.local, preenchendo os seguintes valores:

```
#Grafana Faro
NEXT_PUBLIC_FARO_URL=<Faro URL>
NEXT_PUBLIC_FARO_APP_NAME=<projeto>
```
- Solicite a configuração do Grafana:

```
Configure o Grafana para realizar a observabilidade do frontend
```




