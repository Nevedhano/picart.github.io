import React, { useState } from "react";
import "./App.css";
import sunsetImage from "./sunset.png";
import mountImage from "./mountain.png";
import beachImage from "./beach.png";
import flowerpaintImage from "./flowerpaint.png";
import ancientpaintImage from "./ancientpaint.png";

const initialPicturesData = [
  {
    id: 1,
    name: "Sunset Paint",
    price: 10,
    imageUrl: sunsetImage,
  },
  {
    id: 2,
    name: "Mountain Paint",
    price: 15,
    imageUrl: mountImage,
  },
  {
    id: 3,
    name: "Beach Paint",
    price: 20,
    imageUrl: beachImage,
  },
  {
    id: 4,
    name: "Flower paint",
    price: 25,
    imageUrl: flowerpaintImage,
  },
  {
    id: 5,
    name: "Ancient paint",
    price: 25,
    imageUrl: ancientpaintImage,
  },
];

function Picture({ picture, addToCart }) {
  return (
    <div className="picture">
      <div className="picture-content">
        <img
          src={picture.imageUrl}
          alt={picture.name}
          className="picture-image"
        />
        <div className="bottom-half">
          <h3>{picture.name}</h3>
          <p>Price: ₹{picture.price}</p>
          <button onClick={() => addToCart(picture)}>Buy</button>
        </div>
      </div>
    </div>
  );
}

function Cart({ cartItems, totalPrice, pay, removeFromCart }) {
  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      <ul className="cart-items">
        {cartItems.map((item) => (
          <li key={item.id}>
            {item.name} - ₹{item.price}
            <button
              onClick={() => removeFromCart(item)}
              className="remove-button"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <p>Total: ₹{totalPrice.toFixed(2)}</p>
      <button onClick={pay} className="pay-button">
        Pay
      </button>
    </div>
  );
}

function App() {
  const [pictures, setPictures] = useState(initialPicturesData);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const addToCart = (picture) => {
    setCartItems([...cartItems, picture]);
    setTotalPrice(totalPrice + picture.price);
    setPictures(pictures.filter((item) => item.id !== picture.id));
  };

  const removeFromCart = (itemToRemove) => {
    setCartItems(cartItems.filter((item) => item.id !== itemToRemove.id));
    setTotalPrice(totalPrice - itemToRemove.price);
    setPictures([...pictures, itemToRemove]);
  };

  const pay = () => {
    setCartItems([]);
    setTotalPrice(0);
    alert("Yayy!! Payment successful!");
  };

  return (
    <div className="container">
      <h1 className="pic">PiCart</h1>
      <div className="pictures">
        {pictures.map((picture) => (
          <Picture key={picture.id} picture={picture} addToCart={addToCart} />
        ))}
      </div>
      <Cart
        cartItems={cartItems}
        totalPrice={totalPrice}
        pay={pay}
        removeFromCart={removeFromCart}
      />
    </div>
  );
}

export default App;
