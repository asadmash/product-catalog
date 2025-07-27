"use client";

import { useCart } from "@/context/CartContext";

export default function CartCounter() {
  const { cart, dispatch } = useCart();
  const itemCount = cart.items.reduce((total, item) => total + item.quantity, 0);

  const toggleCart = () => {
    dispatch({ type: "TOGGLE_CART" });
  };

  return (
    <div className="relative">
      <button 
        onClick={toggleCart} 
        aria-label="Toggle Cart"
        className="text-2xl"
      >
      <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-shopping-cart"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M17 17h-11v-14h-2" /><path d="M6 5l14 1l-1 7h-13" /></svg>
      </button>
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </div>
  );
}