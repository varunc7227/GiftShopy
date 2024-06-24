import { Box, Typography, useMediaQuery } from "@mui/material";
import { Fragment } from "react";
import Slider from "react-slick";
import Item2 from "../../Item2";
import { homepageSettings } from "../../../utils/slickSettings";

function SwamijisKirtans({ products }) {
  const isMobile = useMediaQuery("(max-width:750px)");

  return (
    <Fragment>
      <Typography
        fontFamily={"Lora"}
        variant={isMobile ? "h2" : "h1"}
        textAlign="left"
        marginTop="1rem"
      >
        <h2
          className="swamijiBooks"
          style={{ fontFamily: "Satoshi, sans-serif" }}
        >
          SWAMIJI KIRTAN
        </h2>
      </Typography>
      {products?.length > 3 ? (
        <Slider {...homepageSettings} className="trendingitems">
          {products.map(
            (item) =>
              item.variants[0].availableForSale === true && (
                <Item2 item={item} key={`${item.title}-${item.id}`} />
              )
          )}
        </Slider>
      ) : (
        <Box
          margin="20px auto"
          display="grid"
          gridTemplateColumns={"repeat(auto-fill, 250px)"}
          justifyContent="space-around"
          rowGap="100px"
          columnGap="3.33%"
        >
          {" "}
          <Slider {...homepageSettings} className="trendingitems">
            {products.map(
              (item) =>
                item.variants[0].availableForSale === true && (
                  <Item2 item={item} key={`${item.title}-${item.id}`} />
                )
            )}
          </Slider>
        </Box>
      )}
    </Fragment>
  );
}

export default SwamijisKirtans;
