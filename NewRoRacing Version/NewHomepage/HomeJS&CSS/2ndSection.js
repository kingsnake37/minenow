function scrollToSection2() {
    document.getElementById('section2').scrollIntoView({
        behavior: 'smooth'
    });
}

function toggleAccordion(clickedHeader) {
  // Get the parent accordion item
  const clickedItem = clickedHeader.parentElement;

  // Get the content and icon of the clicked item
  const content = clickedItem.querySelector('.accordion-content');
  const icon = clickedItem.querySelector('.toggle-icon');

  // If there's no content element or icon, do nothing
  if (!content || !icon) return;

  // Get all accordion items
  const allItems = document.querySelectorAll('.accordion-item');
  
  // Loop through all items to close them if they are not clicked
  allItems.forEach((item) => {
    const itemContent = item.querySelector('.accordion-content');
    const itemIcon = item.querySelector('.toggle-icon');
    
    // If the current item is not clicked, close it
    if (item !== clickedItem) {
      if (itemContent) {
        itemContent.style.maxHeight = null;  // Collapse content
        itemContent.classList.remove('open');
      }
      if (itemIcon) {
        itemIcon.style.transform = 'rotate(0deg)';  // Reset icon
      }
    }
  });

  // Check if the content is already open
  const isOpen = content.style.maxHeight;

  if (!isOpen) {
    content.style.maxHeight = content.scrollHeight + 'px';  // Expand content
    content.classList.add('open');
    icon.style.transform = 'rotate(180deg)';  // Rotate icon
  } else {
    content.style.maxHeight = null;  // Collapse content
    content.classList.remove('open');
    icon.style.transform = 'rotate(0deg)';  // Reset icon
  }
}
