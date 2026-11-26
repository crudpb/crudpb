let allCommunities = [];
const listaPrincipal = document.getElementById('listaPrincipal');

const ICONS = {
    whatsapp: '<svg class="icon whatsapp-icon" viewBox="0 0 448 512" aria-hidden="true"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg>',
    instagram: '<svg class="icon instagram-icon" viewBox="0 0 448 512" aria-hidden="true"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/></svg>',
    website: '<svg class="icon website-icon" viewBox="0 0 512 512" aria-hidden="true"><path d="M352 256c0 22.2-1.2 43.6-3.3 64H163.3c-2.2-20.4-3.3-41.8-3.3-64s1.2-43.6 3.3-64h185.4c2.2 20.4 3.3 41.8 3.3 64zm28.8-64h123.1c5.3 20.5 8.1 41.9 8.1 64s-2.8 43.5-8.1 64H380.8c2.1-20.6 3.2-42 3.2-64s-1.1-43.4-3.2-64zm112.6-32H376.7c-10-63.9-29.8-117.4-55.3-151.6 78.3 20.7 142 77.5 171.9 151.6zm-149.1 0H167.7c6.1-36.4 15.5-68.6 27-94.7 10.5-23.6 22.2-40.7 33.5-51.5C239.4 3.2 248.7 0 256 0s16.6 3.2 27.8 13.8c11.3 10.8 23 27.9 33.5 51.5 11.6 26 20.9 58.2 27 94.7zm-209 0H18.6C48.6 85.9 112.2 29.1 190.6 8.4 165.1 42.6 145.3 96.1 135.3 160zM8.1 192h123.1c-2.1 20.6-3.2 42-3.2 64s1.1 43.4 3.2 64H8.1C2.8 299.5 0 278.1 0 256s2.8-43.5 8.1-64zm186.6 254.6c-11.6-26-20.9-58.2-27-94.6h176.6c-6.1 36.4-15.5 68.6-27 94.6-10.5 23.6-22.2 40.7-33.5 51.5-11.2 10.7-20.5 13.9-27.8 13.9s-16.6-3.2-27.8-13.8c-11.3-10.8-23-27.9-33.5-51.5zM135.3 352c10 63.9 29.8 117.4 55.3 151.6-78.4-20.7-142-77.5-172-151.6h116.7zm358.1 0c-30 74.1-93.6 130.9-171.9 151.6 25.5-34.2 45.2-87.7 55.3-151.6h116.6z"/></svg>',
    linkedin: '<svg class="icon linkedin-icon" viewBox="0 0 448 512" aria-hidden="true"><path d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z"/></svg>',
    youtube: '<svg class="icon youtube-icon" viewBox="0 0 576 512" aria-hidden="true"><path d="M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6-11.4 42.9-11.4 132.3-11.4 132.3s0 89.4 11.4 132.3c6.3 23.7 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zm-317.5 213.5V175.2l142.7 81.2-142.7 81.2z"/></svg>',
    github: '<svg class="icon github-icon" viewBox="0 0 496 512" aria-hidden="true"><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8z"/></svg>'
};

const SOCIAL_CHANNELS = [
    { key: 'whatsapp', label: 'WhatsApp' },
    { key: 'instagram', label: 'Instagram' },
    { key: 'website', label: 'Website' },
    { key: 'linkedin', label: 'LinkedIn' },
    { key: 'youtube', label: 'YouTube' },
    { key: 'github', label: 'GitHub' }
];

// Load communities data
async function loadCommunities() {
    if (!listaPrincipal) return;
    try {
        const response = await fetch('./data/communities.json?v=202611261541');
        const data = await response.json();
        allCommunities = data.communities;
        renderCommunities(allCommunities);
    } catch (error) {
        console.error('Error loading communities:', error);
    }
}

