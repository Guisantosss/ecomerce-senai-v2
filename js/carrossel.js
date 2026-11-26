// Carrossel de destaques: troca sozinho a cada 5 segundos, para com o mouse ou o foco em cima e tem botão de pausa.
(() => {
  const carrossel = document.querySelector(".carrossel");
  const faixa = carrossel.querySelector(".slides");
  const slides = [...faixa.children];
  const pontos = [...carrossel.querySelectorAll(".pontos button")];
  const pausa = carrossel.querySelector(".pausa");
  const calmo = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let atual = 0;
  let parado = calmo;

  function mostrar(numero) {
    atual = (numero + slides.length) % slides.length;
    faixa.scrollTo({ left: atual * faixa.clientWidth, behavior: calmo ? "instant" : "smooth" });
  }

  // Marca o slide visível. Também roda quando a pessoa arrasta com o dedo.
  function marcar() {
    atual = Math.round(faixa.scrollLeft / faixa.clientWidth);
    slides.forEach((slide, i) => {
      slide.classList.toggle("ativo", i === atual);
      slide.inert = i !== atual;
    });
    pontos.forEach((ponto, i) => ponto.setAttribute("aria-current", i === atual));
  }

  function alternarPausa() {
    parado = !parado;
    pausa.textContent = parado ? "Continuar" : "Pausar";
  }

  faixa.addEventListener("scroll", marcar);
  carrossel.querySelector(".anterior").addEventListener("click", () => mostrar(atual - 1));
  carrossel.querySelector(".proximo").addEventListener("click", () => mostrar(atual + 1));
  pontos.forEach((ponto, i) => ponto.addEventListener("click", () => mostrar(i)));
  pausa.addEventListener("click", alternarPausa);

  setInterval(() => {
    if (!parado && !carrossel.matches(":hover, :focus-within")) mostrar(atual + 1);
  }, 5000);

  if (calmo) pausa.textContent = "Continuar";
  marcar();
})();
