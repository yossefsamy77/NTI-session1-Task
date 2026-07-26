import { products } from '../data/products.js';
import { cart } from '../data/cart.js';

export function addToCart(productId, quantity = 1) {
  const product = products.find(p => p.id === productId);

  if (!product) {
    console.log(`❌ Product with ID ${productId} not found.`);
    return;
  }

  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ ...product, quantity });
  }

  console.log(`✅ Added ${quantity} x ${product.name} to cart.`);
}