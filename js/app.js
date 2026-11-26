// Liga a tela à API: busca, cards e janela de detalhes.
const $ = (seletor, dentro = document) => dentro.querySelector(seletor);
const clonar = (modelo) => $(modelo).content.firstElementChild.cloneNode(true);

const campos = $("#busca").elements;
const situacao = $("#situacao");
const prateleira = $("#prateleira");
const vazio = $("#vazio");
const falha = $("#falha");
const janela = $("#detalhes");

const dinheiro = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "USD" });
const decimal = new Intl.NumberFormat("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const pedidos = {};
let espera;

// Cancela o pedido anterior do mesmo tipo, para uma resposta atrasada não trocar a tela.
function novoPedido(tipo) {
  pedidos[tipo]?.abort();
  pedidos[tipo] = new AbortController();
  return pedidos[tipo].signal;
}

function textoEstoque(estoque) {
  if (estoque === 0) return "Esgotado";
  return estoque <= 10 ? `Só ${estoque} em estoque` : `${estoque} em estoque`;
}

// Preenche o que o card e a janela têm em comum. Usa textContent: dado da API nunca vira HTML.
function preencher(modelo, produto, foto) {
  const copia = clonar(modelo);
  const escrever = (seletor, texto) => ($(seletor, copia).textContent = texto);
  const { nome, cor } = CATEGORIAS[produto.category];
  const desconto = Math.round(produto.discountPercentage);
  const img = $("img", copia);

  copia.dataset.cor = cor;
  img.alt = produto.title;
  img.onerror = () => img.remove();
  img.src = foto;
  escrever(".nome", produto.title);
  escrever(".marca", produto.brand ?? nome);
  escrever(".antes s", dinheiro.format(produto.price));
  escrever(".agora", dinheiro.format(produto.price * (1 - produto.discountPercentage / 100)));
  escrever(".desconto", `-${desconto}%`);
  escrever(".nota", `Nota ${decimal.format(produto.rating)}`);
  escrever(".estoque", textoEstoque(produto.stock));
  $(".desconto", copia).hidden = desconto < 1;
  $(".antes", copia).hidden = desconto < 1;
  $(".estoque", copia).classList.toggle("acabando", produto.stock <= 10);
  return copia;
}

function criarCard(produto) {
  const card = preencher("#modelo-card", produto, produto.thumbnail);
  const botao = $("button", card);
  botao.setAttribute("aria-label", `Ver detalhes de ${produto.title}`);
  botao.addEventListener("click", () => abrirDetalhes(produto.id));
  return card;
}

async function consultar() {
  clearTimeout(espera);
  const sinal = novoPedido("lista");
  const alvo = traduzir(campos.termo.value);

  vazio.hidden = true;
  falha.hidden = true;
  situacao.textContent = "Buscando produtos…";
  prateleira.replaceChildren(...Array.from({ length: Api.LIMITE }, () => clonar("#modelo-vazio")));

  try {
    let resultado;
    if (!alvo) resultado = await Api.listar(sinal);
    else if (Object.hasOwn(CATEGORIAS, alvo)) resultado = await Api.porCategoria(alvo, sinal);
    else resultado = await Api.buscar(alvo, sinal);

    const { produtos, total } = resultado;
    prateleira.replaceChildren(...produtos.map(criarCard));
    situacao.textContent = `Produtos na prateleira: ${produtos.length} de ${total}`;
    vazio.hidden = produtos.length > 0;
  } catch (erro) {
    if (sinal.aborted) return;
    prateleira.replaceChildren();
    situacao.textContent = erro.message;
    falha.hidden = false;
  }
}

async function abrirDetalhes(id) {
  const sinal = novoPedido("detalhes");
  const corpo = $("#detalhes-corpo");
  corpo.textContent = "Buscando o produto…";
  janela.showModal();

  try {
    const produto = await Api.porId(id, sinal);
    const ficha = preencher("#modelo-detalhes", produto, produto.images[0]);
    $(".descricao", ficha).textContent = produto.description;
    $(".codigo", ficha).textContent = `Código ${produto.sku}`;
    corpo.replaceChildren(ficha);
  } catch (erro) {
    if (!sinal.aborted) corpo.textContent = `${erro.message} Feche e tente de novo.`;
  }
}

$("#busca").addEventListener("submit", (evento) => {
  evento.preventDefault();
  consultar();
});

// Espera a pessoa parar de digitar para não fazer um pedido por letra.
campos.termo.addEventListener("input", () => {
  clearTimeout(espera);
  espera = setTimeout(consultar, 400);
});

// Botões com data-busca (sugestões, carrossel e vitrine) fazem uma busca pronta.
document.addEventListener("click", ({ target }) => {
  const atalho = target.closest("[data-busca]");
  if (!atalho) return;
  campos.termo.value = atalho.dataset.busca;
  consultar();
  $("#produtos").scrollIntoView();
});

$("button", falha).addEventListener("click", consultar);

consultar();
