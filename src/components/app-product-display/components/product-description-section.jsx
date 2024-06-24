import { Box, Skeleton, Typography } from "@mui/material";

function ProductDescriptionSection({ productData, tabView, loading }) {
  const extractText = (htmlString) => {
    const span = document.createElement("span");
    span.innerHTML = htmlString;
    return span.textContent || span.innerText || "";
  };

  return (
    !loading &&
    productData?.data?.body_html && (
      <section style={sectionStyle(tabView)}>
        <Box>
          <Typography style={titleStyle}>Description</Typography>
        </Box>
        <Box sx={{ width: "100%" }}>
          <Typography style={descriptionStyle}>
            {productData?.data?.body_html
              ? extractText(productData.data.body_html)
              : renderSkeletons(5)}
          </Typography>
        </Box>
      </section>
    )
  );
}

/**
 * @Styles
 */
const sectionStyle = (tabView) => ({
  display: "flex",
  flexDirection: "column",
  padding: tabView ? "1rem 1.5rem" : "1rem 5rem",
  gap: "1.5rem",
});

const titleStyle = {
  fontFamily: "Satoshi, sans-serif",
  fontSize: "2rem",
  fontWeight: 800,
};

const descriptionStyle = {
  fontFamily: "Satoshi, sans-serif",
  fontSize: "1.1rem",
  fontWeight: 400,
  color: "dimgrey",
  letterSpacing: "0.5px",
  lineHeight: "30px",
};

const renderSkeletons = (count) =>
  Array.from({ length: count }, (_, index) => (
    <Skeleton key={index} variant="text" width="100%" />
  ));

export default ProductDescriptionSection;
