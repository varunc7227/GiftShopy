import {
  Box,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  FormGroup,
  Checkbox,
} from "@mui/material";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

function CheckoutShippingDetails({
  price,
  createOrder,
  onApprove,
  onError,
  checkoutDetails,
  setCheckoutDetails,
  isDisable,
  shippingRateDetails,
}) {
  const selectedCountry = shippingRateDetails.countries.find(
    (country) => country.code === checkoutDetails.country
  );
  const states = selectedCountry ? selectedCountry.provinces : [];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography
          sx={{
            textAlign: "left",
            fontFamily: "Satoshi, sans-serif",
            lineHeight: 1.2,
            color: "#000",
            fontSize: "1.7rem",
            fontWeight: "700",
          }}
        >
          Contact
        </Typography>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={checkoutDetails.email}
          onChange={setCheckoutDetails}
          style={{
            marginTop: "0.7rem",
            padding: "0.8rem",
            border: "1px solid lightgray",
            borderRadius: "0.5rem",
            fontSize: "0.9rem",
            fontFamily: "Satoshi, sans-serif",
          }}
        />
        <FormGroup>
          <FormControlLabel
            control={<Checkbox color="secondary" />}
            label="Email me with news and offers"
            sx={{
              fontSize: "0.9rem",
              letterSpacing: "0.5px",
              fontFamily: "Satoshi, sans-serif",
            }}
          />
        </FormGroup>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", flexWrap: "wrap" }}>
        <Typography
          mt="1rem"
          sx={{
            textAlign: "left",
            fontFamily: "Satoshi, sans-serif",
            lineHeight: 1.2,
            color: "#000",
            fontSize: "1.7rem",
            fontWeight: "700",
          }}
        >
          Delivery
        </Typography>
        <FormControl variant="standard" sx={{ padding: "0.7rem 0" }}>
          <InputLabel
            id="checkout-country-region"
            sx={{
              margin: "0.5rem 0 0 0.9rem",
              fontSize: "0.9rem",
              color: "#A9A3B2",
              fontFamily: "Satoshi, sans-serif",
            }}
          >
            Country/Region
          </InputLabel>
          <Select
            labelId="checkout-country-region"
            id="demo-simple-select-standard"
            name="country"
            value={checkoutDetails.country}
            onChange={setCheckoutDetails}
            label="Country/Region"
            variant="outlined"
            sx={{ borderRadius: "0.5rem", borderColor: "lightgray" }}
          >
            {shippingRateDetails.countries.length > 0 &&
              shippingRateDetails.countries.map(
                (country, index) =>
                  country.code !== "*" && (
                    <MenuItem key={index} value={country.code}>
                      {country.name}
                    </MenuItem>
                  )
              )}
          </Select>
        </FormControl>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "0.5rem",
            flexWrap: "wrap",
          }}
        >
          <input
            type="text"
            placeholder="First Name"
            name="firstName"
            value={checkoutDetails.firstName}
            onChange={setCheckoutDetails}
            style={{
              // marginTop: "0.7rem",
              padding: "0.8rem",
              border: "1px solid lightgray",
              borderRadius: "0.5rem",
              fontSize: "0.9rem",
              fontFamily: "Satoshi, sans-serif",
              flex: 1,
            }}
          />
          <input
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={checkoutDetails.lastName}
            onChange={setCheckoutDetails}
            style={{
              // marginTop: "0.7rem",
              padding: "0.8rem",
              border: "1px solid lightgray",
              borderRadius: "0.5rem",
              fontSize: "0.9rem",
              fontFamily: "Satoshi, sans-serif",
              flex: 1,
            }}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <input
            type="text"
            name="address"
            value={checkoutDetails.address}
            onChange={setCheckoutDetails}
            placeholder="Address"
            style={{
              marginTop: "0.7rem",
              padding: "0.8rem",
              border: "1px solid lightgray",
              borderRadius: "0.5rem",
              fontSize: "0.9rem",
              fontFamily: "Satoshi, sans-serif",
              flex: 1,
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "0.5rem",
            marginTop: "0.7rem",
            flexWrap: "wrap",
          }}
        >
          <input
            type="text"
            placeholder="City"
            name="city"
            value={checkoutDetails.city}
            onChange={setCheckoutDetails}
            style={{
              // marginTop: "0.7rem",
              padding: "0.8rem",
              border: "1px solid lightgray",
              borderRadius: "0.5rem",
              fontSize: "0.9rem",
              fontFamily: "Satoshi, sans-serif",
              flex: 1,
            }}
          />
          <FormControl variant="standard" sx={provinceStyle}>
            <InputLabel
              id="checkout-state"
              sx={{
                margin: "-0.2rem 0 0 0.9rem",
                fontSize: "0.9rem",
                color: "#A9A3B2",
                fontFamily: "Satoshi, sans-serif",
                // flex: 1
              }}
            >
              State
            </InputLabel>
            <Select
              labelId="checkout-state"
              label="State"
              variant="outlined"
              name="province"
              value={checkoutDetails.province}
              onChange={setCheckoutDetails}
              sx={{
                borderRadius: "0.5rem",
                borderColor: "lightgray",
                // flex: 1,
              }}
            >
              {states.length > 0 &&
                states.map((state, index) => (
                  <MenuItem key={index} value={state.code}>
                    {state.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <input
            type="number"
            placeholder="Zip Code"
            name="zip"
            value={checkoutDetails.zip}
            onChange={setCheckoutDetails}
            style={{
              // marginTop: "0.7rem",
              padding: "0.8rem",
              border: "1px solid lightgray",
              borderRadius: "0.5rem",
              fontSize: "0.9rem",
              fontFamily: "Satoshi, sans-serif",
              flex: 1,
            }}
          />
        </div>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox color="secondary" />}
            label="Save this information for next time"
            sx={{
              fontSize: "0.9rem",
              letterSpacing: "0.5px",
              fontFamily: "Satoshi, sans-serif",
            }}
          />
        </FormGroup>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          overflow: "hidden",
          willChange: "height",
        }}
      >
        <Typography
          mt="0.5rem"
          sx={{
            textAlign: "left",
            fontFamily: "Satoshi, sans-serif",
            lineHeight: 1.2,
            color: "#000",
            fontSize: "1.7rem",
            fontWeight: "700",
          }}
        >
          Shipping method
        </Typography>
        <Typography
          sx={{
            background: "#F5F5F5",
            padding: "1.5rem",
            borderRadius: "0.5rem",
            fontSize: "0.9rem",
            textAlign: "left",
            fontFamily: "Satoshi, sans-serif",
            color: "#707070",
          }}
        >
          Enter your shipping address to view available shipping methods.
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          overflow: "hidden",
          willChange: "height",
        }}
      >
        <Typography
          mt="0.5rem"
          sx={{
            textAlign: "left",
            fontFamily: "Satoshi, sans-serif",
            lineHeight: 1.2,
            color: "#000",
            fontSize: "1.7rem",
            fontWeight: "700",
          }}
        >
          Payment
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
                layout: "vertical",
                color: "blue",
                tagline: false,
              }}
              // disableMaxWidth={true}
              createOrder={(data, actions) => createOrder(price, actions)}
              onApprove={(data, actions) => onApprove(data, actions)}
              onError={(error) => onError(error)}
            />
          </PayPalScriptProvider>
        </div>
      </Box>
    </div>
  );
}

const provinceStyle = {
  flex: "1 1 10%",
  "@media not all and (min-resolution:.001dpcm)": {
    flex: "1 1 0",
  },
};

export default CheckoutShippingDetails;
