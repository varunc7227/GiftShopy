// Import statements for dependencies and components
import "../styles/style.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ReactJsAlert from "reactjs-alert";
import {
  Typography,
  Button,
  Box,
  Divider,
  CircularProgress,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

import {
  setPrice,
  setCode,
  setSuccess,
  setDirectCoupon,
  setCouponName,
} from "../state";
import NavMenu from "../components/NavMenu";

import truck from "../assets/logo/truck.png";
import premium from "../assets/logo/premium.png";
import offer from "../assets/logo/offer.png";
import { fetchDataFromApi } from "../utils/api";

// Ticket component definition
const Ticket = () => {
  // Redux store state and dispatch
  const dispatch = useDispatch();
  const [coupon, setCoupon] = useState([]);
  const cart = useSelector((state) => state.cart.cart);
  const price = useSelector((state) => state.cart.price);
  const success = useSelector((state) => state.cart.success);
  const [csuccess, setCSuccess] = useState(success ? false : true);
  const directCoupon = useSelector((state) => state.cart.directCoupon);
  const [add, setAdd] = useState(false);
  const breakPoint = useMediaQuery("(max-width:768px)");
  const [status, setStatus] = useState(false);
  const [type, setType] = useState("");
  const [title, setTitle] = useState("");
  const [coupen, setCoupen] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // This useEffect hook will run every time the component mounts
  useEffect(() => {
    // Using the window.scrollTo method to scroll to the top of the page
    window.scrollTo(0, 0);
  }, []); // The empty array means it will only run on mount and unmount

  // Fetch coupon data from an external API on component mount
  useEffect(() => {
    applycoupan();
  }, []);

  async function applycoupan() {
    setLoading(true);
    var headers = new Headers();
    headers.append(
      "Authorization",
      "Basic " +
        btoa(
          "961d0f182b31ae37dc63e644d4178641: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"
        )
    );
    try {
      const result = await fetch(
        "https://qc2n483pw9.execute-api.us-east-1.amazonaws.com/QA",
        {
          headers: headers,
        }
      );
      const item = await result.json();
      const coupan = JSON.parse(item.body);
      console.log(coupan, "coupon");
      setCoupon(coupan?.price_rules);
    } catch (error) {
      console.log(error, "from coupan");
    } finally {
      setLoading(false);
    }
    // if(result){
    //   const itemJson = await result.json();
    //   const l = JSON.parse(itemJson?.body);
    //   setCoupon(l?.price_rules);
    // }
  }

  // Styles for components
  const style = {
    box: {
      height: "auto",
      textAlign: "center",
      width: breakPoint ? "100%" : "75%",
      padding: "3rem",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      // border: "1px solid white",
      minHeight: "13rem",
      borderRadius: "1rem",
      background: "#367f8c",
      boxShadow:
        "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
    },
    box2: {
      height: "auto",
      textAlign: "center",
      width: breakPoint ? "100%" : "75%",
      padding: breakPoint ? "15px 10%" : "5%",
      display: breakPoint ? "block" : "block",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    images: {
      height: breakPoint ? "75px" : "10rem",
      filter: "drop-shadow(-3px 5px 5px #ff7f50)",
      padding: "1rem",
      boxSizing: "content-box",
    },
    imageText: {
      pt: "1rem",
      fontSize: "1rem",
      fontFamily: "Satoshi, sans-serif !important",
      marginLeft: breakPoint ? "-1rem" : "",
    },
  };

  // Function to handle applying a discount coupon
  const handleDiscount = (code, i) => {
    if (cart.length === 0) {
      setStatus(true);
      setType("error");
      setTitle("Please Add Item(s) To Cart");
    } else {
      const totalPrice = parseFloat(price - -coupon[i].value).toFixed(1);
      setStatus(true);
      setType("success");
      setTitle("Discount Applied");
      dispatch(setPrice(totalPrice));
      dispatch(setCode(!code));
      dispatch(setSuccess(!success));
      setCSuccess(!csuccess);
      dispatch(setDirectCoupon(!directCoupon));
      dispatch(setCouponName(code));
      setAdd(!add);
    }
  };

  // gift-shop-advertisement-bar
  const getCoupenCode = async () => {
    try {
      const resp = await fetchDataFromApi(
        "/api/gift-shop-advertisement-bar?populate=*"
      );
      if (resp) {
        setCoupen(resp?.data.attributes);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    getCoupenCode();
  }, []);

  // Render the Ticket component
  return (
    <>
      <Box className="container" style={{ marginTop: "2rem" }}>
        {/* ReactJsAlert for displaying status messages */}
        <ReactJsAlert
          status={status} // true or false
          type={type} // success, warning, error, info
          title={title}
          autoCloseIn={8000}
          Close={() => setStatus(false)}
        />
        <Typography variant="h2" fontFamily={"Lora"}>
          {coupen?.detailTitle}
        </Typography>
        <Typography
          variant="h3"
          sx={{ mt: "30px", mb: "50px", fontFamily: "Rubik" }}
        >
          {coupen?.detailShortDescrption}
        </Typography>
        <Box mt="30px">
          <Button
            onClick={() => navigate(`/`)}
            variant="contained"
            sx={{
              backgroundColor: "#EF6F1F",
              position: "absolute",
              left: "0",
              ml: breakPoint ? "14px" : "100px",
            }}
          >
            {" "}
            <ArrowBackIcon />
          </Button>
        </Box>
        <div
          style={{
            display: "flex",
            alignItems: "normal",
            justifyContent: "center",
            height: "0px",
            columnGap: "80px",
          }}
        ></div>

        <Button
          variant="contained"
          size="large"
          sx={{
            backgroundColor: "#EF6F1F",
            fontWeight: "bolder",
          }}
          onClick={() => {
            navigate("/checkout");
          }}
        >
          Proceed to checkout
        </Button>

        <Box
          columnGap="100px"
          display="flex"
          justifyContent="space-between"
          zIndex="2"
        >
          <Box
            sx={{
              minHeight: breakPoint ? "7rem" : "15rem",
              width: "100%",
              background: "#515477",
              display: "inline-flex",
              position: "relative",
              marginTop: "16px",
              justifyContent: "center",
              borderRadius: "1rem",
              boxShadow:
                "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
            }}
          >
            {loading ? (
              <CircularProgress
                size={50}
                thickness={5}
                sx={{ color: "#fff", marginTop: "5rem" }}
              />
            ) : (
              <Box sx={style.box2}>
                <Typography
                  variant="h1"
                  sx={{
                    // mr: "10px",
                    color: "whitesmoke",
                    fontSize: breakPoint ? "2rem" : "3rem",
                    fontFamily: "Satoshi, sans-serif !important",
                  }}
                >
                  {coupon[0]?.title}
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    color: "whitesmoke",
                    fontSize: breakPoint ? "1.2rem" : "1.5rem",
                    fontFamily: "Satoshi,sans-serif",
                    fontWeight: 700,
                    fontSize: "1.1785714285714286rem",
                    lineHeight: "1.334",
                    color: "whitesmoke",
                    paddingTop: "1rem",
                    letterSpacing: "4px",
                  }}
                >
                  <span
                    style={{
                      background: "coral",
                      padding: "0.4rem",
                      boxShadow:
                        "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
                      borderRadius: "1rem",
                    }}
                  >
                    ${-coupon[0]?.value}
                  </span>{" "}
                  Off Entire Order
                </Typography>
                {success && (
                  <Button
                    // variant="h3"
                    onClick={() => {
                      handleDiscount(coupon[0]?.title, 0);
                    }}
                    sx={{
                      color: "whitesmoke",
                      // textDecoration: "underline",
                      // m: "30px",
                      marginTop: "2rem",
                      fontSize: breakPoint ? "1rem" : "1.5rem",
                      background: "cadetblue",
                      padding: "1rem",
                      borderRadius: "5rem",
                    }}
                  >
                    {" "}
                    Apply Now
                  </Button>
                )}
              </Box>
            )}
          </Box>
        </Box>

        <Box
          className="offer-box"
          sx={{
            height: "auto",
            width: "100%",
            // background: "#367f8c",
            marginTop: "16px",
            justifyContent: "center",
            borderRadius: "2rem",
            flexDirection: breakPoint ? "column" : "row",
          }}
        >
          <Box sx={style.box}>
            {loading ? (
              <CircularProgress
                size={50}
                thickness={5}
                sx={{ color: "#fff" }}
              />
            ) : (
              <>
                <Typography
                  variant="h1"
                  sx={{
                    // mr: "10px",
                    color: "whitesmoke",
                    fontSize: breakPoint ? "1.8rem" : "2.4rem",
                    fontFamily: "Satoshi, sans-serif !important",
                  }}
                >
                  {" "}
                  {coupon[1]?.title}
                </Typography>
                <Typography
                  variant="h3"
                  sx={{
                    color: "whitesmoke",
                    fontSize: breakPoint ? "1.2rem" : "1.5rem",
                    fontFamily: "Satoshi,sans-serif",
                    fontWeight: 700,
                    fontSize: "1.1785714285714286rem",
                    lineHeight: "1.334",
                    color: "whitesmoke",
                    paddingTop: "1rem",
                    letterSpacing: "4px",
                  }}
                >
                  <span
                    style={{
                      background: "coral",
                      padding: "0.4rem",
                      boxShadow:
                        "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
                      borderRadius: "1rem",
                    }}
                  >
                    $1
                  </span>{" "}
                  Off Any Item Purchased
                </Typography>
                {success && (
                  <Button
                    variant="h5"
                    onClick={() => {
                      handleDiscount(coupon[1]?.title, 1);
                    }}
                    sx={{
                      color: "whitesmoke",
                      // textDecoration: "underline",
                      // m: "30px",
                      marginTop: "2rem",
                      fontSize: breakPoint ? "1rem" : "1.5rem",
                      background: "#515477",
                      padding: "1rem",
                      borderRadius: "5rem",
                    }}
                  >
                    {" "}
                    Shop Now
                  </Button>
                )}
              </>
            )}
          </Box>
          <Divider
            sx={{
              background: "whitesmoke",
              width: "1px",
              height: "50%",
              transform: "translateY(50%)",
              borderWidth: "0.2rem",
            }}
            flexItem
          />
          <Box sx={style.box}>
            {loading ? (
              <CircularProgress
                size={50}
                thickness={5}
                sx={{ color: "#fff" }}
              />
            ) : (
              <>
                <Typography
                  variant="h1"
                  sx={{
                    color: "whitesmoke",
                    fontSize: breakPoint ? "1.8rem" : "2.4rem",
                    fontFamily: "Satoshi, sans-serif !important",
                  }}
                >
                  {" "}
                  {coupon[3]?.title}
                </Typography>
                <Typography
                  variant="h3"
                  sx={{
                    color: "whitesmoke",
                    fontSize: breakPoint ? "1.2rem" : "1.5rem",
                    fontFamily: "Satoshi,sans-serif",
                    fontWeight: 700,
                    fontSize: "1.1785714285714286rem",
                    lineHeight: "1.334",
                    color: "whitesmoke",
                    paddingTop: "1rem",
                    letterSpacing: "4px",
                  }}
                >
                  <span
                    style={{
                      background: "coral",
                      padding: "0.4rem",
                      boxShadow:
                        "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
                      borderRadius: "1rem",
                    }}
                  >
                    {-coupon[2]?.value}%
                  </span>{" "}
                  Off Entire Order
                </Typography>
                {success && (
                  <Button
                    variant="h5"
                    onClick={() => {
                      handleDiscount(coupon[2]?.title, 2);
                    }}
                    sx={{
                      color: "whitesmoke",
                      // textDecoration: "underline",
                      // m: "30px",
                      marginTop: "2rem",
                      fontSize: breakPoint ? "1rem" : "1.5rem",
                      background: "#515477",
                      padding: "1rem",
                      borderRadius: "5rem",
                    }}
                  >
                    {" "}
                    Shop Now
                  </Button>
                )}
              </>
            )}
          </Box>
        </Box>

        <div
          style={{
            display: "flex",
            flexDirection: breakPoint ? "column" : "row",
            padding: "5rem 0rem 0rem",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              // width: "calc(100% / 3)",
              textAlign: breakPoint ? "left" : "center",
              padding: breakPoint ? "2rem" : "36px 10px",
              marginLeft: breakPoint ? "6rem" : "  ",
            }}
          >
            <img src={truck} alt="" style={style.images} loading="lazy"/>
            <Typography variant="h3" fontWeight={"bold"} sx={style.imageText}>
              {" "}
              Spend $40 Get FREE Shipping
            </Typography>
          </div>
          <div
            style={{
              // width: "calc(100% / 3)",
              textAlign: breakPoint ? "left" : "center",
              padding: breakPoint ? "2rem" : "36px 10px",
              marginLeft: breakPoint ? "6rem" : "",
            }}
          >
            <img src={premium} alt="" style={style.images} loading="lazy"/>
            <Typography variant="h3" fontWeight={"bold"} sx={style.imageText}>
              {" "}
              Lifetime Membership
            </Typography>
          </div>
          <div
            style={{
              // width: "calc(100% / 3)",
              textAlign: breakPoint ? "left" : "center",
              padding: breakPoint ? "2rem" : "36px 10px",
              marginLeft: breakPoint ? "6rem" : "",
            }}
          >
            <img src={offer} alt="" style={style.images} loading="lazy"/>
            <Typography variant="h3" fontWeight={"bold"} sx={style.imageText}>
              {" "}
              Get Exclusive Offers
            </Typography>
          </div>
        </div>
      </Box>
    </>
  );
};

export default Ticket;
