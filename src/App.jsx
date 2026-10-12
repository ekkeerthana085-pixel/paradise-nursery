
import React, { useState } from "react";
import { useSelector } from "react-redux";
import AboutUs from "./components/AboutUs.jsx";
import ProductList from "./components/ProductList.jsx";
import CartItem from "./components/CartItem.jsx";

export default function App() {
  const [page, setPage] = useState("home");

  const cartCount = useSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  const showPlants = () => {
    setPage("plants");
    setTimeout(() => {
      document.getElementById("plants")?.scrollIntoView({
        behavior: "smooth"
      });
    }, 0);
  };

  return (
    <div>
      <nav className="navbar">
        <a href="#home" onClick={() => setPage("home")}>
          Paradise Nursery
        </a>

        <button onClick={() => setPage("home")}>Home</button>
        <button onClick={showPlants}>Plants</button>
        <button onClick={() => setPage("cart")}>
          🛒 Cart ({cartCount})
        </button>
      </nav>

      {page === "cart" ? (
        <CartItem onContinueShopping={showPlants} />
      ) : (
        <main id="home">
          <section className="hero">
            <div className="hero-content">
              <p>WELCOME TO PARADISE NURSERY</p>
              <h1>Bring Nature Home</h1>
              <p>Discover plants that make your space feel alive.</p>
              <button onClick={showPlants}>Get Started</button>
            </div>
          </section>
          <AboutUs />
          <ProductList />
        </main>
      )}
    </div>
  );
}
