import { Typography } from "@mui/material";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

function CheckoutLeftPanelHeader({
  price,
  createOrder,
  onApprove,
  onError,
  isDisable
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.6rem",
      }}
    >
      <Typography
        color="#707070"
        textAlign="center"
        fontFamily="Satoshi, sans-serif"
        fontSize="0.95rem"
      >
        Express checkout
      </Typography>
      <div className="payPalButtons">
        <PayPalScriptProvider
          options={{
            "client-id":
              "AYQ5fCEYi8xgTe5wBLDbv4Ttv5f1UptJSoO2h_VtJYFiw8gduAz_A0KfpkcdWERq6qwORcPKY_7g5jD8",
          }}
        >
          <PayPalButtons
            disabled={isDisable}
            style={{
              layout: "horizontal",
              color: "gold",
              tagline: false,
            }}
            // disableMaxWidth={true}
            createOrder={(data, actions) => createOrder(price, actions)}
            onApprove={(data, actions) => onApprove(data, actions)}
            onError={(error) => onError(error)}
          />
        </PayPalScriptProvider>
      </div>
      <Typography
        color="#707070"
        textAlign="center"
        fontFamily="Satoshi, sans-serif"
        fontSize="0.95rem"
        display="flex"
        justifyContent="space-between"
      >
        <span
          style={{
            borderTop: "1px solid lightgrey",
            width: "45%",
            marginTop: "10px",
          }}
        ></span>
        OR
        <span
          style={{
            borderTop: "1px solid lightgrey",
            width: "45%",
            marginTop: "10px",
          }}
        ></span>
      </Typography>
    </div>
  );
}

export default CheckoutLeftPanelHeader;
