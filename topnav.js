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
    if (window.innerWidth > 968) {
      dropdowns.forEach(dropdown => dropdown.classList.remove('open'));
    }
  });
});
