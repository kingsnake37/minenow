document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('fafa-bars');
  const navLinks = document.getElementById('nav-links');
  const dropdowns = document.querySelectorAll('.dropdown');

  // Toggle mobile menu
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('open');

    // Toggle between fa-bars and fa-x with smooth transition
    if (hamburger.classList.contains('open')) {
      hamburger.classList.remove('fa-bars');
      hamburger.classList.add('fa-x');
    } else {
      hamburger.classList.remove('fa-x');
      hamburger.classList.add('fa-bars');
    }
  });

  // Mobile dropdown toggling
  dropdowns.forEach(dropdown => {
    const link = dropdown.querySelector('.dropdown-link');
    const menu = dropdown.querySelector('.dropdown-menu');

    link.addEventListener('click', (e) => {
      e.preventDefault();

      // Close other dropdowns
      dropdowns.forEach(d => {
        if (d !== dropdown) {
          d.classList.remove('open');
        }
      });

      // Toggle the current dropdown
      dropdown.classList.toggle('open');
    });
  });

  // Reset dropdown states on resize
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      dropdowns.forEach(dropdown => dropdown.classList.remove('open'));
    }
  });
});


// Function to handle the visibility of the logos based on screen size
function toggleLogoVisibility() {
  // Get the full logo and small logo image elements
  const fullLogo = document.querySelector('.logofull');
  const smallLogo = document.querySelector('.logo img'); // Ensure this selects the image inside .logo

  // Check if the screen width is less than or equal to 768px
  if (window.innerWidth <= 768) {
    fullLogo.style.display = 'block';  // Show the full logo
    smallLogo.style.display = 'none';  // Hide the small logo
  } else {
    fullLogo.style.display = 'none';  // Hide the full logo
    smallLogo.style.display = 'block';  // Show the small logo
  }
}

// Run the function on page load to set the initial visibility
toggleLogoVisibility();

// Add an event listener to check for window resize and adjust visibility
window.addEventListener('resize', toggleLogoVisibility);

