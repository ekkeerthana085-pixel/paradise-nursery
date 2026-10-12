
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../features/cart/CartSlice.jsx";
import { products } from "../data/products.js";

const categories = ["All", "Indoor", "Flowering", "Hanging"];

export default function ProductList() {
  const [category, setCategory] = useState("All");
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const visibleProducts =
    category === "All"
      ? products
      : products.filter((product) => product.category === category);

  return (
    <section className="section" id="plants">
      <p className="eyebrow">OUR PLANTS</p>
      <h2>Find your perfect plant</h2>

      <div className="filters">
        {categories.map((item) => (
          <button
            key={item}
            className={category === item ? "selected" : ""}
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="products">
        {visibleProducts.map((product) => {
          const inCart = cartItems.some(
            (item) => item.id === product.id
          );

          return (
            <article className="product" key={product.id}>
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <strong>${product.price.toFixed(2)}</strong>
              <button
                disabled={inCart}
                onClick={() => dispatch(addItem(product))}
              >
                {inCart ? "Added to Cart" : "Add to Cart"}
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
}
