// Clona as imagens para garantir uma transição contínua
const carousel = document.querySelector(".carrossel");

// Animação do carrossel
let position = -150;

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
