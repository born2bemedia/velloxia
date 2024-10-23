"use client";
import React from "react";
import useCartStore from "@/stores/cartStore"; // Використовуємо Zustand для кошика
import OrderIcon from "@/icons/OrderIcon"; // Іконка для кнопки

const AddToCartButton = ({ product }) => {
  const { cart, addToCart } = useCartStore(); // Отримуємо стан кошика і функцію додавання товару

  // Перевіряємо, чи вже є товар у кошику
  const isInCart = cart.some((item) => item.id === product.id);

  const handleAddToCart = () => {
    if (!isInCart) {
      addToCart({
        id: product.id,
        name: product.title,
        quantity: 1,
        attributes: { price: product.price },
      });
      console.log(`${product.title} added to cart`);
    }
  };

  return (
    <button onClick={handleAddToCart} disabled={isInCart}>
      {isInCart ? "In Cart" : "Order"}
      <OrderIcon />
    </button>
  );
};

export default AddToCartButton;
