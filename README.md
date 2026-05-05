# Food Ordering Web Application

A fully client-side food ordering application built with **vanilla HTML, CSS, and JavaScript** (ES6+). No frameworks, no build tools, no dependencies — just open `index.html` in any modern browser.

---

## Features

| User Story | Description |
|---|---|
| US-001 | View all menu items with name, price, and image |
| US-002 | Add items to cart (one unit per click) |
| US-003 | Remove items from cart |
| US-004 | Change item quantity in cart (+ / − controls) |
| US-005 | View cart with all items, quantities, and total price |
| US-006 | Enter checkout details (name, phone, address) with validation |
| US-007 | Place order (blocked if cart is empty or fields are missing) |
| US-008 | See "Order placed successfully" confirmation message |
| US-009 | View full order summary with delivery details after placing order |

---

## Project Structure

food-ordering-web-application/
├── index.html   # Single-page application shell + all page sections
├── style.css    # All styles (CSS custom properties, flexbox, grid, responsive)
├── script.js    # All application logic (state, rendering, validation, routing)
└── README.md    # This file

---

## Getting Started

### Option 1 — Open directly

# Clone or download the repository, then:
open index.html
# or double-click index.html in your file explorer

### Option 2 — Serve locally (recommended to avoid CORS on images)

# Python 3
python3 -m http.server 8080
# then visit http://localhost:8080

# Node.js (npx)
npx serve .
# then visit the printed URL

---

## Application Flow

Menu Page
  └─ Click "Add to Cart"  ──►  Cart badge updates, toast shown

Cart Page  (click "Cart" in nav)
  ├─ Adjust quantity with + / − buttons  ──►  Total updates
  ├─ Click "Remove"  ──►  Item removed
  └─ Click "Proceed to Checkout"  ──►  Checkout Page

Checkout Page
  ├─ Fill Name, Phone Number, Address
  ├─ Inline validation on blur + on submit
  └─ Click "Place Order"  ──►  Confirmation Page

Confirmation Page
  ├─ "Order placed successfully" message
  ├─ Delivery details (name, phone, address)
  ├─ Ordered items with quantities and prices
  ├─ Total price
  └─ Click "Start a New Order"  ──►  Menu Page (cart cleared)

---

## Validation Rules

| Field | Rule |
|---|---|
| Name | Required, minimum 2 characters |
| Phone Number | Required, 7–20 characters, digits / spaces / `+` / `-` / `(` / `)` |
| Address | Required, minimum 5 characters |
| Cart | Must contain at least one item before checkout |
| Quantity | Always a positive integer (minimum 1; removing at 1 deletes the item) |

---

## Browser Support

All modern browsers (Chrome 80+, Firefox 75+, Safari 13.1+, Edge 80+).

---

## Design Highlights

- **CSS custom properties** for a consistent colour palette and easy theming.
- **Responsive grid** — menu adapts from 1 to 4 columns depending on viewport.
- **Sticky header** with animated cart badge.
- **Toast notifications** for user feedback.
- **Page transitions** with a subtle fade-in animation.
- **Accessible** — `aria-label` attributes on interactive controls, `role="status"` on toast.