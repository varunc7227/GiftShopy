import { Typography, useMediaQuery } from "@mui/material";
import Slider from "react-slick";
import Item2 from "../../Item2";
import { getData } from "../../../api/Api";
import { useEffect, useState } from "react";
import { homepageSettings } from "../../../utils/slickSettings";

function TrendingItems({ products }) {
  const isMobile = useMediaQuery("(max-width:750px)");
  const [trendingItem, setTrendingItem] = useState([]);

  useEffect(() => {
    getData("/api/gift-shop-home-trending-item?populate=*")
      .then((response) => setTrendingItem(response?.data))
      .catch((error) => console.error("Error fetching trendingItems:", error));
  }, []);

  return (
    <div>
      <Typography
        fontFamily={"Montagu Slab"}
        variant={isMobile ? "h2" : "h1"}
        textAlign="left"
        marginTop="1rem"
      >
        <h2 className="trending" style={{ fontFamily: "Satoshi, sans-serif" }}>
          TRENDING ITEMS
        </h2>
      </Typography>
      {products?.length > 0 && (
        <Slider {...homepageSettings} className="trendingitems">
          {products.map(
            (item) =>
              item.variants[0].availableForSale === true && (
                <Item2 item={item} key={`${item.title}-${item.id}`} />
              )
          )}
        </Slider>
      )}
    </div>
  );
}

export default TrendingItems;
