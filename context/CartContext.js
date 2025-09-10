import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Agrega item solo si no existe
  const addToCart = (item) => {
    setCart((prev) => {
      const exists = prev.find((i) => i.id === item.id);
      if (exists) return prev;
      return [...prev, item];
    });
  };

  // Elimina item por id
  const handleRemoveItem = (item) => {
    setCart((prev) => prev.filter((i) => i.id !== item.id));
  };

  // Vacía toda la heladera
  const handleClearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, handleRemoveItem, handleClearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
