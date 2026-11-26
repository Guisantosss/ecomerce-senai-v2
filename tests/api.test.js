// Rode com: npm test (precisa de internet)
const test = require("node:test");
const assert = require("node:assert/strict");
const Api = require("../js/api.js");
const { CATEGORIAS, PALAVRAS, traduzir } = require("../js/dados.js");

const CAMPOS = ["id", "title", "price", "discountPercentage", "category", "rating", "stock", "thumbnail"];

test("lista traz 20 produtos com os campos que o card usa", async () => {
  const { produtos, total } = await Api.listar();
  assert.equal(produtos.length, 20);
  assert.ok(total > 20);
  for (const produto of produtos) {
    for (const campo of CAMPOS) assert.ok(campo in produto, `falta ${campo} no produto ${produto.id}`);
  }
});

test("busca por nome respeita o limite de 20", async () => {
  const { produtos, total } = await Api.buscar("phone");
  assert.ok(total > 20, "a busca precisa ter mais de 20 resultados para provar o limite");
  assert.equal(produtos.length, 20);
});

test("busca com espaço e símbolo, sem resultado, devolve lista vazia", async () => {
  assert.deepEqual(await Api.buscar("nao existe & nada"), { produtos: [], total: 0 });
});

test("consulta por categoria só traz produtos dela", async () => {
  const { produtos } = await Api.porCategoria("laptops");
  assert.ok(produtos.length > 0);
  assert.ok(produtos.every((produto) => produto.category === "laptops"));
});

test("as categorias da tela são as mesmas da API", async () => {
  const resposta = await fetch("https://dummyjson.com/products/category-list");
  assert.deepEqual(Object.keys(CATEGORIAS).sort(), (await resposta.json()).sort());
});

test("toda palavra em português encontra pelo menos um produto", async () => {
  for (const alvo of new Set(Object.values(PALAVRAS))) {
    const consulta = Object.hasOwn(CATEGORIAS, alvo) ? Api.porCategoria : Api.buscar;
    const { produtos } = await consulta(alvo);
    assert.ok(produtos.length > 0, `sem produtos para ${alvo}`);
  }
});

test("tradução entende acento, maiúscula e plural", () => {
  assert.equal(traduzir(" Relógios "), "watch");
  assert.equal(traduzir("CELULARES"), "smartphones");
  assert.equal(traduzir("Tênis"), "shoes");
  assert.equal(traduzir("acessórios"), "mobile-accessories");
});

test("palavra desconhecida segue como foi digitada", () => {
  assert.equal(traduzir("iPhone 13"), "iPhone 13");
  assert.equal(traduzir("constructor"), "constructor");
  assert.equal(traduzir("  "), "");
});

test("consulta por código traz o que a janela de detalhes usa", async () => {
  const produto = await Api.porId(1);
  assert.equal(produto.id, 1);
  assert.ok(produto.description && produto.sku && produto.images[0]);
});

test("código que não existe gera erro claro", async () => {
  await assert.rejects(Api.porId(99999), { message: "A API respondeu com o código 404." });
});

test("limite de 20 vale mesmo se a API mandar mais", async (t) => {
  const muitos = Array.from({ length: 30 }, (_, id) => ({ id }));
  t.mock.method(globalThis, "fetch", async () => Response.json({ products: muitos, total: 30 }));
  assert.equal((await Api.listar()).produtos.length, 20);
});

test("sem internet a mensagem de erro é clara", async (t) => {
  t.mock.method(globalThis, "fetch", async () => {
    throw new TypeError("fetch failed");
  });
  await assert.rejects(Api.listar(), { message: "Não foi possível falar com a API." });
});

test("API lenta demais gera mensagem própria", async (t) => {
  t.mock.method(globalThis, "fetch", async () => {
    throw new DOMException("lento", "TimeoutError");
  });
  await assert.rejects(Api.listar(), { message: "A API demorou demais para responder." });
});