function renderCommunities(communities) {
    if (!listaPrincipal) return;
    const fragment = document.createDocumentFragment();
    communities.forEach(community => {
        newRendering(community, fragment);
    });
    listaPrincipal.replaceChildren(fragment);
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
    cardImage.width = 100;
    cardImage.height = 100;
    cardImage.loading = 'lazy';
    cardImage.decoding = 'async';

    // First text: ellipsis, no wrap
    cardText.className = 'card-text';
    cardText.textContent = community.name;

    // Second text: ellipsis, no wrap
    cardTextFull.className = 'card-text-full';
    cardTextFull.textContent = community.description || '';

    // Tooltip for long description
    tooltip.className = 'custom-card-tooltip';
    tooltip.textContent = community.longDescription || '';

    cardImageWrapper.appendChild(cardImage);
    customCard.appendChild(cardImageWrapper);
    customCard.appendChild(cardText);
    cardDescriptionWrapper.appendChild(cardTextFull);
    customCard.appendChild(cardDescriptionWrapper);
    customCard.appendChild(tooltip);

    // --- Social Icons ---
    const socialIconsContainer = document.createElement('div');
    socialIconsContainer.className = 'card-social-icons';

    let hasSocialLinks = false;
    for (const channel of SOCIAL_CHANNELS) {
        if (community[channel.key]) {
            const socialLink = document.createElement('a');
            socialLink.href = community[channel.key];
            socialLink.target = '_blank';
            socialLink.rel = 'noopener noreferrer';
            socialLink.setAttribute('aria-label', `${channel.label} - ${community.name}`);
            socialLink.innerHTML = ICONS[channel.key];
            socialIconsContainer.appendChild(socialLink);
            hasSocialLinks = true;
        }
    }

    if (hasSocialLinks) {
        customCard.appendChild(socialIconsContainer);
    }

    // --- Tooltip positioning logic ---
    if (tooltip.textContent.trim() !== '') {
        cardImageWrapper.addEventListener('mousemove', function (e) {
            if (!customCard.classList.contains('show-tooltip')) return;

            const cardRect = customCard.getBoundingClientRect();
            const tooltipRect = tooltip.getBoundingClientRect();

            const offsetX = 15;
            const offsetY = 15;
            let x = e.clientX - cardRect.left + offsetX;
            let y = e.clientY - cardRect.top + offsetY;

            if (x + tooltipRect.width > cardRect.width) {
                x = cardRect.width - tooltipRect.width - 10;
            }
            if (y + tooltipRect.height > cardRect.height) {
                y = cardRect.height - tooltipRect.height - 10;
            }
            if (x < 10) x = 10;
            if (y < 10) y = 10;

            tooltip.style.left = x + 'px';
            tooltip.style.top = y + 'px';
        });

        cardImageWrapper.addEventListener('mouseenter', function () {
            customCard.classList.add('show-tooltip');
        });

        cardImageWrapper.addEventListener('mouseleave', function () {
            customCard.classList.remove('show-tooltip');
            tooltip.style.left = '0px';
            tooltip.style.top = '0px';
        });

        // Touch support for tooltip (long press on image)
        let touchTimer = null;
        cardImageWrapper.addEventListener('touchstart', function (e) {
            if (e.touches.length > 0) {
                const touch = e.touches[0];
                touchTimer = setTimeout(() => {
                    customCard.classList.add('show-tooltip');

                    const cardRect = customCard.getBoundingClientRect();
                    const tooltipRect = tooltip.getBoundingClientRect();

                    let x = touch.clientX - cardRect.left + 15;
                    let y = touch.clientY - cardRect.top + 15;

                    if (x + tooltipRect.width > cardRect.width) {
                        x = cardRect.width - tooltipRect.width - 10;
                    }
                    if (y + tooltipRect.height > cardRect.height) {
                        y = cardRect.height - tooltipRect.height - 10;
                    }
                    if (x < 10) x = 10;
                    if (y < 10) y = 10;

                    tooltip.style.left = x + 'px';
                    tooltip.style.top = y + 'px';
                }, 500);
            }
        }, { passive: true });

        cardImageWrapper.addEventListener('touchend', function () {
            clearTimeout(touchTimer);
            setTimeout(() => {
                customCard.classList.remove('show-tooltip');
                tooltip.style.left = '0px';
                tooltip.style.top = '0px';
            }, 1200);
        }, { passive: true });

        cardImageWrapper.addEventListener('touchmove', function () {
            clearTimeout(touchTimer);
        }, { passive: true });
    }

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
