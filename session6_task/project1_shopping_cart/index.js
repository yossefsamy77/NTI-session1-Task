import { addToCart } from './modules/addToCart.js';
import { removeFromCart } from './modules/removeFromCart.js';
import { listCart } from './modules/listCart.js';
import { calculateTotal } from './modules/calculateTotal.js';

console.log("=== PROJECT 1: SHOPPING CART ===");

// 1. إضافة منتجات للكارت
addToCart(1, 1); // Laptop
addToCart(2, 2); // Headphones
addToCart(3, 1); // Mouse

// 2. عرض المنتجات وحساب المجموع
listCart();
console.log(`Total: $${calculateTotal()}`);

// 3. حذف منتج
removeFromCart(3); // Remove Mouse

// 4. عرض الكارت بعد الحذف
listCart();
console.log(`Updated Total: $${calculateTotal()}`);