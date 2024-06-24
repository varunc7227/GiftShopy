import { Fragment, useEffect, useState } from "react";
import { getData } from "../../../api/Api";
import { Typography, useMediaQuery } from "@mui/material";

function AboutJkyogGiftshop() {
  const isMobile = useMediaQuery("(max-width:750px)");
  const [aboutJKYogDetails, setAboutJKYogDetails] = useState([]);

  useEffect(() => {
    getData("/api/homepage-about-us?populate=*")
      .then((response) => setAboutJKYogDetails(response?.data.attributes))
      .catch((error) =>
        console.error("Error fetching aboutJKYogDetails:", error)
      );
  }, []);

  return (
    <Fragment>
      <Typography
        variant={isMobile ? "h2" : "h1"}
        textAlign="left"
        marginTop="1rem"
        marginBottom="1.5rem"
      >
        <h2
          className="about_jkyog_gift_shop"
          style={{ fontFamily: "Satoshi, sans-serif" }}
        >
          {aboutJKYogDetails?.title}
        </h2>
      </Typography>
      <div className="about_jkyog_gift_shop_box">
        {/* <div className="about_jkyog_gift_shop_image"></div> */}
        <img
          src={aboutJKYogDetails?.Thumbnail?.data.attributes.url}
          style={imageStyle(isMobile)}
          loading="lazy"
        />
        <div className="about_jkyog_gift_shop_textBox">
          <p className="about_jkyog_gift_shop_text">
            {aboutJKYogDetails?.description}
          </p>
          {/* <div style={{ width: "100%" }}>
            <button
              className="addtocart"
              onClick={() => navigate(aboutJKYogDetails?.Link)}
            >
              Learn More
            </button>
          </div> */}
        </div>
      </div>
    </Fragment>
  );
}

/**
 * @Styles
 */
const imageStyle = (isMobile) => ({
  width: isMobile ? "100%" : "40%",
  height: "300px",
  objectFit: isMobile ? "contain" : "fill",
  borderRadius: "1rem",
});

export default AboutJkyogGiftshop;
