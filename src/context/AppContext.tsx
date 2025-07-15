import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { CartItem, User, Product } from '../types';

interface AppState {
  user: User | null;
  cart: CartItem[];
  isLoginModalOpen: boolean;
  currentPage: string;
}

type AppAction =
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'ADD_TO_CART'; payload: { product: Product; quantity: number; selectedColor: string; selectedSize: string } }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_CART_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_LOGIN_MODAL' }
  | { type: 'SET_CURRENT_PAGE'; payload: string };

const initialState: AppState = {
  user: null,
  cart: [],
  isLoginModalOpen: false,
  currentPage: 'home'
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    
    case 'ADD_TO_CART':
      const existingItemIndex = state.cart.findIndex(
        item => 
          item.product.id === action.payload.product.id &&
          item.selectedColor === action.payload.selectedColor &&
          item.selectedSize === action.payload.selectedSize
      );
      
      if (existingItemIndex >= 0) {
        const updatedCart = [...state.cart];
        updatedCart[existingItemIndex].quantity += action.payload.quantity;
        return { ...state, cart: updatedCart };
      } else {
        return {
          ...state,
          cart: [...state.cart, {
            product: action.payload.product,
            quantity: action.payload.quantity,
            selectedColor: action.payload.selectedColor,
            selectedSize: action.payload.selectedSize
          }]
        };
      }
    
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter((_, index) => index.toString() !== action.payload)
      };
    
    case 'UPDATE_CART_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.product.id === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };
    
    case 'CLEAR_CART':
      return { ...state, cart: [] };
    
    case 'TOGGLE_LOGIN_MODAL':
      return { ...state, isLoginModalOpen: !state.isLoginModalOpen };
    
    case 'SET_CURRENT_PAGE':
      return { ...state, currentPage: action.payload };
    
    default:
      return state;
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}