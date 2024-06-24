import { Box, Typography } from "@mui/material";
import Item2 from "../../Item2";
import Slider from "react-slick";
import { RANDOM_ITEMS } from "../../../utils/constants";
import { useEffect, useMemo, useState } from "react";
import { ApiDataPostType } from "../../../api/Api";

const SimilarProductsSection = ({ tabView }) => {
  const [similarProducts, setSimilarProducts] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    ApiDataPostType("/customer/get-all-products")
      .then((response) => setSimilarProducts(response.data.response))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);
  const sliderContent = useMemo(
    () => (
      <Slider {...sliderSettings} className="trendingitems">
        {similarProducts.map(
          (item, index) =>
            item.variants[0].availableForSale === true && (
              <Item2 key={`${item.title}-${item.id}`} item={item} />
            )
        )}
      </Slider>
    ),
    [similarProducts]
  );

  return (
    <section style={sectionStyle(tabView)}>
      <Typography variant="h2" sx={typographyStyle}>
        Similar Products
      </Typography>
      <Box>
        {similarProducts.length > 3 ? (
          sliderContent
        ) : (
          <FallbackDisplay similarProducts={similarProducts} />
        )}
      </Box>
    </section>
  );
};

const FallbackDisplay = ({ similarProducts }) => (
  <Box sx={fallbackDisplayStyle}>
    {similarProducts.map(
      (item, index) =>
        item.variants[0].availableForSale === true && (
          <Item2 key={`${item.title}-${item.id}`} item={item} />
        )
    )}
  </Box>
);

/**
 * @Styles
 */
const sectionStyle = (tabView) => ({
  display: "flex",
  flexDirection: "column",
  padding: tabView ? "1rem 1.5rem" : "1rem 5rem",
  gap: "1.5rem",
});

const typographyStyle = {
  fontFamily: "Satoshi, sans-serif",
  fontSize: "2rem",
  fontWeight: 800,
};

const fallbackDisplayStyle = {
  margin: "20px auto",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, 250px)",
  justifyContent: "space-around",
  rowGap: "100px",
  columnGap: "3.33%",
};

/**
 * @Slider_Settings
 */
var sliderSettings = {
  dots: false,
  infinite: false,
  speed: 500,
  marginBottom: "30px",
  slidesToShow: 4,
  slidesToScroll: 2,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1224,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 2,
        infinite: false,
        dots: false,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 2,
        infinite: false,
        dots: false,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
      },
    },
  ],
};

export default SimilarProductsSection;
