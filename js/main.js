/**==========================================================
 * HAMBURGER SLIDE-IN MENU FUNCTIONALITY
 ============================================================*/

// Wait for the DOM (Document Object Model HTML <-> JavaScript connection) to be fully loaded
document.addEventListener('DOMContentLoaded', function() {  // Adds event listener that fires when HTML is fully loaded and parsed
  // The callback function will only run after all HTML elements are available in the DOM

  // Get elements with IDs 'menuButton' (Hanburger button), 'slideMenu' (slide-in menu), 'overlay' (dark overlay next to slide-in menu)
  const menuButton = document.getElementById('menuButton');
  const slideMenu = document.getElementById('slideMenu');
  const overlay = document.getElementById('overlay');

  // Check if elements exist (prevents errors if IDs are missing)
  if (!menuButton || !slideMenu || !overlay) {
    console.warn('Menu elements not found - skipping menu initialization'); // Logs warning to browser console for debugging
    return;  // Exits the function early, preventing any further code from running
  }

  // Function to open menu
  function openMenu() {  // Declares a named function that will handle opening the menu
    slideMenu.classList.add('open');     // Adds the 'open' class to slideMenu, triggering CSS to trigger its transition designs
    overlay.classList.add('show');        // Adds the 'show' class to overlay, making the dark overlay visible
    document.body.style.overflow = 'hidden'; // Sets body overflow to hidden, preventing scrolling of background content (HTML-document.body.tag.style.css-file.built-in-oveflow-properts set to 'hidden')
  }

  // Function to close menu
  function closeMenu() {  // Declares a named function that will handle closing the menu
    slideMenu.classList.remove('open');   // Removes 'open' class from slideMenu, triggering CSS to slide it off-screen (defined by ransition: left 0.3s ease in .open class), and fall back to base class .slide-menu properties
    overlay.classList.remove('show');      // Removes 'show' class from overlay, hiding the dark overlay
    document.body.style.overflow = '';     // Restores default scrolling behavior (empties the inline style)
  }

  // Event listeners
  menuButton.addEventListener('click', openMenu);   // When hamburger menu is clicked, calls the openMenu function
  overlay.addEventListener('click', closeMenu);     // When dark overlay is clicked, calls the closeMenu function

  // Close menu with Escape key
  document.addEventListener('keydown', function(e) {  // Listens for any key press on the entire document, and uses the 'event object' e (contains all details about pressed key)
    if (e.key === 'Escape' && slideMenu.classList.contains('open')) {  // Checks if pressed key is Escape AND menu is open
      closeMenu();  // If both conditions are true, calls the closeMenu function
    }
  });

  // Handle window resize - close menu if screen becomes desktop size
  window.addEventListener('resize', function() {  // Listens for window resize events (when user changes screen size)
    if (window.innerWidth > 600 && slideMenu.classList.contains('open')) {  // Checks if screen is now desktop width AND menu is open
      closeMenu();  // If both conditions are true, closes the menu (prevents menu being open on desktop view)
    }
  });

  // Optional: Log that menu initialized successfully
  console.log('Mobile menu initialized');  // Logs success message to browser console for debugging confirmation
});

/**==========================================================
 * FLOATING BANNER FUNCTIONALITY
 ============================================================*/

window.addEventListener('scroll', function() {
  const banner = document.querySelector('.floating-banner'); //Select an element from HTML document by its CSS class
  if (window.scrollY > 300) {       // Triggers after scrolling 300px
    banner.classList.add('visible');
  } else {
    banner.classList.remove('visible');
  }
});

/**==========================================================
 * CENTER TESTIMONIAL, BENEFITS AND PRICING SLIDER
 ============================================================*/

window.addEventListener('load', () => {
  const centerSlider = (sliderSelector, cardSelector) => {
    const slider = document.querySelector(sliderSelector);
    const cards = document.querySelectorAll(cardSelector);

    if (slider && cards.length > 0) {
      const middleIndex = Math.floor(cards.length / 2);
      const targetCard = cards[middleIndex];

      const scrollPosition = 
        targetCard.offsetLeft - 
        (slider.offsetWidth / 2) + 
        (targetCard.offsetWidth / 2);

      slider.scrollLeft = scrollPosition;
    }
  };

  // Centering all your sliders
  centerSlider('.testimonial-slider', '.testimonial-card');
  centerSlider('.benefits-container', '.benefit-item');
  centerSlider('.pricing-slider', '.pricing-card'); // Added for pricing
});
