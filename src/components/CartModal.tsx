"use client";

import React from "react";
import { useCart } from "@/context/CartContext";

export default function CartModal() {
  const { cart, dispatch } = useCart();
  const { items, isCartOpen } = cart;

  if (!isCartOpen) return null; // Don't render modal if closed

  const handleRemove = (id: number) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };

  const handleClose = () => {
    dispatch({ type: "CLOSE_CART" });
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-[#000000e0] bg-opacity-50 z-40"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-lg p-4 z-50 flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Your Cart</h2>
          <button
            onClick={handleClose}
            className="text-gray-600 hover:text-gray-900"
            aria-label="Close cart"
          >
            &#x2715;
          </button>
        </div>

        {items.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">Your cart is empty.</p>
        ) : (
          <ul className="flex-1 overflow-y-auto">
            {items.map(({ id, name, price, quantity, image }) => (
              <li key={id} className="flex items-center gap-3 mb-4">
                <img
                  src={image}
                  alt={name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex flex-col flex-grow">
                  <span className="font-medium">{name}</span>
                  <span className="text-sm text-gray-600">
                    ${price.toFixed(2)}
                  </span>
                  <span className="text-sm text-gray-600">Qty: {quantity}</span>
                </div>
                <button
                  onClick={() => handleRemove(id)}
                  className="text-red-500 hover:text-red-700"
                  aria-label={`Remove ${name} from cart`}
                >
                  &#x2715;
                </button>
              </li>
            ))}
          </ul>
        )}

        {items.length > 0 && (
          <button
            onClick={() => dispatch({ type: "CLEAR_CART" })}
            className="mt-auto bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
          >
            Clear Cart
          </button>
        )}
      </div>
    </>
  );
}
