const calendarGrid = document.getElementById('calendarGrid');
const monthNameEl = document.getElementById('monthName');
const habitTitle = document.getElementById('habit-title');

// 1. Fetch current date info
const currentDate = new Date();
const currentMonthIndex = currentDate.getMonth();
const currentYear = currentDate.getFullYear();

const months = [
    "January 🌸", "February 🍫", "March 🧸", "April 🎀", 
    "May 🍃", "June 🍰", "July 🍦", "August ☀️", 
    "September 🍁", "October 🎃", "November 🌟", "December ❄️"
];

// Display current month name
document.getElementById('month-name').innerText = months[currentMonthIndex];

// Calculate total days in the current month
const totalDays = new Date(currentYear, currentMonthIndex + 1, 0).getDate();

// 2. Load custom habit name if saved previously
if (localStorage.getItem('savedHabitName')) {
    habitTitle.innerText = localStorage.getItem('savedHabitName');
}

// Function to let users edit the habit title
function changeHabitName() {
    const newName = prompt("What habit would you like to track? ✨", habitTitle.innerText);
    if (newName) {
        habitTitle.innerText = `✨ ${newName} ✨`;
        localStorage.setItem('savedHabitName', `✨ ${newName} ✨`);
    }
}

// 3. Generate the days inside the grid loop
for (let day = 1; day <= totalDays; day++) {
    const button = document.createElement('button');
    button.classList.add('day-btn');
    button.innerText = day;
    
    // Create a unique key for local storage (e.g., "habit-2026-7-24")
    const storageKey = `habit-${currentYear}-${currentMonthIndex}-${day}`;
    
    // Check if day was previously marked completed
    if (localStorage.getItem(storageKey) === 'true') {
        button.classList.add('completed');
    }
    
    // Toggle completion state on click
    button.addEventListener('click', () => {
        button.classList.toggle('completed');
        
        if (button.classList.contains('completed')) {
            localStorage.setItem(storageKey, 'true');
        } else {
            localStorage.removeItem(storageKey);
        }
    });
    
    calendarGrid.appendChild(button);
}
