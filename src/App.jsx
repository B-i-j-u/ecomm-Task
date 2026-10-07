import { useState } from "react";
import "./App.css";

const products = [
  {
    id: 1,
    name: "Classic T-Shirt",
    price: 799,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRz1bO8axORuKRN58LpqLTlUrcidVSgYt5kY2rw6pPMaw&s=10",
  },
  {
    id: 2,
    name: "Running Shoes",
    price: 2499,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQszObuyz8CxYd24pnU0Pg9HkK5TxHfo12MQ7p7c_i4hw&s",
  },
  {
    id: 3,
    name: "Smart Watch",
    price: 3999,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSir6wQTmSnxbPFIiSLC08nF3xm0Z0w4H8WLqsklWxrAw&s",
  },
  {
    id: 4,
    name: "Backpack",
    price: 2299,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-u-j7fV77iJmO6dbBbWAbrd2ll0KzRTxfelRMNE2IEA&s=10",
  },
];

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const increaseQuantity = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart(
      cart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="app">
      <header className="navbar">
        <h1>ShopEasy</h1>

        <div className="cart-icon">
          🛒 Cart
          <span>{totalItems}</span>
        </div>
      </header>

      <section className="hero">
        <h2>Welcome to ShopEasy</h2>
        <p>Simple products. Great prices.</p>
        <button>Shop Now</button>
      </section>

      <main>
        <h2 className="section-title">Products</h2>

        <div className="products">
          {products.map((product) => (
            <div className="product-card" key={product.id}>
              <img src={product.image} alt={product.name} />

              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="price">₹{product.price}</p>

                <button onClick={() => addToCart(product)}>
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        <section className="cart-section">
          <h2>Your Cart</h2>

          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              {cart.map((item) => (
                <div className="cart-item" key={item.id}>
                  <div>
                    <strong>{item.name}</strong>
                    <p>₹{item.price} each</p>
                  </div>

                  <div className="quantity">
                    <button onClick={() => decreaseQuantity(item.id)}>
                      −
                    </button>

                    <span>{item.quantity}</span>

                    <button onClick={() => increaseQuantity(item.id)}>
                      +
                    </button>
                  </div>

                  <strong>
                    ₹{item.price * item.quantity}
                  </strong>
                </div>
              ))}

              <div className="cart-total">
                <h3>Total: ₹{totalPrice}</h3>
                <button className="checkout">
                  Checkout
                </button>
              </div>
            </>
          )}
        </section>
      </main>

      <footer>
        <p>© 2026 ShopEasy. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
