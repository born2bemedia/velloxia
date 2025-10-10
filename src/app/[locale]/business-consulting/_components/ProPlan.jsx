"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css"; // Swiper styles
import OrderIcon from "@/icons/OrderIcon";
import Link from "next/link";
import AddToCartButton from "@/components/AddToCartButton";
import { useTranslations } from "next-intl";
import useProductStore from "@/stores/productsStore";

const ProPlan = ({ locale }) => {
  const t = useTranslations("packs");
  const { fetchProducts, getProductBySlug } = useProductStore.getState();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchAndSetProducts = async () => {
      await fetchProducts(locale);
      const product = getProductBySlug("business-launch-pro");
      console.log(product);
      setProduct(product);
    };
    fetchAndSetProducts();
  }, [locale]);

  // const product = getProductBySlug("business-launch-pro");

  return (
    <div className="pro-plan-wrap">
      <h2 className="fadeInUp">
        Starting a New Business?
        <span>Let’s Build It Right.</span>
      </h2>
      <p>
        From planning and legal setup to branding, marketing, and your first
        clients — Business Launch Pro™ provides everything you need to
        establish, promote, and grow your business confidently.
      </p>
      <div className="pro-plan-wrap__body ">
        <div className="col-1">
          <h3>{product?.title}</h3>
          <p>
            A complete solution for establishing and launching your business —
            from strategy and legal setup to branding, marketing, and your first
            clients.
          </p>
          <h4>The pack includes:</h4>
          <div className="includes">
            <div className="includes__item">
              <h5>Business Planning & Strategy</h5>
              <ul>
                <li>Business Plan Creation</li>
                <li>Business Strategy Development</li>
                <li>Expert Feasibility Study</li>
                <li>Financial Forecasting and Budgeting</li>
              </ul>
            </div>
            <div className="includes__item">
              <h5>Market Research & Positioning</h5>
              <ul>
                <li>Market Research and Analysis</li>
                <li>Customer Segmentation and Targeting</li>
                <li>Brand Messaging and Positioning</li>
                <li>Business Name and Branding Consultation</li>
              </ul>
            </div>
            <div className="includes__item">
              <h5>Legal & Compliance</h5>
              <ul>
                <li>Legal and Compliance Consultation</li>
                <li>Compliance Review and Auditing</li>
                <li>Documentation Package</li>
              </ul>
            </div>
            <div className="includes__item">
              <h5>Operations & Leadership</h5>
              <ul>
                <li>Operations Efficiency Consulting</li>
                <li>Risk Management Planning</li>
                <li>Team Building and Leadership Guidance</li>
                <li>Succession and Exit Strategy Planning</li>
              </ul>
            </div>
            <div className="includes__item">
              <h5>Marketing & Launch</h5>
              <ul>
                <li>Social Media Strategy Development</li>
                <li>Content Marketing Strategy</li>
                <li>SEO and Content Optimization</li>
                <li>Paid Advertising Campaigns</li>
                <li>Video Content Marketing</li>
                <li>Influencer Marketing Strategy</li>
                <li>Email Marketing and Automation</li>
                <li>Market Entry Strategy</li>
                <li>Online Reputation Management</li>
                <li>Analytics Setup & Performance Tracking</li>
              </ul>
            </div>
          </div>
          <div className="actions">
            <div className="price">
              <span>from</span> €{product?.price}
            </div>
            <AddToCartButton product={product} />
          </div>
        </div>
        <div className="col-2"></div>
      </div>
    </div>
  );
};

export default ProPlan;
