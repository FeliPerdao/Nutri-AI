import React from "react";
import { useCart } from "../context/CartContext";
import { FaTimes } from "react-icons/fa";
import styles from "./Cart.module.css";

const Cart = () => {
  const { cart, handleRemoveItem, handleClearCart, isCartOpen, closeCart } = useCart();

  return (
    <div className={`${styles.cartDrawer} ${isCartOpen ? styles.open : ""}`}>
      <div className={styles.cartHeader}>
        <h2>Mi Heladera</h2>
        <button className={styles.closeButton} onClick={closeCart}>
          <FaTimes />
        </button>
      </div>

      <div className={styles.cartContent}>
        {cart.length === 0 ? (
          <p>La heladera está vacía</p>
        ) : (
          <>
            <ul className={styles.cartList}>
              {cart.map((item) => (
                <li key={item.id} className={styles.cartItem}>
                  <span>{item.name}</span>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => handleRemoveItem(item)}
                  >
                    X
                  </button>
                </li>
              ))}
            </ul>
            <button className={styles.clearBtn} onClick={handleClearCart}>
              Vaciar Heladera
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
