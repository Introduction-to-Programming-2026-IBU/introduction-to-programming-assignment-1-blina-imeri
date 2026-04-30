/**
 * Exercise 5: Forms & Validation
 * ================================
 * Add real-time validation and submit handling.
 * Read README.md for full instructions.
 */

const form = document.querySelector('#registration-form');

// ============================================================
// HELPER: Show or clear an error on a field
// ============================================================
function showError(inputId, message) {
  // TODO: Add class 'invalid' to the input element
  // TODO: Set the text of the corresponding error-msg span to `message`
}

function clearError(inputId) {
  // TODO: Remove class 'invalid', add class 'valid' to the input
  // TODO: Clear the error-msg span text
}


// ============================================================
// TASK 2: Individual Field Validators
// (Return true if valid, false if invalid)
// ============================================================

function validateName() {
  // TODO: Get #full-name value
  // If < 2 chars: showError, return false
  // Else: clearError, return true
}

function validateEmail() {
  // TODO: Get #email value
  // Use regex /^[^\s@]+@[^\s@]+\.[^\s@]+$/ to test
  // showError or clearError appropriately
}

function validatePassword() {
  // TODO: Get #password value
  // Must be 8+ chars AND contain at least one digit
  // Update #password-strength indicator (Task 4)
}

function validateConfirmPassword() {
  // TODO: Get #password and #confirm-password values
  // They must match
}

function validateAge() {
  // TODO: Get #age value (convert to Number)
  // Must be 18–120
}

function validateCountry() {
  // TODO: Get #country value
  // Must not be the default empty option
}

function validateTerms() {
  // TODO: Get #terms checkbox
  // Must be checked
}


// ============================================================
// TASK 4: Password Strength Indicator
// ============================================================
function updatePasswordStrength(password) {
  // TODO: Get #password-strength element
  // Determine strength: weak / fair / strong
  // Update element's class and text
}


// ============================================================
// TASK 5: Bio Character Counter
// ============================================================
const bioTextarea = document.querySelector('#bio');
// TODO: Add 'input' event listener to bioTextarea
// Update #char-count text: "X / 200 characters"
// If over 200: add 'over-limit' class, disable submit button


// ============================================================
// TASK 2: Attach real-time listeners
// ============================================================
// TODO: Add 'blur' (or 'input') event listeners to each field
// that call its validator function


// ============================================================
// TASK 3: Submit Handler
// ============================================================
form.addEventListener('submit', function(event) {
  event.preventDefault(); // Always prevent default first

  // TODO: Run all validators and collect results
  // const results = [validateName(), validateEmail(), ...]

  // TODO: If all true → show #success-message, hide form
  // TODO: If any false → scroll to first invalid field
});
