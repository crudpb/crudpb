let allCommunities = [];
const listaPrincipal = document.getElementById('listaPrincipal');

// Load communities data
async function loadCommunities() {
    try {
        const response = await fetch('./data/communities.json?v=202511201300');
        const data = await response.json();
        allCommunities = data.communities;
        renderCommunities(allCommunities);
    } catch (error) {
        console.error('Error loading communities:', error);
    }
}

function renderCommunities(communities) {
    listaPrincipal.innerHTML = ''; // Clear current list
    communities.forEach(community => {
        newRendering(community, listaPrincipal);
    });
}

function filterCommunities() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.toLowerCase().trim();

    if (searchTerm.length < 1) {
        renderCommunities(allCommunities);
        return;
    }

    const filtered = allCommunities.filter(community => {
        const nameMatch = community.name.toLowerCase().includes(searchTerm);
        const keywordsMatch = community.keywords && community.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm));
        return nameMatch || keywordsMatch;
    });

    renderCommunities(filtered);
}

function newRendering(community, container) {
    const customCard = document.createElement('div');
    const cardImageWrapper = document.createElement('div');
    const cardLink = document.createElement('a');
    const cardImage = document.createElement('img');
    const cardText = document.createElement('div');
    const cardTextFull = document.createElement('div');
    const cardDescriptionWrapper = document.createElement('div');
    const tooltip = document.createElement('div');

    customCard.className = 'custom-card';
    cardImageWrapper.className = 'card-image-wrapper';
    cardDescriptionWrapper.className = 'card-description-wrapper';


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

    cardImageWrapper.appendChild(cardImage);

    customCard.appendChild(cardText);
    cardDescriptionWrapper.appendChild(cardTextFull);
    customCard.appendChild(cardDescriptionWrapper);
    customCard.appendChild(tooltip);

    // --- Social Icons ---
    const socialIconsContainer = document.createElement('div');
    socialIconsContainer.className = 'card-social-icons';

    let hasSocialLinks = false;

    // WhatsApp Icon
    if (community.whatsapp) {
        const socialLink = document.createElement('a');
        socialLink.href = community.whatsapp;
        socialLink.target = '_blank';
        socialLink.innerHTML = '<i class="fa fa-whatsapp whatsapp-icon"></i>';
        socialIconsContainer.appendChild(socialLink);
        hasSocialLinks = true;
    }

    // Instagram Icon
    if (community.instagram) {
        const socialLink = document.createElement('a');
        socialLink.href = community.instagram;
        socialLink.target = '_blank';
        socialLink.innerHTML = '<i class="fa fa-instagram instagram-icon"></i>';
        socialIconsContainer.appendChild(socialLink);
        hasSocialLinks = true;
    }

    // Website Icon
    if (community.website) {
        const socialLink = document.createElement('a');
        socialLink.href = community.website;
        socialLink.target = '_blank';
        socialLink.innerHTML = '<i class="fa fa-globe website-icon"></i>';
        socialIconsContainer.appendChild(socialLink);
        hasSocialLinks = true;
    }

    // LinkedIn Icon
    if (community.linkedin) {
        const socialLink = document.createElement('a');
        socialLink.href = community.linkedin;
        socialLink.target = '_blank';
        socialLink.innerHTML = '<i class="fa fa-linkedin linkedin-icon"></i>';
        socialIconsContainer.appendChild(socialLink);
        hasSocialLinks = true;
    }

    // YouTube Icon
    if (community.youtube) {
        const socialLink = document.createElement('a');
        socialLink.href = community.youtube;
        socialLink.target = '_blank';
        socialLink.innerHTML = '<i class="fa fa-youtube youtube-icon"></i>';
        socialIconsContainer.appendChild(socialLink);
        hasSocialLinks = true;
    }

    // GitHub Icon
    if (community.github) {
        const socialLink = document.createElement('a');
        socialLink.href = community.github;
        socialLink.target = '_blank';
        socialLink.innerHTML = '<i class="fa fa-github github-icon"></i>';
        socialIconsContainer.appendChild(socialLink);
        hasSocialLinks = true;
    }

    if (hasSocialLinks) {
        customCard.appendChild(socialIconsContainer);
    }

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

    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', filterCommunities);
    }
});
