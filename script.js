import { menuItems } from './MenuItems.js';
import { cart, addToCart, removeFromCart, updateQuantity, getCartTotal, getCartItems } from './CartManagement.js';
import { renderCheckoutForm, validateCheckoutForm } from './CheckoutDetails.js';
import { renderOrderConfirmation } from './OrderConfirmation.js';

// ─── App State ───────────────────────────────────────────────────────────────
let currentPage = 'menu'; // 'menu' | 'cart' | 'checkout' | 'confirmation'
let lastOrder = null;

// ─── DOM References ──────────────────────────────────────────────────────────
const app = document.getElementById('app');
const navMenuBtn = document.getElementById('nav-menu');
const navCartBtn = document.getElementById('nav-cart');
const cartBadge = document.getElementById('cart-badge');

// ─── Navigation ──────────────────────────────────────────────────────────────
function navigate(page) {
  currentPage = page;
  render();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

navMenuBtn.addEventListener('click', () => navigate('menu'));
navCartBtn.addEventListener('click', () => navigate('cart'));

// ─── Cart Badge ──────────────────────────────────────────────────────────────
function updateCartBadge() {
  const items = getCartItems();
  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  cartBadge.textContent = count;
  cartBadge.style.display = count > 0 ? 'flex' : 'none';
}

// ─── Render Menu Page ─────────────────────────────────────────────────────────
function renderMenuPage() {
  const cartItems = getCartItems();
  const inCartIds = new Set(cartItems.map(ci => ci.item.id));

  return `
    <section class="page menu-page">
      <div class="page-header">
        <h1 class="page-title">Our Menu</h1>
        <p class="page-subtitle">Fresh, delicious food delivered to your door</p>
      </div>
      <div class="menu-grid">
        ${menuItems.map(item => `
          <article class="menu-card" data-id="${item.id}">
            <div class="menu-card__image-wrap">
              <img
                src="${item.image}"
                alt="${item.name}"
                class="menu-card__image"
                loading="lazy"
                onerror="this.src='https://placehold.co/400x260/f97316/ffffff?text=Food'"
              />
            </div>
            <div class="menu-card__body">
              <h2 class="menu-card__name">${item.name}</h2>
              <p class="menu-card__description">${item.description}</p>
              <div class="menu-card__footer">
                <span class="menu-card__price">$${item.price.toFixed(2)}</span>
                <button
                  class="btn btn--primary add-to-cart-btn ${inCartIds.has(item.id) ? 'btn--in-cart' : ''}"
                  data-id="${item.id}"
                  aria-label="Add ${item.name} to cart"
                >
                  ${inCartIds.has(item.id) ? '<span class="btn-icon">✓</span> In Cart' : '<span class="btn-icon">+</span> Add to Cart'}
                </button>
              </div>
            </div>
          </article>
        `).join('')}
      </div>
    </section>
  `;
}

// ─── Render Cart Page ─────────────────────────────────────────────────────────
function renderCartPage() {
  const items = getCartItems();
  const total = getCartTotal();

  if (items.length === 0) {
    return `
      <section class="page cart-page">
        <div class="page-header">
          <h1 class="page-title">Your Cart</h1>
        </div>
        <div class="empty-state">
          <div class="empty-state__icon">🛒</div>
          <h2 class="empty-state__title">Your cart is empty</h2>
          <p class="empty-state__text">Add some delicious items from our menu!</p>
          <button class="btn btn--primary" id="go-to-menu-btn">Browse Menu</button>
        </div>
      </section>
    `;
  }

  return `
    <section class="page cart-page">
      <div class="page-header">
        <h1 class="page-title">Your Cart</h1>
        <p class="page-subtitle">${items.length} item${items.length !== 1 ? 's' : ''} in your cart</p>
      </div>
      <div class="cart-layout">
        <div class="cart-items">
          ${items.map(({ item, quantity }) => `
            <div class="cart-item" data-id="${item.id}">
              <img
                src="${item.image}"
                alt="${item.name}"
                class="cart-item__image"
                onerror="this.src='https://placehold.co/80x80/f97316/ffffff?text=Food'"
              />
              <div class="cart-item__info">
                <h3 class="cart-item__name">${item.name}</h3>
                <p class="cart-item__unit-price">$${item.price.toFixed(2)} each</p>
              </div>
              <div class="cart-item__controls">
                <div class="quantity-control">
                  <button class="qty-btn qty-decrease" data-id="${item.id}" aria-label="Decrease quantity">−</button>
                  <input
                    type="number"
                    class="qty-input"
                    value="${quantity}"
                    min="1"
                    max="99"
                    data-id="${item.id}"
                    aria-label="Quantity for ${item.name}"
                  />
                  <button class="qty-btn qty-increase" data-id="${item.id}" aria-label="Increase quantity">+</button>
                </div>
                <p class="cart-item__subtotal">$${(item.price * quantity).toFixed(2)}</p>
                <button class="btn btn--danger remove-btn" data-id="${item.id}" aria-label="Remove ${item.name} from cart">Remove</button>
              </div>
            </div>
          `).join('')}
        </div>
        <div class="cart-summary">
          <h2 class="cart-summary__title">Order Summary</h2>
          <div class="cart-summary__rows">
            ${items.map(({ item, quantity }) => `
              <div class="cart-summary__row">
                <span>${item.name} × ${quantity}</span>
                <span>$${(item.price * quantity).toFixed(2)}</span>
              </div>
            `).join('')}
          </div>
          <div class="cart-summary__divider"></div>
          <div class="cart-summary__total">
            <span>Total</span>
            <span>$${total.toFixed(2)}</span>
          </div>
          <button class="btn btn--primary btn--full" id="checkout-btn">Proceed to Checkout</button>
          <button class="btn btn--outline btn--full" id="continue-shopping-btn">Continue Shopping</button>
        </div>
      </div>
    </section>
  `;
}

// ─── Render Checkout Page ─────────────────────────────────────────────────────
function renderCheckoutPage() {
  const items = getCartItems();
  const total = getCartTotal();
  return `
    <section class="page checkout-page">
      <div class="page-header">
        <h1 class="page-title">Checkout</h1>
        <p class="page-subtitle">Almost there! Fill in your delivery details.</p>
      </div>
      <div class="checkout-layout">
        ${renderCheckoutForm()}
        <div class="checkout-summary">
          <h2 class="checkout-summary__title">Order Summary</h2>
          <div class="checkout-summary__items">
            ${items.map(({ item, quantity }) => `
              <div class="checkout-summary__row">
                <span>${item.name} × ${quantity}</span>
                <span>$${(item.price * quantity).toFixed(2)}</span>
              </div>
            `).join('')}
          </div>
          <div class="checkout-summary__divider"></div>
          <div class="checkout-summary__total">
            <span>Total</span>
            <span>$${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </section>
  `;
}

// ─── Main Render ──────────────────────────────────────────────────────────────
function render() {
  updateCartBadge();

  // Update nav active states
  navMenuBtn.classList.toggle('nav__link--active', currentPage === 'menu');
  navCartBtn.classList.toggle('nav__link--active', currentPage === 'cart');

  if (currentPage === 'menu') {
    app.innerHTML = renderMenuPage();
    attachMenuListeners();
  } else if (currentPage === 'cart') {
    app.innerHTML = renderCartPage();
    attachCartListeners();
  } else if (currentPage === 'checkout') {
    app.innerHTML = renderCheckoutPage();
    attachCheckoutListeners();
  } else if (currentPage === 'confirmation') {
    app.innerHTML = renderOrderConfirmation(lastOrder);
    attachConfirmationListeners();
  }
}

// ─── Menu Listeners ───────────────────────────────────────────────────────────
function attachMenuListeners() {
  document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.dataset.id;
      const item = menuItems.find(m => m.id === id);
      if (item) {
        addToCart(item);
        updateCartBadge();
        // Update button state without full re-render
        btn.innerHTML = '<span class="btn-icon">✓</span> In Cart';
        btn.classList.add('btn--in-cart');
        btn.disabled = true;
        showToast(`${item.name} added to cart!`);
      }
    });
  });
}

