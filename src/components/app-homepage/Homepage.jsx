// Import necessary modules and components
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import { setItems } from "../../state";
import React, { Fragment, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../styles/style.css";
import "../../styles/Navbar.css";
import "../../App.css";
import "react-dropdown/style.css";
import "../../styles/Item2.css";
import {
  AboutJkyogGiftshop,
  BooksUnder,
  FeaturedCategories,
  NeedHelp,
  SingleBanner,
  StayConnected,
  SwamijisKirtans,
  TopBannerCarousel,
  TrendingItems,
} from "./components";
import { ApiDataPostType } from "../../api/Api";

function HomePage() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const value = useSelector((state) => state.cart.value);

  useEffect(() => {
    window.scrollTo(0, 0);
    ApiDataPostType("/customer/get-all-products")
      .then((response) => dispatch(setItems(response.data.response)))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <Fragment>
      <Box>
        <TopBannerCarousel />

        <div className="container boxess">
          <FeaturedCategories />
          {/* {<Handpicked />} */}
          {value === "All" && <TrendingItems products={items} />}
        </div>

        <SingleBanner />

        <div className="container boxess">
          {value === "All" && (
            <Fragment>
              <SwamijisKirtans products={items} />
              <BooksUnder products={items} />
              <AboutJkyogGiftshop />
              <NeedHelp />
            </Fragment>
          )}
        </div>

        <StayConnected />
      </Box>
    </Fragment>
  );
}

export default HomePage;
