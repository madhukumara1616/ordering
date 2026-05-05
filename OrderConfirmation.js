// ─── Order Confirmation Renderer ─────────────────────────────────────────────

/**
 * Renders the order confirmation page HTML.
 * Displays only after a successful order placement.
 *
 * @param {{
 *   id: string,
 *   name: string,
 *   phone: string,
 *   address: string,
 *   items: { item: { id: string, name: string, price: number, image: string }, quantity: number }[],
 *   total: number
 * } | null} order
 * @returns {string} HTML string
 */
export function renderOrderConfirmation(order) {
  // Guard: only render if a valid order exists
  if (!order || !order.id) {
    return `
      <section class="page confirmation-page">
        <div class="empty-state">
          <div class="empty-state__icon">⚠️</div>
          <h2 class="empty-state__title">No order found</h2>
          <p class="empty-state__text">Please place an order first.</p>
          <button class="btn btn--primary" id="new-order-btn">Go to Menu</button>
        </div>
      </section>
    `;
  }

  const { id, name, phone, address, items, total } = order;

  return `
    <section class="page confirmation-page">
      <div class="confirmation-hero">
        <div class="confirmation-hero__icon" aria-hidden="true">🎉</div>
        <h1 class="confirmation-hero__title">Order Placed Successfully!</h1>
        <p class="confirmation-hero__subtitle">Thank you for your order, <strong>${escapeHtml(name)}</strong>!</p>
        <p class="confirmation-hero__order-id">Order ID: <code>${escapeHtml(id)}</code></p>
      </div>

      <div class="confirmation-layout">

        <!-- Ordered Items -->
        <div class="confirmation-card">
          <h2 class="confirmation-card__title">Ordered Items</h2>
          <div class="confirmation-items">
            ${items.map(({ item, quantity }) => `
              <div class="confirmation-item">
                <img
                  src="${escapeHtml(item.image)}"
                  alt="${escapeHtml(item.name)}"
                  class="confirmation-item__image"
                  onerror="this.src='https://placehold.co/64x64/f97316/ffffff?text=Food'"
                />
                <div class="confirmation-item__info">
                  <p class="confirmation-item__name">${escapeHtml(item.name)}</p>
                  <p class="confirmation-item__qty">Qty: ${quantity}</p>
                </div>
                <p class="confirmation-item__subtotal">$${(item.price * quantity).toFixed(2)}</p>
              </div>
            `).join('')}
          </div>
          <div class="confirmation-total">
            <span class="confirmation-total__label">Total Price</span>
            <span class="confirmation-total__value">$${total.toFixed(2)}</span>
          </div>
        </div>

        <!-- Delivery Details -->
        <div class="confirmation-card">
          <h2 class="confirmation-card__title">Delivery Details</h2>
          <dl class="confirmation-details">
            <div class="confirmation-details__row">
              <dt class="confirmation-details__label">Name</dt>
              <dd class="confirmation-details__value">${escapeHtml(name)}</dd>
            </div>
            <div class="confirmation-details__row">
              <dt class="confirmation-details__label">Phone Number</dt>
              <dd class="confirmation-details__value">${escapeHtml(phone)}</dd>
            </div>
            <div class="confirmation-details__row">
              <dt class="confirmation-details__label">Delivery Address</dt>
              <dd class="confirmation-details__value confirmation-details__value--address">${escapeHtml(address)}</dd>
            </div>
          </dl>
        </div>

      </div>

      <div class="confirmation-actions">
        <button class="btn btn--primary btn--lg" id="new-order-btn">Place Another Order</button>
      </div>
    </section>
  `;
}

/**
 * Escapes HTML special characters to prevent XSS.
 * @param {string} str
 * @returns {string}
 */
function escapeHtml(str) {
  if (typeof str !== 'string') return String(str);
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}