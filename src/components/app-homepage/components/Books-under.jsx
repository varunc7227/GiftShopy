import { Box, Typography, useMediaQuery } from "@mui/material";
import { Fragment, useState, useEffect } from "react";
import Slider from "react-slick";
import Item2 from "../../Item2";
import { homepageSettings } from "../../../utils/slickSettings";
import { getData } from "../../../api/Api";

function BooksUnder({ products }) {
  const isMobile = useMediaQuery("(max-width:750px)");
  const [underThePrice, setUnderThePrice] = useState([]);

  useEffect(() => {
    getData("/api/gift-shop-home-products-by-under-price?populate=*")
      .then((response) => setUnderThePrice(response?.data.attributes))
      .catch((error) => console.error("Error fetching banners:", error));
  }, []);

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
          {underThePrice.Title}
        </h2>
      </Typography>
      {products?.length > 3 ? (
        <Slider {...homepageSettings} className="trendingitems">
          {products.map(
            (item) =>
              item.variants[0].availableForSale === true &&
              Number(item.variants[0].price) <= underThePrice.Price && (
                <Fragment>
                  <Item2 item={item} key={`${item.title}-${item.id}`} />
                </Fragment>
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
                item.variants[0].availableForSale === true &&
                Number(item.variants[0].price) <= 30 && (
                  <Fragment>
                    <Item2 item={item} key={`${item.title}-${item.id}`} />
                  </Fragment>
                )
              // <Fragment>
              //   <Item2 item={item} key={`${item.title}-${item.id}`} />
              // </Fragment>
            )}
          </Slider>
        </Box>
      )}
    </Fragment>
  );
}

export default BooksUnder;
