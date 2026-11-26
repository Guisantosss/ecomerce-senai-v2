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
| Busca por nome | `/products/search?q=phone&limit=20` |
| Por categoria | `/products/category/laptops?limit=20` |
| Por código | `/products/1` |
| Lista de categorias (só no teste) | `/products/category-list` |

## Casos testados

| Caso | Esperado |
|---|---|
| Lista inicial | 20 produtos, com os campos do card |
| Buscar "phone" | Mais de 20 encontrados, 20 mostrados |
| Buscar nome que não existe, com espaço e símbolo | Lista vazia |
| Categoria "laptops" | Só notebooks |
| Categorias da tela | Iguais às da API |
| Cada palavra em português | Encontra ao menos um produto |
| Acento, maiúscula e plural | Palavra reconhecida |
| Palavra fora da lista | Vai para a API como foi digitada |
| Código 1 | Produto 1, com os campos dos detalhes |
| Código 99999 | Erro 404 com mensagem clara |
| API manda 30 produtos | Site usa 20 |
| Sem internet | Mensagem de erro clara |
| API lenta demais | Mensagem própria |

Os testes de tradução, limite forçado, falta de internet e lentidão rodam sem internet. Os outros chamam a API de verdade.
