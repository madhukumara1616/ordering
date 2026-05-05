// ─── Cart State ───────────────────────────────────────────────────────────────
// cart is an array of { item: MenuItem, quantity: number }

const cart = [];

/**
 * Add an item to the cart. If already present, does NOT add again (one click = one add).
 * @param {{ id: string, name: string, price: number, image: string, description: string }} item
 * @returns {boolean} true if added, false if already in cart
 */
export function addToCart(item) {
  const existing = cart.find(ci => ci.item.id === item.id);
  if (existing) {
    // Item already in cart — do not add again per US-002 validation
    return false;
  }
  cart.push({ item, quantity: 1 });
  return true;
}

/**
 * Remove an item from the cart by its id.
 * @param {string} itemId
 * @returns {boolean} true if removed, false if not found
 */
export function removeFromCart(itemId) {
  const index = cart.findIndex(ci => ci.item.id === itemId);
  if (index === -1) return false;
  cart.splice(index, 1);
  return true;
}

/**
 * Update the quantity of a cart item. Quantity must be a positive integer.
 * @param {string} itemId
 * @param {number} quantity
 * @returns {boolean} true if updated, false if invalid or not found
 */
export function updateQuantity(itemId, quantity) {
  if (!Number.isInteger(quantity) || quantity < 1) return false;
  const cartItem = cart.find(ci => ci.item.id === itemId);
  if (!cartItem) return false;
  cartItem.quantity = quantity;
  return true;
}

/**
 * Calculate the total price of all items in the cart.
 * Accurately sums price * quantity for each item.
 * @returns {number}
 */
export function getCartTotal() {
  return cart.reduce((sum, ci) => {
    const lineTotal = ci.item.price * ci.quantity;
    return sum + lineTotal;
  }, 0);
}

/**
 * Returns a shallow copy of the cart items array.
 * @returns {{ item: object, quantity: number }[]}
 */
export function getCartItems() {
  return cart.map(ci => ({ item: ci.item, quantity: ci.quantity }));
}

/**
 * Returns the number of distinct items in the cart.
 * @returns {number}
 */
export function getCartItemCount() {
  return cart.length;
}

/**
 * Clears all items from the cart.
 */
export function clearCart() {
  cart.splice(0, cart.length);
}

// Export cart reference for direct inspection if needed
export { cart };