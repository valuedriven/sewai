# Roteiro para desenvolvimento de produto

Pré-requisitos:
- Google Antigravity <https://antigravity.google> instalado localmente.
- Node.js <https://nodejs.org/> instalado localmente.
- Git <https://git-scm.com/> instalado localmente.
- Conta GitHub <https://github.com/>.
- Conta Vercel <https://vercel.com/>.
- Conta Clerk <https://www.clerk.com/>.
- Conta Supabase <https://www.supabase.com/>.
- Conta Grafana Cloud <https://grafana.com/cloud/>.

Os objetivos são:
- Clareza de escopo
- Redução de ambiguidade
- Consistência entre requisitos, design e implementação
- Uso eficiente de modelos de IA como copilotos de desenvolvimento

Diretrizes gerais:
- Usar saída de cada atividade como contexto para atividade seguinte.
- Usar one shot injection.
- GitHub como single source of truth em todo fluxo.
- Markdown como "língua franca".

## 1. Discovery

### 1.1 Entendimento do problema

Resultados:
- Definição do problema (problem_statement.md)

Participantes:
- Gerente de produtos

Ferramentas:
- IA de uso geral (ChatGPT, Gemini, Claude, Kimi etc.)

Considerações:
- Usar deepresearch para validar problema

### 1.2 Refinamento

Resultados:
- Definição do produto (prd.md)
- Especificação de requisitos (spec_req.md)
- Especificação técnica (spec_tech.md)
- Especificação de UI (spec_ui.md)

Participantes:
- Gerente de produtos
- Desenvolvedor
- Designer UX

Ferramentas:
- IA de uso geral (ChatGPT, Gemini, Claude, Kimi etc.)

Considerações:
- Solicitar IA para validar resultados

### 1.3 Desenho

Resultados:
- Protótipos
- Design system (design_system.md)
- Modelo de dados

Participantes:
- Designer UX
- Desenvolvedor

Ferramentas:
- IA de uso geral (ChatGPT, Gemini, Claude, Kimi etc.)
- Ferramentas de prototipação (Stitch etc.)

Considerações:
- Solicitar IA para validar resultados

## 2. Delivery

### 2.1. Desenvolvimento

Resultados:
- Scaffold
- Incremento de Produto

Participantes:
- Designer UX
- Desenvolvedor

Ferramentas:
- Ambientes de desenvolvimento (Google Antigravity, Claude Code, etc.)

Considerações:
- Usar deepresearch

### 2.2. Testes

Resultados:
- Produto testado

Participantes:
- Desenvolvedor
- Designer UX

Ferramentas:
- Ambientes de desenvolvimento.

Considerações:

### 2.3. Liberação

Resultados:
- Produto implantado

Participantes:
- Desenvolvedor
- Designer UX

Ferramentas:
- Ambientes de desenvolvimento.
- Infraestrutura de deployment (Vercel).
- Serviço de autenticação e autorização (Clerk).
- Serviço de banco de dados (Supabase).
- Serviço de observabilidade (Grafana Cloud).
---

