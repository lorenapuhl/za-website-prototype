/**
 * menu.js - Handles the mobile slide menu functionality
 * for Blackstudio website
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {  // Adds event listener that fires when HTML is fully loaded and parsed
  // The callback function will only run after all HTML elements are available in the DOM
  
  // Get elements
  const menuButton = document.getElementById('menuButton');  // Finds and stores the hamburger menu button element with ID 'menuButton'
  const slideMenu = document.getElementById('slideMenu');    // Finds and stores the slide-out menu element with ID 'slideMenu'
  const closeButton = document.getElementById('closeButton'); // Finds and stores the close button (X) element with ID 'closeButton'
  const overlay = document.getElementById('overlay');        // Finds and stores the dark overlay element with ID 'overlay'

  // Check if elements exist (prevents errors if IDs are missing)
  if (!menuButton || !slideMenu || !closeButton || !overlay) {  // Checks if ANY of the elements weren't found (returns null)
    console.warn('Menu elements not found - skipping menu initialization'); // Logs warning to browser console for debugging
    return;  // Exits the function early, preventing any further code from running
  }

  // Function to open menu
  function openMenu() {  // Declares a named function that will handle opening the menu
    slideMenu.classList.add('open');     // Adds the 'open' class to slideMenu, triggering CSS to slide it into view
    overlay.classList.add('show');        // Adds the 'show' class to overlay, making the dark overlay visible
    menuButton.classList.add('open');     // Adds the 'open' class to menuButton (for animating hamburger to X if desired)
    document.body.style.overflow = 'hidden'; // Sets body overflow to hidden, preventing scrolling of background content
  }

  // Function to close menu
  function closeMenu() {  // Declares a named function that will handle closing the menu
    slideMenu.classList.remove('open');   // Removes 'open' class from slideMenu, triggering CSS to slide it off-screen
    overlay.classList.remove('show');      // Removes 'show' class from overlay, hiding the dark overlay
    menuButton.classList.remove('open');   // Removes 'open' class from menuButton (restoring hamburger icon)
    document.body.style.overflow = '';     // Restores default scrolling behavior (empties the inline style)
  }

  // Event listeners
  menuButton.addEventListener('click', openMenu);   // When hamburger menu is clicked, calls the openMenu function
  closeButton.addEventListener('click', closeMenu); // When close button (X) is clicked, calls the closeMenu function
  overlay.addEventListener('click', closeMenu);     // When dark overlay is clicked, calls the closeMenu function

  // Close menu with Escape key
  document.addEventListener('keydown', function(e) {  // Listens for any key press on the entire document
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
