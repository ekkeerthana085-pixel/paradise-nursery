
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeItem,
  updateQuantity,
  clearCart
} from "../features/cart/CartSlice.jsx";

export default function CartItem({ onContinueShopping }) {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);

  const totalItems = items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const totalAmount = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (items.length === 0) {
    return (
      <section className="section">
        <h2>Your Shopping Cart</h2>
        <p>Your cart is empty.</p>
        <button onClick={onContinueShopping}>
          Continue Shopping
        </button>
      </section>
    );
  }

  return (
    <section className="section">
      <h2>Your Shopping Cart</h2>
      <p>Total items: {totalItems}</p>

      {items.map((item) => (
        <article className="cart-item" key={item.id}>
          <img src={item.image} alt={item.name} />
          <div>
            <h3>{item.name}</h3>
            <p>Unit price: ${item.price.toFixed(2)}</p>
            <p>
              Item total: ${(item.price * item.quantity).toFixed(2)}
            </p>

            <button
              onClick={() =>
                dispatch(
                  updateQuantity({
                    id: item.id,
                    quantity: item.quantity - 1
                  })
                )
              }
            >
              −
            </button>

            <span> {item.quantity} </span>

            <button
              onClick={() =>
                dispatch(
                  updateQuantity({
                    id: item.id,
                    quantity: item.quantity + 1
                  })
                )
              }
            >
              +
            </button>

            <button onClick={() => dispatch(removeItem(item.id))}>
              Delete
            </button>
          </div>
        </article>
      ))}

      <h3>Total amount: ${totalAmount.toFixed(2)}</h3>

      <button onClick={() => window.alert("Coming Soon!")}>
        Checkout
      </button>

      <button onClick={onContinueShopping}>
        Continue Shopping
      </button>

      <button onClick={() => dispatch(clearCart())}>
        Clear Cart
      </button>
    </section>
  );
}
