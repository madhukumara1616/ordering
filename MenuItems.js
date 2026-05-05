// ─── Menu Item Data ───────────────────────────────────────────────────────────
// Each item has: id (string), name (string), price (number), image (string), description (string)

export const menuItems = [
  {
    id: 'item-001',
    name: 'Classic Cheeseburger',
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=260&fit=crop',
    description: 'Juicy beef patty with cheddar cheese, lettuce, tomato, and our special sauce.'
  },
  {
    id: 'item-002',
    name: 'Margherita Pizza',
    price: 13.49,
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=260&fit=crop',
    description: 'Classic pizza with fresh mozzarella, tomato sauce, and basil leaves.'
  },
  {
    id: 'item-003',
    name: 'Caesar Salad',
    price: 8.49,
    image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=260&fit=crop',
    description: 'Crisp romaine lettuce, parmesan, croutons, and creamy Caesar dressing.'
  },
  {
    id: 'item-004',
    name: 'Grilled Chicken Wrap',
    price: 10.99,
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&h=260&fit=crop',
    description: 'Tender grilled chicken with fresh veggies and garlic aioli in a warm tortilla.'
  },
  {
    id: 'item-005',
    name: 'Spaghetti Bolognese',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=400&h=260&fit=crop',
    description: 'Al dente spaghetti with rich, slow-cooked beef and tomato Bolognese sauce.'
  },
  {
    id: 'item-006',
    name: 'Fish & Chips',
    price: 11.49,
    image: 'https://images.unsplash.com/photo-1579208575657-c595a05383b7?w=400&h=260&fit=crop',
    description: 'Golden beer-battered fish fillet with crispy chips and tartar sauce.'
  },
  {
    id: 'item-007',
    name: 'Veggie Tacos',
    price: 9.49,
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=260&fit=crop',
    description: 'Three soft tacos filled with roasted peppers, black beans, avocado, and salsa.'
  },
  {
    id: 'item-008',
    name: 'BBQ Ribs Platter',
    price: 18.99,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=260&fit=crop',
    description: 'Slow-smoked pork ribs glazed with smoky BBQ sauce, served with coleslaw.'
  },
  {
    id: 'item-009',
    name: 'Chocolate Lava Cake',
    price: 6.49,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=260&fit=crop',
    description: 'Warm chocolate cake with a gooey molten center, served with vanilla ice cream.'
  },
  {
    id: 'item-010',
    name: 'Mango Smoothie',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=400&h=260&fit=crop',
    description: 'Refreshing blend of fresh mango, yogurt, and a hint of lime.'
  }
];

/**
 * Validates that a menu item has all required fields.
 * @param {object} item
 * @returns {{ valid: boolean, errors: string[] }}
 */
export function validateMenuItem(item) {
  const errors = [];
  if (!item.name || typeof item.name !== 'string' || item.name.trim() === '') {
    errors.push('Name is required.');
  }
  if (item.price === undefined || item.price === null || typeof item.price !== 'number' || isNaN(item.price)) {
    errors.push('Price must be a number.');
  }
  if (!item.image || typeof item.image !== 'string' || item.image.trim() === '') {
    errors.push('Image is required.');
  }
  return { valid: errors.length === 0, errors };
}

/**
 * Returns all menu items that pass validation.
 * @returns {object[]}
 */
export function getValidMenuItems() {
  return menuItems.filter(item => validateMenuItem(item).valid);
}