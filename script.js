// Clona as imagens para garantir uma transição contínua
const carousel = document.querySelector(".carrossel");
const images = carousel.querySelectorAll("img");

images.forEach((image) => {
  const clone = image.cloneNode(true);
  carousel.appendChild(clone);
});

// Animação do carrossel
let position = 0;

function animateCarousel() {
  position -= 1; // Move uma unidade para a esquerda a cada intervalo
  carousel.style.transform = `translateX(${position}px)`;

  // Quando a primeira imagem sair da visão, move-a para o final do carrossel
  if (position <= -carousel.firstElementChild.offsetWidth - 150) {
    carousel.appendChild(carousel.firstElementChild);
    position += carousel.firstElementChild.offsetWidth + 20;
    carousel.style.transform = `translateX(${position}px)`;
  }

  // Repete a animação
  requestAnimationFrame(animateCarousel);
}

animateCarousel();
