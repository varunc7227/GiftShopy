// Import necessary modules and components
import {
  Box,
  Button,
  Stepper,
  Step,
  StepLabel,
  Typography,
  Divider,
  Input,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Badge,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { encode as btoa } from "base-64";
import { useNavigate } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";
import useMediaQuery from "@mui/material/useMediaQuery";
import axios from "axios";
import DiscountIcon from "@mui/icons-material/Discount";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "../styles/checkout.css";
import { setPrice, setCode, setSuccess } from "../state";
import Shipping from "./Shipping";
import { shades } from "../theme";
import NavMenu from "../components/NavMenu";
import { ExpandMore, Height } from "@mui/icons-material";
import ProductDisplayCard from "../components/checkout-components/Product-display-card";
import {
  CalculationPanel,
  CheckoutLeftPanelHeader,
  CheckoutShippingDetails,
  DiscountPanel,
} from "../components/checkout-components";
import { ApiDataGetType } from "../api/Api";

// Define a styled component for flexible box layout
const FlexBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

// Define the Checkout component
const Checkout = ({ val }) => {
  // Select necessary Redux state variables
  const address = useSelector((state) => state.cart.address);
  const [checkoutDetails, setCheckoutDetails] = useState({
    firstName: "",
    lastName: "",
    country: "",
    city: "",
    address: "",
    province: "",
    zip: "",
    email: "",
  });
  const [validateCheckoutDetails, setValidateCheckoutDetails] = useState(false);
  const [shippingRateDetails, setShippingRateDetails] = useState({
    countries: [],
    shippingZoneRate: [],
  });

  useEffect(() => {
    Promise.all([getAllCountries(), getShippingBillingRatesByWeight()])
      .then(([countries, shippingZones]) => {
        setShippingRateDetails({
          ...shippingRateDetails,
          countries: countries,
          shippingZoneRate: shippingZones,
        });
      })
      .catch((error) => console.error("Error with fetching data:", error));
  }, []);

  useEffect(() => {
    setValidateCheckoutDetails(CheckoutDetailsValid());
  }, [checkoutDetails]);

  const price = useSelector((state) => state.cart.price);
  const isNonMobile = useMediaQuery("(min-width:800px)");
  const isNonMobile2 = useMediaQuery("(min-width:1000px)");
  const dispatch = useDispatch();
  const code = useSelector((state) => state.cart.code);
  const [coupan, setCoupan] = useState("");
  const [totalTax, setTotalTax] = useState(0.0);
  const [activeStep, setActiveStep] = useState(0);
  const cart = useSelector((state) => state.cart.cart);
  const success = useSelector((state) => state.cart.success);
  const isFirstStep = activeStep === 0;
  const navigate = useNavigate();
  const [orderId, setOrderId] = useState(false);
  const [cs, setCodeSuccess] = useState(true);
  const [error, setError] = useState("");
  const [pay, setPay] = useState(false);
  const [h, setH] = useState(true);
  const [isPaypalVisible, setIsPaypalVisible] = useState(true);
  const [type, setType] = useState(false);
  const directCoupon = useSelector((state) => state.cart.directCoupon);
  const couponName = useSelector((state) => state.cart.couponName);
  const [isDisablePayment, setIsDisablePayment] = useState(true);
  const breakPoint = useMediaQuery("(max-width:850px)");
  // Calculate the total price of the items in the cart
  let totalPrice = cart.reduce((total, item) => {
    return total + item.count * item.variants[0].price;
  }, 0);

  // Handle button click to show/hide PayPal payment options
  const handleButtonClick = () => {
    if (!success) {
      setIsPaypalVisible(!isPaypalVisible);
      dispatch(setSuccess(!success));
    }
  };

  // Handle button click for payment with discount
  const handleButtonsClick = () => {
    setType(true);
    if (!success) {
      setIsPaypalVisible(!isPaypalVisible);
      dispatch(setSuccess(!success));
    }
  };

  // Make payment when the 'pay' state is true
  useEffect(() => {
    if (pay) {
      makePayment(address);
    }
  }, [address, pay]);

  // This useEffect hook will run every time the component mounts
  // useEffect(() => {
  //   // Using the window.scrollTo method to scroll to the top of the page
  //   window.scrollTo(0, 0);
  // }, []); // The empty array means it will only run on mount and unmount

  // Check if the address is complete and enable/disable payment button accordingly
  // useEffect(() => {
  //   const isActive =
  //     address.email &&
  //     address.firstName &&
  //     address.lastName &&
  //     address.phoneNumber &&
  //     address.state;
  //   setIsDisablePayment(!isActive);
  // }, [address]);

  // Create an order for PayPal payment
  const createOrder = (data, actions) => {
    console.log(data, "Data");
    return actions.order
      .create({
        purchase_units: [
          {
            description: "",
            amount: {
              currency_code: "USD",
              value: data,
            },
          },
        ],
      })
      .then((orderId) => {
        console.log(orderId, "orderId");
        setOrderId(orderId);
        return orderId;
      });
  };

  // Handle form submission
  const handleFormSubmit = async (values, actions) => {
    setActiveStep(activeStep + 1);
    if (activeStep === 0) {
      // Additional logic for the first step of the form
    }

    // Copy billing address to shipping address if they are the same
    if (isFirstStep && values.shippingAddress.isSameAddress) {
      actions.setFieldValue("shippingAddress", {
        ...values.billingAddress,
        isSameAddress: true,
      });
    }
    console.log(values.shippingAddress, "shipping address");
    actions.setTouched({});
  };

  // Handle payment approval by PayPal
  const onApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      const { payer } = details;
      setPay(true);
    });
  };

  // Handle payment error by PayPal
  const onError = (data, actions) => {
    setError("An Error Occurred With Your Payment");
  };

  // Make the actual payment
  const makePayment = async (data) => {
    // Define the request body
    const requestBody = {
      order: {
        line_items: cart.map((item) => ({
          id: item.variants[0].id,
          title: item.title,
          price: item.variants[0].price,
          quantity: item.count,
          taxable: true,
        })),
        email: checkoutDetails.email,
        shipping_address: {
          first_name: checkoutDetails.firstName,
          last_name: checkoutDetails.lastName,
          address1: checkoutDetails.address,
          phone: "",
          city: checkoutDetails.city,
          province: checkoutDetails.province,
          country: checkoutDetails.country,
          zip: checkoutDetails.zip,
        },
        billing_address: {
          first_name: checkoutDetails.firstName,
          last_name: checkoutDetails.lastName,
          address1: checkoutDetails.address,
          phone: "",
          city: checkoutDetails.city,
          province: checkoutDetails.province,
          country: checkoutDetails.country,
          zip: checkoutDetails.zip,
        },
        total_tax: totalTax,
        tax_lines: [
          {
            price: totalTax,
            rate: totalTax / 100,
            title: "Shipping Charge",
          },
        ],
      },
    };
    const requestDataFormat = {
      body: JSON.stringify(requestBody),
    };
    console.log(requestBody);
    // Send the payment request to the server
    const response = await axios.post(
      "https://m48e2fta9d.execute-api.us-east-1.amazonaws.com/jkyogstage/orders",
      requestBody
    );
    // console.log(data.firstName, "address");
    // console.log(data.lastName, "search");
    console.log(JSON.parse(response.data.body), "data");
    setPay(false);
    const session = response.data;
    if (session.body) {
      navigate("/thank");
    }
  };

  // Apply coupon
  async function applyCoupon() {
    var headers = new Headers();
    headers.append(
      "Authorization",
      "Basic " +
        btoa(
          "ce9a3ad16708f3eb4795659e809971c4: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"
        )
    );

    const result = await fetch(
      "https://qc2n483pw9.execute-api.us-east-1.amazonaws.com/QA",
      {
        headers: headers,
      }
    );

    const itemJson = await result.json();
    const l = JSON.parse(itemJson.body);
    const title = l.price_rules.filter((i) => i.title === coupan);
    if (title.length > 0) {
      dispatch(setCode(true));
      setCodeSuccess(false);
      dispatch(setSuccess(!success));
      totalPrice = parseFloat(totalPrice - -title[0].value).toFixed(1);
      dispatch(setPrice(totalPrice));
      setH(false);
    } else {
      setCodeSuccess(false);
      setSuccess(true);
    }
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCheckoutDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const CheckoutDetailsValid = () => {
    return Object.values(checkoutDetails).every((value) => value !== "");
  };

  const getAllCountries = async () => {
    ApiDataGetType("/customer/get-all-country")
      .then((response) => {
        return response.data.countries;
      })
      .catch((error) => {
        console.error("Error fetching Countries:", error);
        return [];
      });
  };

  const getShippingBillingRatesByWeight = async () => {
    ApiDataGetType("/customer/get-shipping-zone")
      .then((response) => {
        return response.data.shipping_zones;
      })
      .catch((error) => {
        console.error("Error fetching shipping_zones:", error);
        return [];
      });
  };

  const updateTotalPriceOnShipmentCharge = (shippingRate) => {
    const calculateTotalPrice = cart.reduce((total, item) => {
      return total + item.count * item.variants[0].price;
    }, 0);
    const finalPrice = Number(calculateTotalPrice) + Number(shippingRate);
    totalPrice = finalPrice;
    setTotalTax(shippingRate);
  };

  // Render the Checkout component
  return (
    <>
      {breakPoint && (
        <section
          style={{
            display: "flex",
            flexDirection: "column",
            borderTop: "1px solid lightgrey",
            background: "#F5F5F5",
            padding: "1rem 5rem",
          }}
        >
          <Accordion sx={{ boxShadow: "none" }}>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              id="checkout-mobile-display-header"
              sx={{
                background: "#F5F5F5",
                boxShadow: "none",
              }}
            >
              <Typography
                style={{
                  fontFamily: "Satoshi, sans-serif",
                  fontSize: "1rem",
                  fontWeight: 400,
                  textAlign: "left",
                  color: "rgb(185,72,24)",
                }}
              >
                Show order summary
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                <div className="products-section">
                  {cart.map((product, index) => (
                    <ProductDisplayCard product={product} key={index} />
                  ))}
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.8rem",
                  }}
                >
                  <DiscountPanel
                    disabled={isDisablePayment}
                    setCoupan={setCoupan}
                  />
                  <CalculationPanel
                    totalPrice={totalPrice}
                    isDisable={!validateCheckoutDetails}
                    shippingRateDetails={shippingRateDetails}
                    product={cart}
                    updateTotalPrice={updateTotalPriceOnShipmentCharge}
                  />
                </div>
              </Box>
            </AccordionDetails>
          </Accordion>
        </section>
      )}

      <Box p={breakPoint ? "0" : "2rem 0rem"}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <section
            style={{
              width: breakPoint ? "100%" : "55%",
              display: "flex",
              flexDirection: "column",
              borderRight: "0.5px solid lightgrey",
              borderTop: "1px solid lightgrey",
              padding: breakPoint ? "2rem 5rem" : "1.8rem 1.8rem 1.8rem 15%",
              gap: "1.5rem",
            }}
          >
            <CheckoutLeftPanelHeader
              price={price}
              createOrder={createOrder}
              onApprove={onApprove}
              onError={onError}
              isDisable={!validateCheckoutDetails}
            />
            <CheckoutShippingDetails
              price={price}
              createOrder={createOrder}
              onApprove={onApprove}
              onError={onError}
              checkoutDetails={checkoutDetails}
              setCheckoutDetails={handleInputChange}
              isDisable={!validateCheckoutDetails}
              shippingRateDetails={shippingRateDetails}
            />
          </section>

          {!breakPoint && (
            <section
              style={{
                width: "45%",
                display: "flex",
                flexDirection: "column",
                borderTop: "1px solid lightgrey",
                background: "#F5F5F5",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "1rem 20% 1rem 2rem",
                  minHeight: "20rem",
                  gap: "1rem",
                }}
              >
                <div
                  className="products-section"
                  style={{
                    maxHeight: "45vh",
                    overflow: "scroll",
                    scrollBehavior: "smooth",
                  }}
                >
                  {cart.map((product, index) => (
                    <ProductDisplayCard product={product} key={index} />
                  ))}
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.8rem",
                  }}
                >
                  <DiscountPanel coupan={coupan} setCoupan={setCoupan} />
                  <CalculationPanel
                    totalPrice={totalPrice}
                    isDisable={!validateCheckoutDetails}
                    shippingRateDetails={shippingRateDetails}
                    product={cart}
                    updateTotalPrice={updateTotalPriceOnShipmentCharge}
                  />
                </div>
              </Box>
            </section>
          )}
        </div>
      </Box>
    </>
  );
};

export default Checkout;