// ─── Cart Listeners ───────────────────────────────────────────────────────────
function attachCartListeners() {
  document.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.dataset.id;
      removeFromCart(id);
      render();
    });
  });

  document.querySelectorAll('.qty-decrease').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.dataset.id;
      const items = getCartItems();
      const cartItem = items.find(ci => ci.item.id === id);
      if (cartItem) {
        if (cartItem.quantity <= 1) {
          removeFromCart(id);
        } else {
          updateQuantity(id, cartItem.quantity - 1);
        }
        render();
      }
    });
  });

  document.querySelectorAll('.qty-increase').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.dataset.id;
      const items = getCartItems();
      const cartItem = items.find(ci => ci.item.id === id);
      if (cartItem) {
        updateQuantity(id, cartItem.quantity + 1);
        render();
      }
    });
  });

  document.querySelectorAll('.qty-input').forEach(input => {
    input.addEventListener('change', (e) => {
      const id = e.currentTarget.dataset.id;
      let val = parseInt(e.currentTarget.value, 10);
      if (isNaN(val) || val < 1) val = 1;
      if (val > 99) val = 99;
      updateQuantity(id, val);
      render();
    });
  });

  const checkoutBtn = document.getElementById('checkout-btn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => navigate('checkout'));
  }

  const continueBtn = document.getElementById('continue-shopping-btn');
  if (continueBtn) {
    continueBtn.addEventListener('click', () => navigate('menu'));
  }

  const goMenuBtn = document.getElementById('go-to-menu-btn');
  if (goMenuBtn) {
    goMenuBtn.addEventListener('click', () => navigate('menu'));
  }
}

// ─── Checkout Listeners ───────────────────────────────────────────────────────
function attachCheckoutListeners() {
  const form = document.getElementById('checkout-form');
  if (!form) return;

  const backBtn = document.getElementById('back-to-cart-btn');
  if (backBtn) {
    backBtn.addEventListener('click', () => navigate('cart'));
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const result = validateCheckoutForm();
    if (result.valid) {
      const items = getCartItems();
      const total = getCartTotal();
      lastOrder = {
        id: 'ORD-' + Date.now(),
        name: result.data.name,
        phone: result.data.phone,
        address: result.data.address,
        items: items.map(({ item, quantity }) => ({ item, quantity })),
        total
      };
      // Clear cart after order
      items.forEach(({ item }) => removeFromCart(item.id));
      navigate('confirmation');
    }
  });
}

// ─── Confirmation Listeners ───────────────────────────────────────────────────
function attachConfirmationListeners() {
  const newOrderBtn = document.getElementById('new-order-btn');
  if (newOrderBtn) {
    newOrderBtn.addEventListener('click', () => {
      lastOrder = null;
      navigate('menu');
    });
  }
}

// ─── Toast Notification ───────────────────────────────────────────────────────
function showToast(message) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add('toast--visible');
  });

  setTimeout(() => {
    toast.classList.remove('toast--visible');
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

// ─── Init ─────────────────────────────────────────────────────────────────────
render();