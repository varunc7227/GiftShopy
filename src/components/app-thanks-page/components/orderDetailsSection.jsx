import { DownloadDone } from "@mui/icons-material";
import { Box, Skeleton, Typography } from "@mui/material";

function OrderDetailsSection({ orderDetails, breakPointXs }) {
  return (
    <Box sx={orderDetailSectionWrap}>
      <Typography sx={orderDetailSectionTitle}>JKYogGiftshop</Typography>
      <Box sx={orderDetailSectionContentWrap}>
        <DownloadDone sx={checkedSuccessIcon} />
        <Box sx={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
          <Typography
            sx={{
              ...commonTypographyStyle,
              fontSize: "0.95rem",
              color: "#707070",
            }}
          >
            {orderDetails !== null ? (
              "Order " + orderDetails.name
            ) : (
              <Skeleton variant="text" width="15rem" />
            )}
          </Typography>
          <Typography
            sx={{
              ...commonTypographyStyle,
              fontSize: "1.5rem",
              fontWeight: "400",
            }}
          >
            {orderDetails !== null ? (
              "Thank you, " + orderDetails.billing_address.first_name + "!"
            ) : (
              <Skeleton variant="text" width="15rem" />
            )}
          </Typography>
        </Box>
      </Box>
      <Box sx={orderDataComponentWrap}>
        <Typography
          sx={{
            ...commonTypographyStyle,
            fontSize: "1.2rem",
            fontWeight: "400",
          }}
        >
          Order details
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: breakPointXs ? "column" : "row",
          }}
        >
          <Box sx={orderDataWrap(breakPointXs)}>
            <DetailSection
              title="Contact information"
              content={
                orderDetails !== null ? orderDetails.contact_email : null
              }
            />
            <DetailSection
              title="Shipping address"
              content={
                orderDetails !== null ? orderDetails.shipping_address : null
              }
            />
            <DetailSection
              title="Shipping method"
              content={
                orderDetails !== null
                  ? orderDetails.shipping_lines[0].code
                  : null
              }
            />
          </Box>
          <Box sx={orderDataWrap(breakPointXs)}>
            <DetailSection
              title="Confirmation Number"
              content={
                orderDetails !== null ? orderDetails.confirmation_number : null
              }
            />
            <DetailSection
              title="Billing address"
              content={
                orderDetails !== null ? orderDetails.billing_address : null
              }
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

const DetailSection = ({ title, content }) => (
  <Box sx={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
    <Typography sx={detailSectionTitle}>{title}</Typography>
    {content ? (
      typeof content === "object" &&
      (title === "Shipping address" || title === "Billing address") ? (
        <Typography sx={detailSectionContent}>
          {content.first_name}
          <br />
          {content.address1}
          <br />
          {`${content.city} ${content.province_code} ${content.zip}`}
          <br />
          {content.country}
        </Typography>
      ) : (
        <Typography sx={detailSectionContent}>{content}</Typography>
      )
    ) : (
      <Skeleton variant="text" width="15rem" />
    )}
  </Box>
);

/**
 * @Styles
 */
const commonTypographyStyle = {
  textAlign: "left",
  fontFamily: "Satoshi, sans-serif",
  lineHeight: 1.2,
  color: "#000",
  fontSize: "0.9rem",
};

const orderDataWrap = (breakPointXs) => {
  return {
    display: "flex",
    flexDirection: "column",
    width: breakPointXs ? "100%" : "50%",
    gap: "1rem",
    marginTop: breakPointXs ? "1rem" : "",
  };
};

const checkedSuccessIcon = {
  mt: 0,
  border: 3,
  borderRadius: "3rem",
  p: "0.5rem",
  width: "3em",
  height: "3em",
  color: "yellowgreen",
};

const orderDataComponentWrap = {
  display: "flex",
  flexDirection: "column",
  p: "1rem",
  borderRadius: "1rem",
  border: 1,
  borderColor: "darkgrey",
  gap: "1.5rem",
};

const detailSectionTitle = {
  ...commonTypographyStyle,
  fontWeight: "700",
};

const detailSectionContent = {
  ...commonTypographyStyle,
  fontWeight: "400",
  letterSpacing: "0.5px",
};

const orderDetailSectionWrap = {
  display: "flex",
  flexDirection: "column",
  gap: "2rem",
};

const orderDetailSectionTitle = {
  ...commonTypographyStyle,
  fontSize: "1.9rem",
  fontWeight: "400",
};

const orderDetailSectionContentWrap = {
  display: "flex",
  flexDirection: "row",
  gap: "1rem",
};
export default OrderDetailsSection;
