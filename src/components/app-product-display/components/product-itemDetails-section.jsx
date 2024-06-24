import { Box, Skeleton, Typography } from "@mui/material";

function ProductItemdetailsSection({ productData, tabView }) {
  const renderDetailRow = (key, value, index) => (
    <div key={index} style={detailRowStyle}>
      <Typography style={keyStyle}>{`${key}:`}</Typography>
      <Typography style={getValueStyle(tabView)}>{value}</Typography>
    </div>
  );

  const renderSkeletons = (count) =>
    Array.from({ length: count }, (_, index) => (
      <div key={index} style={detailRowStyle}>
        <Typography style={keyStyle}>
          <Skeleton variant="text" width="90%" />
        </Typography>
        <Typography style={valueStyle}>
          <Skeleton variant="text" width="90%" />
        </Typography>
      </div>
    ));

  return (
    <section style={sectionStyle(tabView)}>
      <Box>
        <Typography style={titleStyle}>Item Details</Typography>
      </Box>
      <Box>
        {productData?.data
          ? Object.entries(productData.itemDetails).map(([key, value], index) =>
              renderDetailRow(key, value, index)
            )
          : renderSkeletons(5)}
      </Box>
    </section>
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

const detailRowStyle = {
  display: "flex",
  flexDirection: "row",
  paddingBottom: "1rem",
  width: "100%",
  flexFlow: "row wrap",
  marginTop: "1rem",
  borderBottom: "1px solid rgba(0,0,0,0.1)",
};

const keyStyle = {
  fontFamily: "Satoshi, sans-serif",
  fontSize: "1rem",
  color: "#878787",
  paddingRight: "8px",
  width: "25%",
};

const valueStyle = {
  fontFamily: "Satoshi, sans-serif",
  fontSize: "1rem",
  lineHeight: 1.4,
  wordBreak: "break-word",
  color: "#212121",
  width: "75%",
};

const getValueStyle = (tabView) => ({
  ...valueStyle,
  textAlign: tabView ? "right" : "",
});

export default ProductItemdetailsSection;
