import { cart } from '../data/cart.js';

export function removeFromCart(productId) {
  const index = cart.findIndex(item => item.id === productId);

  if (index !== -1) {
    const [removedItem] = cart.splice(index, 1);
    console.log(`🗑️ Removed ${removedItem.name} from cart.`);
  } else {
    console.log(`⚠️ Product with ID ${productId} is not in the cart.`);
  }
}