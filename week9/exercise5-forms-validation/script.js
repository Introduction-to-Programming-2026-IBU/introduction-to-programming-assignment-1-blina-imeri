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
  const input = document.querySelector(`#${inputId}`);
  const errorSpan = document.querySelector(`#error-${inputId}`);
  input.classList.add('invalid');
  errorSpan.textContent = message;
}

function clearError(inputId) {
  // TODO: Remove class 'invalid', add class 'valid' to the input
  // TODO: Clear the error-msg span text
  const input = document.querySelector(`#${inputId}`);
  const errorSpan = document.querySelector(`#error-${inputId}`);
  input.classList.remove('invalid');
  input.classList.add('valid');
  errorSpan.textContent = '';
}


// ============================================================
// TASK 2: Individual Field Validators
// (Return true if valid, false if invalid)
// ============================================================

function validateName() {
  // TODO: Get #full-name value
  // If < 2 chars: showError, return false
  // Else: clearError, return true
  const name = document.querySelector('#full-name').value;
  if (name.length < 2) {
    showError('full-name', 'Name must be at least 2 characters long.');
    return false;
  } else {
    clearError('full-name');
    return true;
  }
}

function validateEmail() {
  // TODO: Get #email value
  // Use regex /^[^\s@]+@[^\s@]+\.[^\s@]+$/ to test
  // showError or clearError appropriately
  const email = document.querySelector('#email').value;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showError('email', 'Please enter a valid email address.');
    return false;
  } else {
    clearError('email');
    return true;
  }
}

function validatePassword() {
  // TODO: Get #password value
  // Must be 8+ chars AND contain at least one digit
  // Update #password-strength indicator (Task 4)
  const password = document.querySelector('#password').value;
  const hasDigit = /\d/.test(password);
  if (password.length < 8 || !hasDigit) {
    showError('password', 'Password must be at least 8 characters and contain a digit.');
    updatePasswordStrength(password);
    return false;
  } else {
    clearError('password');
    updatePasswordStrength(password);
    return true;
  }
}

function validateConfirmPassword() {
  // TODO: Get #password and #confirm-password values
  // They must match
  const password = document.querySelector('#password').value;
  const confirmPassword = document.querySelector('#confirm-password').value;
  if (password !== confirmPassword) {
    showError('confirm-password', 'Passwords do not match.');
    return false;
  } else {
    clearError('confirm-password');
    return true;
  }
}

function validateAge() {
  // TODO: Get #age value (convert to Number)
  // Must be 18–120
  const age = Number(document.querySelector('#age').value);
  if (isNaN(age) || age < 18 || age > 120) {
    showError('age', 'Age must be a number between 18 and 120.');
    return false;
  } else {
    clearError('age');
    return true;
  }
}

function validateCountry() {
  // TODO: Get #country value
  // Must not be the default empty option
  const country = document.querySelector('#country').value;
  if (country === '') {
    showError('country', 'Please select a country.');
    return false;
  } else {
    clearError('country');
    return true;
  }
}

function validateTerms() {
  // TODO: Get #terms checkbox
  // Must be checked
  const termsChecked = document.querySelector('#terms').checked;
  if (!termsChecked) {
    showError('terms', 'You must agree to the terms and conditions.');
    return false;
  } else {
    clearError('terms');
    return true;
  }
}


// ============================================================
// TASK 4: Password Strength Indicator
// ============================================================
function updatePasswordStrength(password) {
  // TODO: Get #password-strength element
  // Determine strength: weak / fair / strong
  // Update element's class and text
  const strengthIndicator = document.querySelector('#password-strength');
  const hasDigit = /\d/.test(password);
  if (password.length >= 12 && hasDigit) {
    strengthIndicator.textContent = 'Strong';
    strengthIndicator.className = 'strength-strong';
  } else if (password.length >= 8 && hasDigit) {
    strengthIndicator.textContent = 'Fair';
    strengthIndicator.className = 'strength-fair';
  } else {
    strengthIndicator.textContent = 'Weak';
    strengthIndicator.className = 'strength-weak';
  }
}


// ============================================================
// TASK 5: Bio Character Counter
// ============================================================
const bioTextarea = document.querySelector('#bio');
const charCount = document.querySelector('#char-count');
// TODO: Add 'input' event listener to bioTextarea
// Update #char-count text: "X / 200 characters"
// If over 200: add 'over-limit' class, disable submit button

bioTextarea.addEventListener('input', function() {
  const length = bioTextarea.value.length;
  charCount.textContent = `${length} / 200 characters`;

  if (length > 200) {
    charCount.classList.add('over-limit');
    submitBtn.disabled = true;
  } else {
    charCount.classList.remove('over-limit');
    submitBtn.disabled = false;
  }
});

// ============================================================
// TASK 2: Attach real-time listeners
// ============================================================
// TODO: Add 'blur' (or 'input') event listeners to each field
// that call its validator function
document.querySelector('#full-name').addEventListener('blur', validateName);
document.querySelector('#email').addEventListener('blur', validateEmail);
document.querySelector('#password').addEventListener('blur', validatePassword);
document.querySelector('#confirm-password').addEventListener('blur', validateConfirmPassword);
document.querySelector('#age').addEventListener('blur', validateAge);
document.querySelector('#country').addEventListener('change', validateCountry);
document.querySelector('#terms').addEventListener('change', validateTerms);


// ============================================================
// TASK 3: Submit Handler
// ============================================================
form.addEventListener('submit', function(event) {
  event.preventDefault(); // Always prevent default first
  

  // TODO: Run all validators and collect results
  // const results = [validateName(), validateEmail(), ...]
    const results = [
      validateName(),
      validateEmail(),
      validatePassword(),
      validateConfirmPassword(),
      validateAge(),
      validateCountry(),
      validateTerms()
    ];

  // TODO: If all true → show #success-message, hide form
  if (results.every(result => result === true)) {
    document.querySelector('#success-message').style.display = 'block';
    form.style.display = 'none';
  }
  // TODO: If any false → scroll to first invalid field
    else {
      // Find the first invalid field and scroll to it
      const firstInvalidField = document.querySelector('.invalid');
      if (firstInvalidField) {
        firstInvalidField.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
});
