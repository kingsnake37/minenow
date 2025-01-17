document.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.getElementById('searchBar');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const cardContainer = document.querySelector('body'); // Parent element containing the cards
    const cards = Array.from(document.querySelectorAll('.card'));

    if (!searchBar || filterButtons.length === 0 || cards.length === 0) {
        console.error("Required elements not found in the DOM!");
        return;
    }

    // Function to shuffle the cards
    function shuffleCards() {
        // Separate the specific card from the others
        const specificCard = cards.find(card => card.dataset.class === "Single-Seater first");
        const otherCards = cards.filter(card => card !== specificCard);

        // Shuffle the other cards using Fisher-Yates algorithm
        for (let i = otherCards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [otherCards[i], otherCards[j]] = [otherCards[j], otherCards[i]];
        }

        // Append the specific card first, followed by shuffled cards
        const container = cardContainer.querySelector('.card').parentElement;
        if (specificCard) container.appendChild(specificCard); // Append the specific card first
        otherCards.forEach(card => container.appendChild(card)); // Append the remaining shuffled cards
    }

    // Lazy load images
    const lazyLoadImages = () => {
        const images = document.querySelectorAll('img[loading="lazy"]');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src; // Assign the actual image source
                    observer.unobserve(img); // Stop observing once loaded
                }
            });
        });

        images.forEach(img => observer.observe(img));
    };

    // Initialize filtering and lazy loading
    function filterAndSearch() {
        const searchTerm = searchBar.value.toLowerCase();
        const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;

        cards.forEach(card => {
            const title = card.querySelector('.card-title').textContent.toLowerCase();
            const cardClass = card.dataset.class;

            const matchesSearch = title.includes(searchTerm);
            const matchesFilter = activeFilter === 'all' || cardClass.includes(activeFilter);

            if (matchesSearch && matchesFilter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    searchBar.addEventListener('input', filterAndSearch);

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            filterAndSearch();
        });
    });

    // Initialize shuffle and lazy load
    shuffleCards(); // Shuffle the cards
    lazyLoadImages(); // Lazy load images
    filterAndSearch(); // Apply filter and search functionality
});
