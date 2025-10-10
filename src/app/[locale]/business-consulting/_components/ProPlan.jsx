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
        {t("startingANewBusiness")}

        <span>{t("letsBuildItRight")}</span>
      </h2>
      <p>{t("proPlanDescription")}</p>
      <div className="pro-plan-wrap__body ">
        <div className="col-1">
          <h3>{product?.title}</h3>
          <p>{t("proPlanDescription2")}</p>
          <h4>{t("thePackIncludes")}:</h4>
          <div className="includes">
            <div className="includes__item">
              <h5>{t("businessPlanningStrategy")}</h5>
              <ul>
                <li>{t("businessPlanCreation")}</li>
                <li>{t("businessStrategyDevelopment")}</li>
                <li>{t("expertFeasibilityStudy")}</li>
                <li>{t("financialForecastingAndBudgeting")}</li>
              </ul>
            </div>
            <div className="includes__item">
              <h5>{t("marketResearchAndPositioning")}</h5>
              <ul>
                <li>{t("marketResearchAndAnalysis")}</li>
                <li>{t("customerSegmentationAndTargeting")}</li>
                <li>{t("brandMessagingAndPositioning")}</li>
                <li>{t("businessNameAndBrandingConsultation")}</li>
              </ul>
            </div>
            <div className="includes__item">
              <h5>{t("legalAndCompliance")}</h5>
              <ul>
                <li>{t("legalAndComplianceConsultation")}</li>
                <li>{t("complianceReviewAndAuditing")}</li>
                <li>{t("documentationPackage")}</li>
              </ul>
            </div>
            <div className="includes__item">
              <h5>{t("operationsAndLeadership")}</h5>
              <ul>
                <li>{t("operationsEfficiencyConsulting")}</li>
                <li>{t("riskManagementPlanning")}</li>
                <li>{t("teamBuildingAndLeadershipGuidance")}</li>
                <li>{t("successionAndExitStrategyPlanning")}</li>
              </ul>
            </div>
            <div className="includes__item">
              <h5>{t("marketingAndLaunch")}</h5>
              <ul>
                <li>{t("socialMediaStrategyDevelopment")}</li>
                <li>{t("contentMarketingStrategy")}</li>
                <li>{t("seoAndContentOptimization")}</li>
                <li>{t("paidAdvertisingCampaigns")}</li>
                <li>{t("videoContentMarketing")}</li>
                <li>{t("influencerMarketingStrategy")}</li>
                <li>{t("emailMarketingAndAutomation")}</li>
                <li>{t("marketEntryStrategy")}</li>
                <li>{t("onlineReputationManagement")}</li>
                <li>{t("analyticsSetupAndPerformanceTracking")}</li>
              </ul>
            </div>
          </div>
          <div className="actions">
            <div className="price">
              <span>{t("from")}</span> €{product?.price}
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
