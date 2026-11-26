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

// Permite usar este arquivo nos testes.
if (typeof module !== "undefined") module.exports = { CATEGORIAS };
