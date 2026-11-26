// Categorias da API, com o nome em português e a cor do grupo.
const CATEGORIAS = {
  beauty: { nome: "Beleza", cor: "rosa" },
  "skin-care": { nome: "Pele", cor: "rosa" },
  "womens-jewellery": { nome: "Joias", cor: "lilas" },
  fragrances: { nome: "Perfumes", cor: "lilas" },
  "womens-watches": { nome: "Relógios femininos", cor: "lilas" },
  "mens-watches": { nome: "Relógios masculinos", cor: "lilas" },
  tops: { nome: "Blusas", cor: "laranja" },
  "womens-bags": { nome: "Bolsas", cor: "laranja" },
  "womens-shoes": { nome: "Calçados femininos", cor: "laranja" },
  "mens-shoes": { nome: "Calçados masculinos", cor: "laranja" },
  "mens-shirts": { nome: "Camisas", cor: "laranja" },
  sunglasses: { nome: "Óculos de sol", cor: "laranja" },
  "womens-dresses": { nome: "Vestidos", cor: "laranja" },
  vehicle: { nome: "Carros", cor: "agua" },
  "sports-accessories": { nome: "Esportes", cor: "agua" },
  motorcycle: { nome: "Motos", cor: "agua" },
  "mobile-accessories": { nome: "Acessórios", cor: "ceu" },
  smartphones: { nome: "Celulares", cor: "ceu" },
  laptops: { nome: "Notebooks", cor: "ceu" },
  tablets: { nome: "Tablets", cor: "ceu" },
  "kitchen-accessories": { nome: "Cozinha", cor: "mel" },
  "home-decoration": { nome: "Decoração", cor: "mel" },
  furniture: { nome: "Móveis", cor: "mel" },
  groceries: { nome: "Mercado", cor: "verde" },
};

// Palavras em português e o que a API entende: uma categoria ou um termo em inglês.
const PALAVRAS = {
  celular: "smartphones",
  telefone: "smartphones",
  acessorio: "mobile-accessories",
  notebook: "laptops",
  computador: "laptops",
  perfume: "fragrances",
  maquiagem: "beauty",
  beleza: "beauty",
  movel: "furniture",
  moveis: "furniture",
  mesa: "furniture",
  joia: "womens-jewellery",
  carro: "vehicle",
  moto: "motorcycle",
  cozinha: "kitchen-accessories",
  decoracao: "home-decoration",
  esporte: "sports-accessories",
  bola: "sports-accessories",
  comida: "groceries",
  mercado: "groceries",
  blusa: "tops",
  relogio: "watch",
  tenis: "shoes",
  sapato: "shoes",
  camisa: "shirt",
  vestido: "dress",
  bolsa: "bag",
  oculos: "sunglasses",
  batom: "lipstick",
  fone: "headphones",
  carregador: "charger",
  cama: "bed",
  cadeira: "chair",
  faca: "knife",
  suco: "juice",
  carne: "meat",
  maca: "apple",
  leite: "milk",
  ovo: "egg",
  arroz: "rice",
  brinco: "earring",
};

// "Relógios" vira "relogio" e depois "watch". Palavra desconhecida volta como foi digitada.
function traduzir(texto) {
  const palavra = texto.trim().toLowerCase().normalize("NFD").replace(/\p{M}/gu, "");
  const formas = [palavra, palavra.replace(/s$/, ""), palavra.replace(/es$/, "")];
  const conhecida = formas.find((forma) => Object.hasOwn(PALAVRAS, forma));
  return conhecida ? PALAVRAS[conhecida] : texto.trim();
}

// Permite usar este arquivo nos testes.
if (typeof module !== "undefined") module.exports = { CATEGORIAS, PALAVRAS, traduzir };
