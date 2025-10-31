// Load communities data
async function loadCommunities() {
    try {
        const response = await fetch('./data/communities.json');
        const data = await response.json();
        
        const listaPrincipal = document.getElementById('listaPrincipal');
        
        data.communities.forEach(community => {
            if (community.hasOwnProperty('newRenderMode') && community.newRenderMode) {
                newRendering(community, listaPrincipal);
            } else {
                traditionalRendering(community, container);
            }
        });
    } catch (error) {
        console.error('Error loading communities:', error);
    }
}

function traditionalRendering(community, container) {
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
}

function newRendering(community, container) {
    const customCard = document.createElement('div');
    const cardImageWrapper = document.createElement('div');
    const cardLink = document.createElement('a');
    const cardImage = document.createElement('img');
    const cardText = document.createElement('div');
    const cardTextFull = document.createElement('div');
    const tooltip = document.createElement('div');

    customCard.className = 'custom-card';
    cardImageWrapper.className = 'card-image-wrapper';

    cardLink.href = community.link;
    cardLink.target = '_blank';

    cardImage.src = community.image;
    cardImage.alt = community.name;
    cardImage.className = 'card-image';

    // First text: ellipsis, no wrap
    cardText.className = 'card-text';
    cardText.textContent = community.name;

    // Second text: ellipsis, no wrap
    cardTextFull.className = 'card-text-full';
    cardTextFull.textContent = community.description || '';

    // Tooltip for long description
    tooltip.className = 'custom-card-tooltip';
    tooltip.textContent = community.longDescription || '';

    customCard.appendChild(cardImageWrapper);

    cardImageWrapper.appendChild(cardLink);
    cardLink.appendChild(cardImage);

    customCard.appendChild(cardText);
    customCard.appendChild(cardTextFull);
    customCard.appendChild(tooltip);

    // --- Tooltip positioning logic ---
    // Desktop: show tooltip near mouse
    customCard.addEventListener('mousemove', function (e) {
        if (!customCard.classList.contains('show-tooltip')) return;
        if (tooltip.textContent.trim() === '') return;
        // Offset so tooltip is not directly under cursor
        const offsetX = 18;
        const offsetY = 18;
        let x = e.clientX + offsetX;
        let y = e.clientY + offsetY;
        // Prevent tooltip from going off right/bottom edge
        const rect = tooltip.getBoundingClientRect();
        if (x + rect.width > window.innerWidth) x = window.innerWidth - rect.width - 10;
        if (y + rect.height > window.innerHeight) y = window.innerHeight - rect.height - 10;
        tooltip.style.left = x + 'px';
        tooltip.style.top = y + 'px';
    });
    customCard.addEventListener('mouseenter', function (e) {
        if (tooltip.textContent.trim() === '') return;
        customCard.classList.add('show-tooltip');
    });
    customCard.addEventListener('mouseleave', function (e) {
        customCard.classList.remove('show-tooltip');
        tooltip.style.left = '0px';
        tooltip.style.top = '0px';
    });

    // Touch support for tooltip (long press)
    let touchTimer = null;
    customCard.addEventListener('touchstart', function (e) {
        if (tooltip.textContent.trim() === '') return;
        if (e.touches.length > 0) {
            const touch = e.touches[0];
            touchTimer = setTimeout(() => {
                customCard.classList.add('show-tooltip');
                // Position tooltip near touch point
                let x = touch.clientX + 18;
                let y = touch.clientY + 18;
                const rect = tooltip.getBoundingClientRect();
                if (x + rect.width > window.innerWidth) x = window.innerWidth - rect.width - 10;
                if (y + rect.height > window.innerHeight) y = window.innerHeight - rect.height - 10;
                tooltip.style.left = x + 'px';
                tooltip.style.top = y + 'px';
            }, 500); // 500ms long press
        }
    });
    customCard.addEventListener('touchend', function (e) {
        clearTimeout(touchTimer);
        setTimeout(() => {
            customCard.classList.remove('show-tooltip');
            tooltip.style.left = '0px';
            tooltip.style.top = '0px';
        }, 1200); // Hide after 1.2s
    });
    customCard.addEventListener('touchmove', function (e) {
        clearTimeout(touchTimer);
    });

        container.appendChild(customCard);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    loadCommunities();
});
