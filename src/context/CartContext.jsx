import React, { createContext, useContext, useEffect, useReducer } from 'react';

const CartContext = createContext(null);

const initial = { items: [], drawerOpen: false };

function reducer(state, action) {
  switch (action.type) {
    case 'INIT':
      return { ...state, items: action.items || [] };
    case 'ADD': {
      const existing = state.items.find((i) => i.id === action.product.id);
      let items;
      if (existing) {
        items = state.items.map((i) => (i.id === action.product.id ? { ...i, qty: i.qty + (action.qty || 1) } : i));
      } else {
        items = [...state.items, { ...action.product, qty: action.qty || 1 }];
      }
      return { ...state, items, drawerOpen: true };
    }
    case 'REMOVE':
      return { ...state, items: state.items.filter((i) => i.id !== action.id) };
    case 'QTY':
      return {
        ...state,
        items: state.items
          .map((i) => (i.id === action.id ? { ...i, qty: Math.max(0, action.qty) } : i))
          .filter((i) => i.qty > 0),
      };
    case 'OPEN':
      return { ...state, drawerOpen: true };
    case 'CLOSE':
      return { ...state, drawerOpen: false };
    case 'CLEAR':
      return { ...state, items: [] };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initial);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('ansha_cart');
      if (raw) dispatch({ type: 'INIT', items: JSON.parse(raw) });
    } catch (e) { /* noop */ }
  }, []);

  useEffect(() => {
    localStorage.setItem('ansha_cart', JSON.stringify(state.items));
  }, [state.items]);

  const value = {
    items: state.items,
    drawerOpen: state.drawerOpen,
    count: state.items.reduce((s, i) => s + i.qty, 0),
    subtotal: state.items.reduce((s, i) => s + i.qty * i.price, 0),
    add: (product, qty = 1) => dispatch({ type: 'ADD', product, qty }),
    remove: (id) => dispatch({ type: 'REMOVE', id }),
    setQty: (id, qty) => dispatch({ type: 'QTY', id, qty }),
    open: () => dispatch({ type: 'OPEN' }),
    close: () => dispatch({ type: 'CLOSE' }),
    clear: () => dispatch({ type: 'CLEAR' }),
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
