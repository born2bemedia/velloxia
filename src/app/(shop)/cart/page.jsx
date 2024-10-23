"use client";
import "@/styles/cart.scss";
import React, { useState, useEffect } from "react";
import DeleteIcon from "@/icons/DeleteIcon";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useCartStore from "@/stores/cartStore"; // Імпорт Zustend Store

const CartPage = () => {
  const {
    cart,
    deleteFromCart,
    clearCart,
    totalAmount,
    increaseQuantity,
    decreaseQuantity,
  } = useCartStore();
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      {isMounted ? (
        <>
          {cart.length > 0 ? (
            <div>
              <section className="cart-wrap">
                <div className="_container">
                  <div className="cart">
                    <div className="cart-head">
                      <div>Service</div>
                      <div>Price, €</div>
                      <div>Quantity</div>
                      <div>Subtotal, €</div>
                    </div>
                    <div className="cart-content">
                      {cart.map((item) => (
                        <div key={item.id} className="cart-item">
                          <div>
                            <button onClick={() => deleteFromCart(item.id)}>
                              <DeleteIcon />
                            </button>
                            <span>{item.name}</span>
                          </div>
                          <div>{item.attributes.price}</div>
                          <div>
                            <div className="qt">
                              <img
                                src="/images/cart/minus.svg"
                                className="quantity-minus"
                                onClick={() => decreaseQuantity(item.id)} // Зменшення кількості
                              />
                              <span>{item.quantity}</span>
                              <img
                                src="/images/cart/plus.svg"
                                className="quantity-plus"
                                onClick={() => increaseQuantity(item.id)} // Збільшення кількості
                              />
                            </div>
                          </div>

                          <div>{item.quantity * item.attributes.price}</div>
                        </div>
                      ))}
                    </div>

                    <div className="total">Total: {totalAmount}</div>
                    <div className="button-wrap">
                      <Link className="main-button" href="/checkout">
                        <span>Checkout</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          ) : (
            <div>
              <section className="cart-wrap empty">
                <div className="_container">
                  <h1>
                    It looks like you have not added any services to the cart
                    yet.
                    <span>
                      Explore our offerings and choose the services you need.
                    </span>
                  </h1>
                  <img src="/images/arrowDown.svg" />
                  <div className="buttons">
                    <Link href="/business-consulting">
                      <span>Business Consulting</span>
                    </Link>
                    <Link href="/marketing-consulting">
                      <span>Marketing Consulting</span>
                    </Link>
                  </div>
                </div>
              </section>
            </div>
          )}
        </>
      ) : (
        <section className="cart-wrap">
          <div className="_container"></div>
        </section>
      )}
    </>
  );
};

export default CartPage;
