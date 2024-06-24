import { useEffect, useState } from "react";
import { Box, IconButton, Skeleton } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Link } from "react-router-dom";
import { getData } from "../../../api/Api";
import "../../../styles/Caraousel.css";

function TopBannerCarousel() {
  const isMobile = useMediaQuery("(max-width:750px)");
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    getData("/api/gift-shop-banners?populate=*")
      .then((response) => setBanners(response?.data))
      .catch((error) => console.error("Error fetching banners:", error));
  }, []);

  return (
    <div className="main-section">
      <div className="main-carousel">
        <Carousel
          showArrows={true}
          showStatus={false}
          showIndicators={true}
          showThumbs={false}
          infiniteLoop={true}
          useKeyboardArrows={true}
          autoPlay={true}
          interval={3000}
          transitionTime={500}
          stopOnHover={true}
          renderArrowPrev={(onClickHandler, hasPrev, label) => (
            <IconButton onClick={onClickHandler} sx={leftIconButton}>
              <NavigateBeforeIcon sx={{ fontSize: 40 }} />
            </IconButton>
          )}
          renderArrowNext={(onClickHandler, hasNext, label) => (
            <IconButton onClick={onClickHandler} sx={rightIconButton}>
              <NavigateNextIcon sx={{ fontSize: 40 }} />
            </IconButton>
          )}
        >
          {banners.length > 0 ? (
            banners.map((texture, index) => (
              <Link to={texture?.attributes?.banner_url} key={index}>
                <Box key={`carousel-image-${index}`}>
                  <img
                    className="carousel-img"
                    src={
                      texture?.attributes?.banner_image?.data?.attributes?.url
                    }
                    alt={`carousel-${index}`}
                    style={carouselImgStyle(isMobile)}
                    loading="lazy"
                  />
                </Box>
              </Link>
            ))
          ) : (
            <Skeleton
              variant="rectangular"
              sx={{ width: "100%", height: "66vh" }}
              animation="wave"
            />
          )}
        </Carousel>
      </div>
    </div>
  );
}

/**
 * @Styles
 */
const carouselImgStyle = (isMobile) => ({
  width: isMobile ? "" : "100%",
  height: isMobile ? "" : "66.67vh",
  // marginTop: isMobile ? "0-2rem" : "0-2rem",
  objectFit: isMobile ? "cover" : "cover",
  backgroundAttachment: "fixed",
});

const leftIconButton = {
  position: "absolute",
  top: "50%",
  left: "0",
  color: "white",
  padding: "5px",
  zIndex: "10",
};

const rightIconButton = {
  position: "absolute",
  top: "50%",
  right: "0",
  color: "white",
  padding: "5px",
  // zIndex: '10',
};
export default TopBannerCarousel;
