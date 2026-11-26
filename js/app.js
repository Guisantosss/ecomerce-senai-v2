// Liga a tela à API: cards e janela de detalhes.
const $ = (seletor, dentro = document) => dentro.querySelector(seletor);
const clonar = (modelo) => $(modelo).content.firstElementChild.cloneNode(true);

const situacao = $("#situacao");
const prateleira = $("#prateleira");
const falha = $("#falha");
const janela = $("#detalhes");

const dinheiro = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "USD" });
const decimal = new Intl.NumberFormat("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const pedidos = {};

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

async function carregar() {
  const sinal = novoPedido("lista");

  falha.hidden = true;
  situacao.textContent = "Buscando produtos…";
  prateleira.replaceChildren(...Array.from({ length: Api.LIMITE }, () => clonar("#modelo-vazio")));

  try {
    const { produtos, total } = await Api.listar(sinal);
    prateleira.replaceChildren(...produtos.map(criarCard));
    situacao.textContent = `Produtos na prateleira: ${produtos.length} de ${total}`;
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

$("button", falha).addEventListener("click", carregar);

carregar();
