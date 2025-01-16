document.addEventListener("DOMContentLoaded", () => {
    const words = [
        { text: "Content.", link: "https://example.com/content" },
        { text: "Assets.", link: "https://example.com/assets" },
        { text: "Leagues.", link: "https://example.com/leagues" },
        { text: "Way.", link: "https://example.com/h" }
    ];
    let currentIndex = 0;

    const wordElement = document.getElementById("word");
    const wordLink = document.getElementById("word-link");

    function changeWord() {
        // Start the hide animation
        wordElement.classList.remove("show");
        wordElement.classList.add("hide");

        // Wait for the transition to finish before updating the word
        setTimeout(() => {
            // Update the word and its link
            currentIndex = (currentIndex + 1) % words.length;
            const newWord = words[currentIndex];

            wordElement.textContent = newWord.text;
            wordLink.href = newWord.link;

            // Remove the hide class (word is ready)
            wordElement.classList.remove("hide");

            // Short delay before showing the new word with animation
            setTimeout(() => {
                wordElement.classList.add("show");
            }, 20); // Small delay to allow CSS to apply changes

        }, 500); // Match the duration of the CSS transition for hide
    }

    // Initialize with the first word
    wordElement.classList.add("show");
    wordLink.href = words[currentIndex].link;

    // Change the word every 3 seconds
    setInterval(changeWord, 3000);
});