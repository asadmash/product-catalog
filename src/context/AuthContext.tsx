"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useEffect,
} from "react";
import { useRouter } from "next/navigation";

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
}

type AuthAction =
  | { type: "LOGIN"; payload: string }
  | { type: "LOGOUT" };

const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "LOGIN":
      return { token: action.payload, isAuthenticated: true };
    case "LOGOUT":
      return { token: null, isAuthenticated: false };
    default:
      return state;
  }
}

interface AuthContextType {
  state: AuthState;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const router = useRouter();

  // On mount, read token from localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch({ type: "LOGIN", payload: token });
    }
  }, []);

  // Persist token changes to localStorage
  useEffect(() => {
    if (state.token) {
      localStorage.setItem("token", state.token);
    } else {
      localStorage.removeItem("token");
    }
  }, [state.token]);

  const login = (token: string) => {
    dispatch({ type: "LOGIN", payload: token });
    router.push("/"); // redirect to homepage or wherever after login
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
