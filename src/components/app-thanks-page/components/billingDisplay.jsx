import { Box, Divider, Skeleton, Typography } from "@mui/material";
import { useEffect, useMemo } from "react";

function ThanksBillingDisplay({ orderDetails }) {
  return (
    <Box sx={panelStyle}>
      <Divider sx={dividerTop} />
      <Row
        title="Subtotal"
        value={
          orderDetails === null
            ? null
            : "$" + orderDetails.current_subtotal_price
        }
      />
      <Row
        title="Shipping"
        value={
          orderDetails === null
            ? null
            : "$" +
              orderDetails.total_shipping_price_set.presentment_money.amount
        }
      />
      <Divider sx={dividerBottom} />
      <Row
        title="Total"
        value={
          orderDetails === null ? null : "$" + orderDetails.current_total_price
        }
        fontWeight={700}
      />
    </Box>
  );
}

const Row = ({ title, value, fontWeight = 400 }) => (
  <div style={rowStyle}>
    <Typography sx={{ ...textStyle, fontWeight: fontWeight }}>
      {title}
    </Typography>
    <Typography sx={{ ...textStyle, fontWeight: fontWeight }}>
      {value !== null ? value : <Skeleton width={100}/>}
    </Typography>
  </div>
);

/**
 * @Styles
 */
const panelStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "0.6rem",
};

const textStyle = {
  fontSize: "1rem",
  fontFamily: "Satoshi, sans-serif",
  color: "black",
};

const rowStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
};

const dividerTop = {
  borderTop: "1px solid slategrey",
  paddingBottom: "1rem",
};

const dividerBottom = {
  borderBottom: "1px solid slategrey",
  paddingTop: "1rem",
};
export default ThanksBillingDisplay;
