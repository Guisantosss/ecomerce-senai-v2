// Rode com: npm test (precisa de internet)
const test = require("node:test");
const assert = require("node:assert/strict");
const Api = require("../js/api.js");

const CAMPOS = ["id", "title", "price", "discountPercentage", "category", "rating", "stock", "thumbnail"];

test("lista traz 20 produtos com os campos que o card usa", async () => {
  const { produtos, total } = await Api.listar();
  assert.equal(produtos.length, 20);
  assert.ok(total > 20);
  for (const produto of produtos) {
    for (const campo of CAMPOS) assert.ok(campo in produto, `falta ${campo} no produto ${produto.id}`);
  }
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
