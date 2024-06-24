import { Box, Typography } from "@mui/material";
import { useEffect, useMemo } from "react";

function CalculationPanel({
  totalPrice,
  isDisable,
  shippingRateDetails,
  product,
  updateTotalPrice,
}) {
  const weightBasedShippingRates =
    shippingRateDetails?.shippingZoneRate[0]?.weight_based_shipping_rates;

  const totalWeight = useMemo(
    () =>
      product?.reduce(
        (sum, item) => sum + item.variants[0].weight * item.count,
        0
      ),
    [product]
  );
  const shippingRate = useMemo(() => {
    const applicableRate = weightBasedShippingRates?.find(
      (rate) =>
        totalWeight >= rate.weight_low &&
        (totalWeight <= rate.weight_high || rate.weight_high === null)
    );
    return applicableRate ? parseFloat(applicableRate.price).toFixed(2) : 0;
  }, [totalWeight, weightBasedShippingRates]);

  const finalPrice = useMemo(
    () =>
      isDisable
        ? totalPrice
        : (Number(totalPrice) + Number(shippingRate)).toFixed(2),
    [isDisable, totalPrice, shippingRate]
  );

  useEffect(() => {
    if (!isDisable) {
      updateTotalPrice(finalPrice);
    }
  }, [finalPrice, isDisable, updateTotalPrice]);

  return (
    <Box sx={panelStyle}>
      <Row title="Subtotal" value={`$ ${totalPrice}`} />
      <Row
        title="Shipping"
        value={isDisable ? "Enter Shipping Address" : `$${shippingRate}`}
      />
      <Row title="Total" value={`$ ${finalPrice}`} fontWeight={700} />
    </Box>
  );
}

const Row = ({ title, value, fontWeight = 400 }) => (
  <div style={rowStyle}>
    <Typography sx={{ ...textStyle, fontWeight: fontWeight }}>
      {title}
    </Typography>
    <Typography sx={{ ...textStyle, fontWeight: fontWeight }}>
      {value}
    </Typography>
  </div>
);

/**
 * @Styles
 */
const panelStyle = { display: "flex", flexDirection: "column", gap: "0.6rem" };

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

export default CalculationPanel;
