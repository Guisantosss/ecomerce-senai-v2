# Gôndola

Catálogo de produtos feito com HTML, CSS e JavaScript puro. Os dados vêm da API pública [DummyJSON](https://dummyjson.com/docs/products).

- **Versão:** 0.3.0 ([histórico](CHANGELOG.md))
- **Site:** https://guisantosss.github.io/ecomerce-senai-v2/
- **Código:** https://github.com/Guisantosss/ecomerce-senai-v2
- **Equipe:** G Santos e Amaral

## Etapas

O trabalho está dividido em epics. Cada epic vira uma versão.

| Epic | Entrega |
|---|---|
| 01 | Documentação, git-flow e equipe |
| 02 | Teste da API, cards dos produtos e limite de 20 |
| 03 | Cabeçalho e rodapé |
| 04 | Carrossel, busca e impacto visual |
| 05 | Faixa de benefícios e filtro por categoria |

## O que o site faz

- Mostra 20 produtos em cards, com foto, preço com desconto, nota e estoque.
- Cada grupo de categorias tem uma cor.
- Abre os detalhes de um produto, consultando a API pelo código dele.
- Avisa quando a API não responde.

## Como abrir

Acesse o site ou dê dois cliques em `index.html`. É preciso ter internet.

Para usar um servidor local, com Python instalado, rode `npm start` e acesse http://localhost:5500.

## Como testar

Com Node 22 ou mais novo, rode `npm test`. Os casos estão em [docs/teste-da-api.md](docs/teste-da-api.md).

## Arquivos

| Arquivo | Função |
|---|---|
| `index.html` | Estrutura da página |
| `css/estilo.css` | Visual |
| `js/api.js` | Consultas à API e limite de 20 produtos |
| `js/dados.js` | Categorias e cores |
| `js/app.js` | Cards e detalhes |
| `tests/api.test.js` | Testes da API |
| `docs/git-flow.md` | Como a equipe usa as branches |
| `docs/teste-da-api.md` | Teste da API |

## O que o site faz

- Mostra 20 produtos em cards, com foto, preço com desconto, nota e estoque.
- Cada grupo de categorias tem uma cor.
- Abre os detalhes de um produto, consultando a API pelo código dele.
- Avisa quando a API não responde.
- Cabeçalho e rodapé que se ajustam ao tamanho da tela.

## Como abrir

Acesse o site ou dê dois cliques em `index.html`. É preciso ter internet.

Para usar um servidor local, com Python instalado, rode `npm start` e acesse http://localhost:5500.

## Como testar

Com Node 22 ou mais novo, rode `npm test`. Os casos estão em [docs/teste-da-api.md](docs/teste-da-api.md).

## Arquivos

| Arquivo | Função |
|---|---|
| `index.html` | Estrutura da página |
| `css/estilo.css` | Visual |
| `js/api.js` | Consultas à API e limite de 20 produtos |
| `js/dados.js` | Categorias e cores |
| `js/app.js` | Cards e detalhes |
| `tests/api.test.js` | Testes da API |
| `docs/git-flow.md` | Como a equipe usa as branches |
| `docs/teste-da-api.md` | Teste da API |

## Como contribuir

O projeto usa git-flow. Leia [docs/git-flow.md](docs/git-flow.md) antes do primeiro commit.

## Limitações

- Os produtos vêm em inglês e com preços em dólar, como a API envia.
