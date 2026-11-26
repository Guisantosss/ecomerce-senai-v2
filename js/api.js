// Consultas à API de produtos. Não mexe na tela.
const Api = (() => {
  const BASE = "https://dummyjson.com/products";
  const CAMPOS = "title,price,discountPercentage,category,brand,rating,stock,thumbnail";

  class ErroApi extends Error {}

  async function pedir(caminho, parametros = {}, sinal) {
    const prazo = AbortSignal.timeout(10000);
    try {
      const resposta = await fetch(`${BASE}${caminho}?${new URLSearchParams(parametros)}`, {
        signal: sinal ? AbortSignal.any([sinal, prazo]) : prazo,
      });
      if (!resposta.ok) throw new ErroApi(`A API respondeu com o código ${resposta.status}.`);
      return await resposta.json();
    } catch (erro) {
      if (erro instanceof ErroApi || erro.name === "AbortError") throw erro;
      if (erro.name === "TimeoutError") throw new ErroApi("A API demorou demais para responder.");
      throw new ErroApi("Não foi possível falar com a API.");
    }
  }

  async function pedirLista(caminho, parametros, sinal) {
    const { products, total } = await pedir(caminho, { ...parametros, select: CAMPOS }, sinal);
    return { produtos: products, total };
  }

  return {
    ErroApi,
    listar: (sinal) => pedirLista("", {}, sinal),
    porId: (id, sinal) => pedir(`/${id}`, {}, sinal),
  };
})();

// Permite usar este arquivo nos testes.
if (typeof module !== "undefined") module.exports = Api;
