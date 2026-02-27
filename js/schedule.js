/**==========================================================
 * SCHEDULE SLIDER logic
 ============================================================*/

// 'async' allows the use of 'await' for handling asynchronous operations like fetching data
async function initSchedule() {
  try {
    // 'fetch' sends an HTTP request to the server; 'await' pauses execution until the file is found
    const response = await fetch('data/schedule-data.json');
    
    // Parses the raw response into a usable JavaScript Object (or Array)
    const data = await response.json();
    
    // Selects the HTML elements where we will inject our dynamic content
    const slider = document.getElementById('scheduleSlider'); //scheduleSlider: Container for your "Tabs" (the buttons labeled DOM 22, LUN 23, MAR 24, etc.).
    const selector = document.getElementById('daySelector'); // A long horizontal row of slides (days) that moves back and forth.
    
    // Extracts the keys (e.g., "DOM 22", "LUN 23") from the JSON object into an array
    const days = Object.keys(data);

    // Iterates through each day string in the array; 'index' tracks the position (0, 1, 2...)
    days.forEach((day, index) => {
      
      /** 1. Create Navigation Tab (the buttons labeled DOM 22, LUN 23, MAR 24, etc.).
            <div class="day-tab active">DOM 22</div>
            <div class="day-tab ">LUN 23</div>
            <div class="day-tab ">MAR 24</div>
      */
      
      // Creates a new <div> element in memory
      const tab = document.createElement('div');
      
      // Syntax: Template literals (` `) allow embedding variables/logic inside plain text. 
      //One-line version of an if-else statement: (condition ? ifTrue : ifFalse)
      // Placeholder ${} becomes: condition: if index == 0: tab.className = 'active', else: tab.className = ''
      // This adds the 'active' class only to the first tab (index 0)
      // 'active' tab is the currently highlighted tab, i.e. day of interest
      // yields tab.className = 'day-tab active' or 'day-tab'
      //In CSS, when you want an element to have two classes, you separate them with a space (e.g., <div class="class1 class2">).
      tab.className = `day-tab ${index === 0 ? 'active' : ''}`;
      
      // Sets the text inside the tab to the name of the day
      tab.innerHTML = `<span>${day}</span>`;
      
      // Defines what happens when the user clicks the tab (i.e on MAR 24)
      tab.onclick = () => {
        // Syntax: scrollTo moves the scrollbar. 
        // We multiply the width of the slider by the day's index to slide to the correct "page"
        slider.scrollTo({ left: slider.offsetWidth * index, behavior: 'smooth' });
        
        // Calls the helper function below to update the visual "active" state of tabs
        updateActiveTab(index);
      };
      
      // Injects the newly created tab into the navigation bar in the HTML
      //selector: This is the variable you created earlier that "points" to the <div id="daySelector"> in your HTML.

      //tab: This is the specific "day button" (like "DOM 22") that you just finished building in the lines above.
      //.appendChild(): built-in JavaScript method. It takes an element and sticks it inside another one. This, sticking tab insie the selector (daySelector in HTML) element
      //selector.appendChild(tab) is the command that physically attaches that element to your website's structure.
      selector.appendChild(tab);

      /** 2. Create day-environment, listing the classes
            <div class="day-environment">
                <div class = "schedule-row">
                
       */

      // Creates a container that acts as a full-width "slide" for this specific day
      const dayEnv = document.createElement('div');
      dayEnv.className = 'day-environment';
      
      // 3. Populate Rows
      // Nested loop: accesses the array of classes assigned to the current day
      data[day].forEach(item => {
        // Creates a container for a single class row
        const row = document.createElement('div');

        row.className = 'schedule-row';
        const isFull = item.status === 'red'; // Class status
        
        // Injects a complex block of HTML using data from the JSON (item.name, item.time, etc.)
        // If isFull is true, it adds the btn-disabled class. If false, it adds nothing ('')
        // Adds native HTML attribute 'disabled' is isFull condition true
         // Defines button name 'Completo' is isFull true
        // <tagname attribute="value" booleanAttribute> Content </tagname>
        row.innerHTML = `
            <div class="class-info">
             <h3>${item.name}</h3> 
             <p>${item.bTime} - ${item.eTime}</p>
             <p>${item.instructor}</p>
            </div>
            <div class="class-actions">
                <span class="status-dot ${item.status}"></span>
                <button
                  class="btn-reserve"
                  ${isFull ? 'disabled' : ''}>
                  ${isFull ? 'Completo' : 'Reservar'}
                </button>
            </div>
        `;
        // Adds the finished row into the day container
        dayEnv.appendChild(row);
      });
      
      // Adds the entire day's worth of classes into the horizontal slider
      slider.appendChild(dayEnv);
    });

    // Sync tabs on manual scroll
    // Listens for when the user swipes or scrolls the slider manually (not via button)
    slider.addEventListener('scroll', () => {
      // Calculates which "page" the user is on by dividing scroll position by element width
      const index = Math.round(slider.scrollLeft / slider.offsetWidth);
      // Updates the top tabs to match the current scroll position
      updateActiveTab(index);
    }); 

  } catch (error) {
    console.error("Error loading the schedule:", error);
  }
}

/**
Helper function to manage the "underlined/bold" look of the current day
*/
// querySelectorAll is a method that searches the entire HTML document for every element that has the CSS class .day-tab.
// forEach is a loop that visits every single tab in that list.
// t: Represents the current tab element the loop is touching., i: Represents the index number (0, 1, 2...) of that tab.
// classList: A property that lets you add or remove CSS classes from an element.
// .toggle('className', condition):
// The first part is the class we want to change ('active').
// The second part is a boolean condition (i === index).

function updateActiveTab(index) {
  // Selects all tabs created earlier
  const tabs = document.querySelectorAll('.day-tab');
  // 'toggle' adds the class if (i === index) is true, and removes it if false
  tabs.forEach((t, i) => t.classList.toggle('active', i === index));
}

// Triggers the entire process once the script loads
initSchedule();
