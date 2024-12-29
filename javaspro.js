// script.js

// Select elements from the DOM
const goalForm = document.getElementById("goal-form");
const goalInput = document.getElementById("goal-input");
const datePicker = document.getElementById("date-picker");
const countdownDisplay = document.getElementById("countdown-display");
const goalDisplay = document.getElementById("goal-display");
const countdown = document.getElementById("countdown");

// Load saved goal and date on page load
document.addEventListener("DOMContentLoaded", () => {
  const savedGoal = localStorage.getItem("goal");
  const savedDate = localStorage.getItem("targetDate");

  if (savedGoal && savedDate) {
    const targetDate = new Date(savedDate);
    const today = new Date();

    // Check if the saved date is still in the future
    if (targetDate > today) {
      goalDisplay.textContent = savedGoal;
      countdownDisplay.classList.remove("hidden");
      updateCountdown(targetDate);
      setInterval(() => updateCountdown(targetDate), 1000);
    } else {
      // Clear expired data from localStorage
      localStorage.removeItem("goal");
      localStorage.removeItem("targetDate");
    }
  }
});

// Event listener for form submission
goalForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent page reload
  
  const goal = goalInput.value;
  const targetDate = new Date(datePicker.value);
  const today = new Date();

  // Validate date
  if (targetDate <= today) {
    alert("Please select a future date!");
    return;
  }

  // Save goal and date in localStorage
  localStorage.setItem("goal", goal);
  localStorage.setItem("targetDate", targetDate.toISOString());

  // Display the goal and start the countdown
  goalDisplay.textContent = goal;
  countdownDisplay.classList.remove("hidden");

  updateCountdown(targetDate); // Update countdown immediately
  setInterval(() => updateCountdown(targetDate), 1000); // Update every second
});

// Function to update the countdown dynamically
function updateCountdown(targetDate) {
  const now = new Date();
  const timeDiff = targetDate - now;

  if (timeDiff <= 0) {
    countdown.textContent = "Time's up!";
    return;
  }

  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

  countdown.textContent = `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
}
