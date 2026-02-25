/**==========================================================
 * SCHEDULE SLIDER
 ============================================================*/


async function initSchedule() {
  try {
    const response = await fetch('data/schedule-data.json');
    const data = await response.json();
    
    const slider = document.getElementById('scheduleSlider');
    const selector = document.getElementById('daySelector');
    
    const days = Object.keys(data);

    days.forEach((day, index) => {
      // 1. Create Navigation Tab
      const tab = document.createElement('div');
      tab.className = `day-tab ${index === 0 ? 'active' : ''}`;
      tab.innerHTML = `<span>${day}</span>`;
      tab.onclick = () => {
        slider.scrollTo({ left: slider.offsetWidth * index, behavior: 'smooth' });
        updateActiveTab(index);
      };
      selector.appendChild(tab);

      // 2. Create Day Environment
      const dayEnv = document.createElement('div');
      dayEnv.className = 'day-environment';
      
      // 3. Populate Rows
      data[day].forEach(item => {
        const row = document.createElement('div');
        row.className = `schedule-row ${item.passed ? 'passed-event' : ''}`;
        
        row.innerHTML = `
          <div class="class-info">
            <div class="text-group">
              <h3>${item.name} <span class="duration">${item.time} - ${item.duration}</span></h3>
              <p class="instructor">${item.instructor}</p>
            </div>
          </div>
          <div class="class-actions">
            <span class="status-dot ${item.status}"></span>
            <button class="btn-reserve ${item.passed ? 'btn-passed' : ''}">
              ${item.passed ? 'Evento pasado' : 'Reservar'}
            </button>
          </div>
        `;
        dayEnv.appendChild(row);
      });
      
      slider.appendChild(dayEnv);
    });

    // Sync tabs on manual scroll
    slider.addEventListener('scroll', () => {
      const index = Math.round(slider.scrollLeft / slider.offsetWidth);
      updateActiveTab(index);
    });

  } catch (error) {
    console.error("Error loading the schedule:", error);
  }
}

function updateActiveTab(index) {
  const tabs = document.querySelectorAll('.day-tab');
  tabs.forEach((t, i) => t.classList.toggle('active', i === index));
}

initSchedule();
