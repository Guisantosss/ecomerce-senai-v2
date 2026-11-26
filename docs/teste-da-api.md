# Teste da API

- **API:** https://dummyjson.com/products
- **Como repetir:** `npm test` (precisa de Node 22 ou mais novo e de internet)

## Por que a DummyJSON

| API | Resposta | Busca por nome | Limite de itens |
|---|---|---|---|
| DummyJSON | Respondeu | Sim (`/search?q=`) | Sim (`limit`) |
| Fake Store API | Respondeu | Não | Sim (`limit`) |
| Platzi Fake Store | Não respondeu no teste | Não avaliada | Não avaliada |

## Consultas usadas

| Consulta | Endereço |
|---|---|
| Lista | `/products?limit=20` |
| Por código | `/products/1` |

## Casos testados

| Caso | Esperado |
|---|---|
| Lista inicial | 20 produtos, com os campos do card |
| Código 1 | Produto 1, com os campos dos detalhes |
| Código 99999 | Erro 404 com mensagem clara |
| API manda 30 produtos | Site usa 20 |
| Sem internet | Mensagem de erro clara |
| API lenta demais | Mensagem própria |

Os três primeiros chamam a API de verdade. Os outros rodam sem internet.
