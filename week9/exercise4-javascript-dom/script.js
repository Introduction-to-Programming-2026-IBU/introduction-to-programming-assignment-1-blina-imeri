/**
 * Exercise 4: JavaScript & the DOM
 * ==================================
 * Complete each task below. Read the README.md for full instructions.
 * Open the browser console (F12) to debug.
 */

// ============================================================
// TASK 1 — Console Warmup
// ============================================================

// TODO 1a: Select the element with id "main-title" and change its text to
//          "DOM Mastery 🚀" using .textContent


// TODO 1b: Select ALL elements with class "card", log how many there are


// TODO 1c: Select the element with id "target-box" and change its
//          background color to any color you like using style.backgroundColor



// ============================================================
// TASK 2 — Click Counter
// ============================================================

// Step 1: Get references to the elements you need
const countDisplay = document.querySelector('#count-display');
// TODO: get references to the three buttons

// Step 2: Track the count
let count = 0;

// Helper: update the display and apply color classes
function updateCountDisplay() {
  // TODO: Set countDisplay.textContent to count
  // TODO: If count is 0, add class 'zero' to countDisplay (and remove 'high')
  // TODO: If count > 5, add class 'high' (and remove 'zero')
  // TODO: Otherwise, remove both classes
}

// TODO: Add click event listener to increment button
// TODO: Add click event listener to decrement button (don't go below 0!)
// TODO: Add click event listener to reset button

// Initialize display
updateCountDisplay();


// ============================================================
// TASK 3 — Dynamic List Builder
// ============================================================

const listInput = document.querySelector('#list-input');
const dynamicList = document.querySelector('#dynamic-list');

// TODO: Add click listener to '#btn-add-item'
// Inside the listener:
//   1. Get the value from listInput
//   2. If it's empty (after .trim()), don't add — shake the input or alert
//   3. Create a new <li> element
//   4. Set its text content (include a × delete button)
//   5. Append the <li> to dynamicList
//   6. Clear listInput.value and focus it

// TODO: Handle delete buttons — you'll need event delegation OR
//       attach a listener each time you create a new item.
//       Hint for event delegation:
//       dynamicList.addEventListener('click', function(event) {
//         if (event.target.classList.contains('delete-btn')) { ... }
//       });

// Wire up delete buttons that already exist in the HTML
dynamicList.addEventListener('click', function(event) {
  // TODO: if the clicked element has class 'delete-btn', remove its parent <li>
});


// ============================================================
// TASK 4 — Show / Hide Toggle
// ============================================================

const toggleBtn = document.querySelector('#btn-toggle');
const detailsDiv = document.querySelector('.details');

// TODO: Add click listener to toggleBtn
// Inside:
//   - Toggle the 'hidden' class on detailsDiv
//   - Change button text: "Show Details" ↔ "Hide Details"


// ============================================================
// TASK 5 — Color Mixer
// ============================================================

const sliderR = document.querySelector('#slider-r');
const sliderG = document.querySelector('#slider-g');
const sliderB = document.querySelector('#slider-b');
const colorPreview = document.querySelector('#color-preview');
const hexDisplay = document.querySelector('#hex-display');

function updateColor() {
  const r = parseInt(sliderR.value);
  const g = parseInt(sliderG.value);
  const b = parseInt(sliderB.value);

  // TODO: Update the text of #val-r, #val-g, #val-b spans

  // TODO: Set colorPreview's background to rgb(r, g, b)

  // TODO: Convert each value to a 2-digit hex string and update #hex-display
  // Hint: const hex = value.toString(16).padStart(2, '0');
}

// TODO: Add 'input' event listeners to all three sliders that call updateColor()

// Initialize
updateColor();
