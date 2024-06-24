// Import necessary components and styles
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

import { shades } from "../theme";
import {
  decreaseCount,
  increaseCount,
  removeFromCart,
  setIsCartOpen,
} from "../state";
import { CART } from "../utils/constants";
import { useState } from "react";
import axios from "axios";
import { PostDataApi } from "../api/Api";

// Create a styled component for a flex container
const FlexBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CartMenu = () => {
  // Define variables and hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const isCartOpen = useSelector((state) => state.cart.isCartOpen);
  const [loading, setLoading] = useState(false);

  // Calculate the total price of items in the cart
  const totalPrice = cart.reduce((total, item) => {
    return total + item.count * item.variants[0].price;
  }, 0);

  const handleCheckout = async () => {
    setLoading(true);
    const checkoutBody = {
      items: cart.map((item) => ({
        variantId: item.variantId,
        quantity: item.count,
      })),
    };
    console.log(checkoutBody);
    const checkoutUrl = await getCheckOutUrl(checkoutBody);
    // console.log(checkoutUrl);
    // const newTab = window.open("", "_blank");
    // newTab.location.href = checkoutUrl;
    window.location.href = checkoutUrl;
  };

  const getCheckOutUrl = async (checkoutBody) => {
    try {
      const response = await PostDataApi(
        "/customer/create-checkout",
        checkoutBody
      );
      if (response?.data) {
        console.log(response.data.checkout.webUrl)
        const checkoutUrl = response.data.checkout.webUrl;
        console.log(
          "checkoutUrl",
          checkoutUrl
        );
        return checkoutUrl;
      }
    } catch (error) {
      console.error("Error fetching checkoutUrl:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      display={isCartOpen ? "block" : "none"}
      backgroundColor="rgba(0, 0, 0, 0.4)"
      position="fixed"
      zIndex={103}
      width="100%"
      height="100%"
      left="0"
      top="0"
      overflow="auto"
    >
      <Box
        className="cart-close-area"
        onClick={() => {
          dispatch(setIsCartOpen({}));
          setLoading(false);
        }}
        sx={{ height: "100% !important" }}
      ></Box>
      <Box
        className="cart-page"
        position="fixed"
        right="0"
        bottom="0"
        height="100%"
        backgroundColor="white"
      >
        <Box overflow="auto" height="100%" className="full-cart-page">
          {/* HEADER */}
          <FlexBox mb="15px">
            <Typography variant="h3">
              {CART.SHOPPING_BAG} ({cart.length})
            </Typography>
            <IconButton
              onClick={() => {
                dispatch(setIsCartOpen({}));
                setLoading(false);
              }}
            >
              <CloseIcon />
            </IconButton>
          </FlexBox>

          {/* CART LIST */}
          <Box>
            {cart.map((item) => (
              <Box key={`${item.id}`}>
                <FlexBox p="15px 0">
                  <Box className="flex-image" flex="1 1 40%">
                    <img
                      alt={item?.name}
                      width="123px"
                      height="164px"
                      src={item.image?.src}
                      loading="lazy"
                    />
                  </Box>
                  <Box flex="1 1 60%">
                    <FlexBox mb="5px">
                      <Typography fontWeight="bold">{item.title}</Typography>
                      <IconButton
                        onClick={() =>
                          dispatch(removeFromCart({ id: item.id }))
                        }
                      >
                        <CloseIcon />
                      </IconButton>
                    </FlexBox>
                    <FlexBox m="15px 0">
                      <Box
                        display="flex"
                        alignItems="center"
                        border={`1.5px solid ${shades.neutral[500]}`}
                      >
                        <IconButton
                          onClick={() =>
                            dispatch(decreaseCount({ id: item.id }))
                          }
                        >
                          <RemoveIcon />
                        </IconButton>
                        <Typography>{item.count}</Typography>
                        <IconButton
                          onClick={() =>
                            dispatch(increaseCount({ id: item.id }))
                          }
                        >
                          <AddIcon />
                        </IconButton>
                      </Box>
                      <Typography fontWeight="bold">
                        ${Number(item.variants[0].price) * Number(item.count)}
                      </Typography>
                    </FlexBox>
                  </Box>
                </FlexBox>
                <Divider />
              </Box>
            ))}
          </Box>

          {/* ACTIONS */}
          <Box m="20px 0">
            <FlexBox m="20px 0">
              <Typography fontWeight="bold">{CART.SUBTOTAL}</Typography>
              <Typography fontWeight="bold">${totalPrice}</Typography>
            </FlexBox>
            {loading ? (
              <CircularProgress sx={{ marginLeft: "50%" }} />
            ) : (
              <Button
                disabled={cart.length === 0}
                sx={{
                  backgroundColor: shades.primary[400],
                  color: "white",
                  borderRadius: "2rem",
                  fontSize: "1.2rem",
                  fontFamily: "Satoshi, sans-serif",
                  fontWeight: "700",
                  minWidth: "100%",
                  padding: "20px 40px",
                  m: "20px 0",
                  display: cart.length === 0 ? "none" : "",
                  "&:hover": {
                    backgroundColor: "#EF6F1F",
                    transition: "0.1s ease-in",
                  },
                }}
                onClick={handleCheckout}
                // onClick={() => {
                //   navigate("/checkout");
                //   dispatch(setIsCartOpen({}));
                //   window.scrollTo(0, 0);
                // }}
              >
                {CART.CHECKOUT}
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CartMenu;
