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
        🛒
      </button>
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </div>
  );
}