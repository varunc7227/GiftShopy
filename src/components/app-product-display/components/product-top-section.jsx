import { Box, Typography, Button, Skeleton, IconButton } from "@mui/material";
import { useMemo, useRef, useState } from "react";
import { addToCart, decreaseCount, increaseCount } from "../../../state";
import { enqueueSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { Add, Remove } from "@mui/icons-material";

function ProductTopSection({ productData, tabView, setProductData, loading }) {
  const zoomRef = useRef(null);
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [uiState, setUiState] = useState({
    zoomed: false,
    cursorPos: { x: 0, y: 0 },
    rating: 0,
    hover: 0,
  });

  const cursorStyle = useMemo(
    () => ({
      position: "absolute",
      pointerEvents: "none",
      left: uiState.cursorPos.x,
      top: uiState.cursorPos.y,
      width: "8rem",
      height: "9rem",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#e5e5f7",
      opacity: 0.5,
      backgroundImage:
        "repeating-linear-gradient(45deg, #444cf7 25%, transparent 25%, transparent 75%, #444cf7 75%, #444cf7), repeating-linear-gradient(45deg, #444cf7 25%, #e5e5f7 25%, #e5e5f7 75%, #444cf7 75%, #444cf7)",
      backgroundSize: "5px 5px",
    }),
    [uiState.cursorPos]
  );

  const handleZoomDisplay = (e) => {
    if (!zoomRef.current) return;

    const { top, left, width, height } = e.target.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;

    setUiState((prevState) => ({
      ...prevState,
      cursorPos: { x: e.clientX, y: e.clientY },
    }));
    zoomRef.current.style.backgroundPosition = `${x}% ${y}%`;
  };
  const addtocart = () => {
    if (!productData || !productData.data) return;
    dispatch(addToCart({ item: { ...productData.data, count } }));
    enqueueSnackbar("Added to Cart!");
  };

  const renderImageGallery = () => {
    return (
      productData?.data?.images?.map((item, index) => (
        <Box
          key={index}
          onClick={() =>
            setProductData({ ...productData, displayImage: item.src })
          }
          sx={imageBoxStyle}
        >
          <img
            style={{ objectFit: "fill", height: "70px" }}
            src={item.src}
            alt={`product-img-${index}`}
            loading="lazy"
          />
        </Box>
      )) || renderSkeletons(5)
    );
  };

  const renderSkeletons = (count) =>
    Array.from({ length: count }).map((_, index) => (
      <Skeleton key={index} variant="rectangular" width="100%" height="70px" />
    ));

  const toggleZoom = (zoomIn) => {
    setUiState((prevState) => ({
      ...prevState,
      zoomed: zoomIn,
    }));
  };

  const handleDispatch = (id, type) => {

  };

  return (
    <section style={sectionStyle(tabView)}>
      <div style={imageGalleryStyle(tabView)}>{renderImageGallery()}</div>
      <div style={mainImageBoxStyle(tabView)}>
        <Box sx={mainImageStyle}>
          {!loading ? (
            <img
              onMouseEnter={() => toggleZoom(true)}
              onMouseLeave={() => toggleZoom(false)}
              onMouseMove={handleZoomDisplay}
              alt="Product"
              style={imageStyle}
              src={productData.data !== null && productData.displayImage}
            />
          ) : (
            <Skeleton variant="rectangular" width="100%" height="100%" />
          )}
        </Box>
      </div>
      {productData.data !== null && uiState.zoomed && (
        <div
          ref={zoomRef}
          style={zoomBoxStyle(tabView, productData?.displayImage)}
        />
      )}
      {uiState.zoomed && <div style={cursorStyle} />}
      <ProductInfoSection
        productData={productData}
        tabView={tabView}
        onAddToCart={addtocart}
        uiState={uiState}
        loading={loading}
        handleDispatch={handleDispatch}
      />
    </section>
  );
}

function ProductInfoSection({
  productData,
  tabView,
  onAddToCart,
  uiState,
  loading,
  handleDispatch,
}) {
  return (
    <div style={infoSectionStyle(tabView)}>
      <Box sx={infoSectionWrapper}>
        <Typography style={infoSectionProductTitle}>
          {!loading ? (
            productData?.data?.title
          ) : (
            <Skeleton variant="text" width="100%" />
          )}
        </Typography>
        {/* <div style={infoSectionRatingWrapper}>
          {!loading ? (
            <Box sx={infoSectionRatingMain(tabView)}>
              {[...Array(5)].map((star, index) => {
                index += 1;
                return (
                  <button
                    type="button"
                    key={index}
                    style={{
                      color:
                        index <= (uiState.hover || uiState.rating)
                          ? "#ccc"
                          : "#F5961D",
                    }}
                    // onClick={() => setRating(index)}
                    // onMouseEnter={() => setHover(index)}
                    // onMouseLeave={() => setHover(uiState.rating)}
                  >
                    <span className="star">&#9733;</span>
                  </button>
                );
              })}
            </Box>
          ) : (
            <Skeleton variant="text" width="100%" />
          )}
          <Box sx={infoSectionRatingTextWrapper}>
            <Typography sx={infoSectionRatingText(tabView)}>
              {!loading ? 5.0 : <Skeleton variant="text" width="100%" />}
            </Typography>
            <Typography sx={infoSectionStar(tabView)}>
              {!loading ? (
                "(78 Reviews)"
              ) : (
                <Skeleton variant="text" width="100%" />
              )}
            </Typography>
          </Box>
        </div> */}

        <Box>
          <Typography sx={infoSectionSubtitle}>
            {!loading ? (
              "$ " + parseFloat(productData?.data?.variants[0].price).toFixed(2)
            ) : (
              <Skeleton variant="text" width="20%" />
            )}
          </Typography>
        </Box>

        <Box sx={{ padding: "1rem 0" }}>
          <Button
            disabled={
              productData.data === null ||
              !productData.data.variants[0].availableForSale
            }
            variant="contained"
            sx={addToCartButton(tabView)}
            onClick={onAddToCart}
          >
            {!productData.data?.variants[0].availableForSale
              ? "Out Of Stock"
              : "Add to Cart"}
          </Button>
          {/* <Box
            display="flex"
            alignItems="center"
            border="1.5px solid #4d4d4d"
          >
            <IconButton
              onClick={() => handleDispatch(productData.data.id, "decrease")}
            >
              <Remove />
            </IconButton>
            <Typography>0</Typography>
            <IconButton
              onClick={() => handleDispatch(productData.data.id, "increase")}
            >
              <Add />
            </IconButton>
          </Box> */}
        </Box>
      </Box>
    </div>
  );
}

/**
 * @Styles
 */
const imageBoxStyle = {
  cursor: "pointer",
  boxShadow: "0.6px 1.3px 1.3px hsl(0deg 0% 0% / 0.48)",
  border: "1px solid white",
  "&:hover": { border: "2px solid orange" },
};
const mainImageStyle = {
  height: "inherit",
  background: "#F6F6F6",
  "&:hover": {
    cursor: "crosshair",
  },
};
const sectionStyle = (tabView) => ({
  display: "flex",
  flexDirection: "row",
  padding: "1.5rem",
  gap: "0.7rem",
  flexWrap: tabView ? "wrap" : "",
});
const imageGalleryStyle = (tabView) => ({
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
  height: tabView ? "300px" : "450px",
  width: tabView ? "10%" : "5%",
  position: "relative",
  overflow: "scroll",
  paddingRight: "0.2rem",
  flexWrap: "wrap",
});
const mainImageBoxStyle = (tabView) => ({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  height: tabView ? "300px" : "450px",
  width: tabView ? "80%" : "40%",
  border: "1px solid #f0f0f0",
  boxShadow:
    "rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em",
  boxSizing: "content-box",
  flexWrap: "wrap",
});
const imageStyle = { objectFit: "contain", height: "inherit", width: "100%" };
const zoomBoxStyle = (tabView, displayImage) => ({
  position: "absolute",
  border: "1px solid grey",
  marginTop: tabView ? "20rem" : "",
  width: tabView ? "90%" : "51%",
  height: tabView ? "300px" : "600px",
  overflow: "hidden",
  right: "2rem",
  zIndex: 1,
  backgroundImage: `url(${displayImage})`,
  backgroundRepeat: "no-repeat",
  backgroundColor: "#fff",
  boxShadow:
    "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
});

const infoSectionStyle = (tabView) => ({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  height: tabView ? "auto" : "450px",
  width: tabView ? "100%" : "55%",
  flexWrap: "wrap",
});
const infoSectionWrapper = {
  padding: "2rem",
  height: "100%",
  gap: "1rem",
};
const infoSectionProductTitle = {
  fontFamily: "Satoshi, sans-serif",
  fontSize: "1.7rem",
  fontWeight: 600,
};
const infoSectionRatingWrapper = {
  display: "flex",
  flexDirection: "row",
  width: "100%",
  fontSize: "2.5rem",
  gap: "1rem",
};
const infoSectionRatingMain = (tabView) => ({
  display: "flex",
  fontSize: tabView ? "1.5rem" : "2.5rem",
});
const infoSectionRatingTextWrapper = {
  display: "flex",
  flexDirection: "row",
  gap: "0.6rem",
};

const infoSectionRatingText = (tabView) => ({
  fontFamily: "Satoshi, sans-serif",
  fontSize: tabView ? "1rem" : "1.5rem",
  fontWeight: 500,
  paddingTop: "0.8rem",
});

const infoSectionStar = (tabView) => ({
  fontFamily: "Satoshi, sans-serif",
  fontSize: tabView ? "0.8rem" : "1rem",
  fontWeight: 500,
  paddingTop: tabView ? "0.9rem" : "1.1rem",
  textDecoration: "underline",
  cursor: "pointer",
  "&:hover": {
    color: "blue",
  },
});

const infoSectionSubtitle = {
  fontFamily: "Satoshi, sans-serif",
  fontSize: "1.7rem",
  fontWeight: 500,
};
const addToCartButton = (tabView) => ({
  backgroundColor: "#F28C28",
  fontSize: "1.2rem",
  borderRadius: "2rem",
  padding: tabView ? "0.3rem 2.125rem" : "0.3rem 3.125rem",
});

export default ProductTopSection;
