// ─── Checkout Form Renderer & Validator ──────────────────────────────────────

/**
 * Renders the checkout form HTML string.
 * Fields: name (text), phone (tel), address (textarea)
 * @returns {string} HTML string
 */
export function renderCheckoutForm() {
  return `
    <form id="checkout-form" class="checkout-form" novalidate>
      <h2 class="checkout-form__title">Delivery Details</h2>

      <div class="form-group" id="group-name">
        <label class="form-label" for="field-name">
          Full Name <span class="form-required">*</span>
        </label>
        <input
          type="text"
          id="field-name"
          name="name"
          class="form-input"
          placeholder="e.g. Jane Smith"
          autocomplete="name"
          maxlength="100"
        />
        <span class="form-error" id="error-name" role="alert"></span>
      </div>

      <div class="form-group" id="group-phone">
        <label class="form-label" for="field-phone">
          Phone Number <span class="form-required">*</span>
        </label>
        <input
          type="tel"
          id="field-phone"
          name="phone"
          class="form-input"
          placeholder="e.g. +1 555 000 1234"
          autocomplete="tel"
          maxlength="20"
        />
        <span class="form-error" id="error-phone" role="alert"></span>
      </div>

      <div class="form-group" id="group-address">
        <label class="form-label" for="field-address">
          Delivery Address <span class="form-required">*</span>
        </label>
        <textarea
          id="field-address"
          name="address"
          class="form-input form-textarea"
          placeholder="Street, City, State, ZIP"
          rows="4"
          autocomplete="street-address"
          maxlength="300"
        ></textarea>
        <span class="form-error" id="error-address" role="alert"></span>
      </div>

      <div class="checkout-form__actions">
        <button type="button" class="btn btn--outline" id="back-to-cart-btn">← Back to Cart</button>
        <button type="submit" class="btn btn--primary btn--lg" id="place-order-btn">Place Order</button>
      </div>
    </form>
  `;
}

/**
 * Validates the checkout form fields.
 * Returns { valid: boolean, data: { name, phone, address } | null }
 * Shows inline error messages on invalid fields.
 * @returns {{ valid: boolean, data: { name: string, phone: string, address: string } | null }}
 */
export function validateCheckoutForm() {
  const nameInput = document.getElementById('field-name');
  const phoneInput = document.getElementById('field-phone');
  const addressInput = document.getElementById('field-address');

  const nameError = document.getElementById('error-name');
  const phoneError = document.getElementById('error-phone');
  const addressError = document.getElementById('error-address');

  const nameGroup = document.getElementById('group-name');
  const phoneGroup = document.getElementById('group-phone');
  const addressGroup = document.getElementById('group-address');

  // Reset previous errors
  [nameGroup, phoneGroup, addressGroup].forEach(g => g.classList.remove('form-group--error'));
  [nameError, phoneError, addressError].forEach(e => { e.textContent = ''; });

  let valid = true;

  const name = nameInput ? nameInput.value.trim() : '';
  const phone = phoneInput ? phoneInput.value.trim() : '';
  const address = addressInput ? addressInput.value.trim() : '';

  // Validate name
  if (name === '') {
    setFieldError(nameGroup, nameError, 'Full name is required.');
    valid = false;
  } else if (name.length < 2) {
    setFieldError(nameGroup, nameError, 'Name must be at least 2 characters.');
    valid = false;
  }

  // Validate phone
  if (phone === '') {
    setFieldError(phoneGroup, phoneError, 'Phone number is required.');
    valid = false;
  } else if (!isValidPhone(phone)) {
    setFieldError(phoneGroup, phoneError, 'Enter a valid phone number (digits, spaces, +, -, () allowed).');
    valid = false;
  }

  // Validate address
  if (address === '') {
    setFieldError(addressGroup, addressError, 'Delivery address is required.');
    valid = false;
  } else if (address.length < 10) {
    setFieldError(addressGroup, addressError, 'Please enter a complete delivery address.');
    valid = false;
  }

  if (!valid) {
    // Focus first error field
    const firstError = document.querySelector('.form-group--error .form-input');
    if (firstError) firstError.focus();
    return { valid: false, data: null };
  }

  return { valid: true, data: { name, phone, address } };
}

/**
 * Marks a form group as having an error and sets the error message.
 * @param {HTMLElement} group
 * @param {HTMLElement} errorEl
 * @param {string} message
 */
function setFieldError(group, errorEl, message) {
  group.classList.add('form-group--error');
  errorEl.textContent = message;
}

/**
 * Validates a phone number string.
 * Allows digits, spaces, +, -, (, ) — minimum 7 digits.
 * @param {string} phone
 * @returns {boolean}
 */
function isValidPhone(phone) {
  const digitsOnly = phone.replace(/[\s\-().+]/g, '');
  return /^\d{7,15}$/.test(digitsOnly);
}