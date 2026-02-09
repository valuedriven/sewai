---
trigger: always_on
---

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