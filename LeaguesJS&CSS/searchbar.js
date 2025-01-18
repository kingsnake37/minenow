document.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.getElementById('searchBar');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const cards = Array.from(document.querySelectorAll('.card'));
    const cardContainer = cards[0]?.parentElement;

    if (!searchBar || !filterButtons.length || !cards.length || !cardContainer) {
        console.error("Required elements not found!");
        return;
    }

    // Updated lazy loading function to handle both data-src and loading="lazy"
    function lazyLoadImages() {
        const lazyImages = document.querySelectorAll('img[data-src][loading="lazy"]');
        console.log('Found lazy images:', lazyImages.length);

        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            console.log('Loading image:', img.dataset.src);
                            img.src = img.dataset.src;
                            img.removeAttribute('loading'); // Remove lazy loading attribute
                            observer.unobserve(img);
                        }
                    }
                });
            }, {
                root: null,
                rootMargin: '50px 0px',
                threshold: 0
            });

            lazyImages.forEach(img => {
                // Ensure image isn't already loaded
                if (!img.src || img.src !== img.dataset.src) {
                    imageObserver.observe(img);
                }
            });
        } else {
            // Fallback for browsers without IntersectionObserver
            lazyImages.forEach(img => {
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('loading');
                }
            });
        }
    }

    function shuffleCards() {
        const firstCard = cards.find(card => card.dataset.class && card.dataset.class.includes('first'));
        const otherCards = cards.filter(card => !card.dataset.class || !card.dataset.class.includes('first'));
        
        for (let i = otherCards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [otherCards[i], otherCards[j]] = [otherCards[j], otherCards[i]];
        }

        cardContainer.innerHTML = '';
        
        if (firstCard) {
            cardContainer.appendChild(firstCard);
        }
        
        otherCards.forEach(card => cardContainer.appendChild(card));

        // Reinitialize lazy loading after shuffling
        setTimeout(lazyLoadImages, 100); // Small delay to ensure DOM is updated
    }

    function filterAndSearch() {
        const searchTerm = searchBar.value.toLowerCase();
        const activeFilter = document.querySelector('.filter-btn.active')?.dataset.filter || 'all';

        cards.forEach(card => {
            const title = card.querySelector('.card-title')?.textContent.toLowerCase() || '';
            const cardClass = card.dataset.class || '';

            const matchesSearch = title.includes(searchTerm);
            const matchesFilter = activeFilter === 'all' || cardClass.includes(activeFilter);

            card.style.display = (matchesSearch && matchesFilter) ? 'block' : 'none';
        });

        // Reinitialize lazy loading after filtering
        setTimeout(lazyLoadImages, 100);
    }

    // Event Listeners
    searchBar.addEventListener('input', filterAndSearch);

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            filterAndSearch();
        });
    });

    // Initialize
    shuffleCards();
    filterAndSearch();

    // Handle URL fragment
    const urlFragment = window.location.hash;
    if (urlFragment) {
        const searchTerm = decodeURIComponent(urlFragment.substring(1));
        searchBar.value = searchTerm;
        filterAndSearch();
    }

    // Initial lazy load
    lazyLoadImages();

    // Add window load event to catch any missed images
    window.addEventListener('load', () => {
        lazyLoadImages();
    });

    // Handle dynamic layout changes
    if ('ResizeObserver' in window) {
        const resizeObserver = new ResizeObserver(entries => {
            lazyLoadImages();
        });
        resizeObserver.observe(cardContainer);
    }
});