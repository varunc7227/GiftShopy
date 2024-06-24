import React, { useEffect, useState } from "react";
import SitemapItem from "./SitemapItem";
import "./SiteMap.css";
import NavMenu from "./NavMenu";
import { fetchDataFromApi } from "../utils/api";

const Sitemap = () => {
  const [sitemapData, setSitemapData] = useState([]);

  const getSiteMap = async () => {
    try {
      const response = await fetchDataFromApi("/api/gift-shop-sitemap-page");

      if (response) {
        setSitemapData(response?.data.attributes.sitemap);
      }
    } catch (error) {
      console.error("Error fetching MegaMenu:", error);
    }
  };

  useEffect(() => {
    getSiteMap();
  }, []);

  // This useEffect hook will run every time the component mounts
  useEffect(() => {
    // Using the window.scrollTo method to scroll to the top of the page
    window.scrollTo(0, 0);
  }, []); // The empty array means it will only run on mount and unmount

  return (
    <div>
      <div className="main-section container">
        <div className="sitemap">
          {sitemapData?.map((section, index) => (
            <SitemapItem
              key={index}
              title={section.title}
              items={section.items}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sitemap;
