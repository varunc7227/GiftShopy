import { Fragment, useEffect, useState } from "react";
import { Box, Skeleton, useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";
import { getData } from "../../../api/Api";

function SingleBanner() {
  const isMobile = useMediaQuery("(max-width:750px)");
  const [singleBanner, setSingleBanner] = useState(null);

  useEffect(() => {
    getData("/api/homepage-banner?populate=*")
      .then((response) => setSingleBanner(response?.data.attributes))
      .catch((error) => console.error("Error fetching singleBanner:", error));
  }, []);

  return (
    <Fragment>
      {singleBanner !== null ? (
        <Link to={singleBanner?.link}>
          <Box>
            <img
              className="carousel-img"
              src={singleBanner?.imgUrl?.data.attributes.url}
              alt="none"
              style={singleBannerStyle(isMobile)}
              loading="lazy"
            />
          </Box>
        </Link>
      ) : (
        <Skeleton
          variant="rectangular"
          sx={{ width: "100%", height: "35vh" }}
          animation="wave"
        />
      )}
    </Fragment>
  );
}

/**
 * @Styles
 */
const singleBannerStyle = (breakPoint) => ({
  width: breakPoint ? "" : "100%",
  height: breakPoint ? "" : "34vh",
  marginTop: breakPoint ? "" : "4.1rem",
  objectFit: breakPoint ? "cover" : "cover",
  backgroundAttachment: "fixed",
});

export default SingleBanner;
