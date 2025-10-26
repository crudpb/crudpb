// Load communities data
async function loadCommunities() {
    try {
        const response = await fetch('./data/communities.json');
        const data = await response.json();
        
        const container = document.querySelector('.cards');
        
        data.communities.forEach(community => {
            const article = document.createElement('article');
            const link = document.createElement('a');
            const img = document.createElement('img');
            
            link.href = community.link;
            link.target = '_blank';
            
            img.src = community.image;
            img.alt = community.name;
            img.className = 'article-img';
            
            link.appendChild(img);
            article.appendChild(link);
            container.appendChild(article);
        });
    } catch (error) {
        console.error('Error loading communities:', error);
    }
}

// Carousel animation
const carousel = document.querySelector(".carrossel");
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

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    loadCommunities();
    animateCarousel();
});
