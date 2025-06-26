"use client";
import React, { useState } from "react";
import FaqAccordion from "./FaqAccordion";
import InsightsWrap from "./InsightsWrap";

const HelpTabs = () => {
  const [activeTab, setActiveTab] = useState("tab1");

  const handleTabs = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <section className="tabs-wrap">
      <div className="_container">
        <div className="tabs-wrap__body">
          <div className="tabs-head">
            <button
              onClick={() => handleTabs("tab1")}
              className={`${activeTab == "tab1" ? "active" : ""}`}
            >
              FAQ
            </button>
            <div className="for-mobile tabs-content"><FaqAccordion /></div>
            <button
              onClick={() => handleTabs("tab2")}
              className={`${activeTab == "tab2" ? "active" : ""}`}
            >
              Insights
            </button>
            <div className="for-mobile tabs-content"><InsightsWrap /></div>
          </div>
          <div className="tabs-content">
            {activeTab == "tab1" && <FaqAccordion />}
            {activeTab == "tab2" && <InsightsWrap />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HelpTabs;
