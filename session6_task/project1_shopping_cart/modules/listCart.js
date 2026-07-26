import { cart } from '../data/cart.js';

export function listCart() {
  console.log('\n--- 🛒 Cart Items ---');
  if (cart.length === 0) {
    console.log('Cart is empty.');
    return;
  }

  cart.forEach(item => {
    const subtotal = (item.price * item.quantity).toFixed(2);
    console.log(`- ${item.name} | Price: $${item.price} | Qty: ${item.quantity} | Subtotal: $${subtotal}`);
  });
}