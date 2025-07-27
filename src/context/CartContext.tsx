"use client";

import {
  createContext,
  useReducer,
  useContext,
  ReactNode,
  Dispatch,
} from "react";

// Type for a cart item
export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

// Cart state type
interface CartState {
  items: CartItem[];
  isCartOpen: boolean;
}

// Action types
type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: number }
  | { type: "CLEAR_CART" }
  | { type: "TOGGLE_CART" }
  | { type: "CLOSE_CART" }
  | { type: "OPEN_CART" };

// Initial cart state
const initialState: CartState = {
  items: [],
  isCartOpen: false,
};

// Reducer logic
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const exists = state.items.find((item) => item.id === action.payload.id);
      if (exists) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        return {
          ...state,
          items: [...state.items, { ...action.payload, quantity: 1 }],
        };
      }
    }

    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };

    case "CLEAR_CART":
      return {
        ...state,
        items: [],
      };

    case "TOGGLE_CART":
      return {
        ...state,
        isCartOpen: !state.isCartOpen,
      };

    case "CLOSE_CART":
      return {
        ...state,
        isCartOpen: false,
      };

    case "OPEN_CART":
      return {
        ...state,
        isCartOpen: true,
      };

    default:
      return state;
  }
}

// Context type
interface CartContextType {
  cart: CartState;
  dispatch: Dispatch<CartAction>;
}

// Create context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Provider component
export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const value = { cart: state, dispatch };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// Custom hook

export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}