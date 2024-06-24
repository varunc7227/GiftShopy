import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../../styles/banner.css";

import { getData } from "../../../api/Api";
import { Avatar, Skeleton, useMediaQuery } from "@mui/material";
import { featuredCategoriesSettings } from "../../../utils/slickSettings";

function FeaturedCategories() {
  const isMobile = useMediaQuery("(max-width:750px)");
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getData("/api/gift-shop-contents?populate=*")
      .then((response) => setTags(response?.data))
      .catch((error) => console.error("Error fetching Tags:", error));
  }, []);

  const handleNavigate = (route) => {
    const searchString = route.replace(/'/g, "");
    navigate(
      `/search?category=${searchString.toString()}&filter=All&searchInput=none`
    );
  };

  return (
    <div className="banner_box">
      <h2 className="trending" style={{ fontFamily: "Satoshi, sans-serif" }}>
        FEATURED CATEGORIES
      </h2>
      {tags.length > 0 ? (
        <Slider
          {...featuredCategoriesSettings}
          style={{ width: "100%", boxSizing: "content-box" }}
        >
          {tags?.map((item, i) => {
            return (
              <div
                key={i}
                className="banner_icon"
                onClick={() => handleNavigate(item?.attributes?.title)}
              >
                <div className="bannerimg">
                  <img
                    src={item?.attributes?.content_image?.data?.attributes?.url}
                    alt="banner-image"
                    className="banner_img"
                    loading="lazy"
                  />
                </div>

                <div className="banner_text">
                  <div className="text">{item?.attributes?.title}</div>
                </div>
              </div>
            );
          })}
        </Slider>
      ) : (
        <div style={SkeletonWrap}>
          {Array.from({ length: 5 }, (_, index) => (
            <div style={loadingBox}>
              <Skeleton variant="circular">
                <Avatar
                  sx={{
                    width: isMobile ? 60 : 150,
                    height: isMobile ? 60 : 150,
                  }}
                />
              </Skeleton>
              <Skeleton variant="text" width="100%" />
              <Skeleton variant="text" width="100%" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * @Styles
 */

const SkeletonWrap = {
  width: "100%",
  display: "flex",
  justifyContent: "space-evenly",
  gap: "1rem",
  margin: "1rem",
};

const loadingBox = {
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
};

export default FeaturedCategories;
