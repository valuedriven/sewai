# Roteiro para desenvolvimento de produto

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
