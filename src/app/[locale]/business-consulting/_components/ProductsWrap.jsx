"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css"; // Swiper styles
import OrderIcon from "@/icons/OrderIcon";
import AddToCartButton from "@/components/AddToCartButton";

const ProductsWrap = ({ products, title }) => {
  return (
    <section className="products-wrap">
      <div className="_container">
        {title && <h2 className="fadeInUp">{title}</h2>}

        {/* Desktop layout - Flex row */}
        <div className="products-wrap__body desktop">
          {products.map((product, index) => (
            <div key={product.id} className="product-item fadeInUp">
              <div className="slider-inner">
                <div>
                  <span>{String(index + 1).padStart(2, "0")}.</span>
                  <h3>{product.title}</h3>
                  <div
                    className="description"
                    dangerouslySetInnerHTML={{ __html: product.description }}
                  />
                </div>
                <div className="bottom">
                  <div className="price">
                    €{product.price}
                    {product.per_price && (
                      <span className="per-price">{product.per_price}</span>
                    )}
                  </div>
                  <AddToCartButton product={product} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile layout - Swiper slider */}
        <div className="products-wrap__body mobile">
          <Swiper
            spaceBetween={50}
            slidesPerView={1}
            modules={[Navigation, Autoplay]}
            navigation={{
              prevEl: ".arrow-prev",
              nextEl: ".arrow-next",
            }}
            autoplay={{ delay: 3000, disableOnInteraction: false }} // Autoplay settings
            loop={true}
            effect="slide"
          >
            {products.map((product, index) => (
              <SwiperSlide key={product.id}>
                <div className="slider-inner">
                  <div>
                    <span>{String(index + 1).padStart(2, "0")}.</span>
                    <h3>{product.title}</h3>
                    <div
                      className="description"
                      dangerouslySetInnerHTML={{ __html: product.description }}
                    />
                  </div>
                  <div className="bottom">
                    <div className="price">€{product.price}</div>
                    <AddToCartButton product={product} />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="arrows">
            <img
              className="arrow-prev"
              src="/images/arrowPrev.svg"
              alt="Previous"
            />
            <img
              className="arrow-next"
              src="/images/arrowNext.svg"
              alt="Next"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsWrap;
