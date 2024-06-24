import "../styles/item.scss";
import "./ItemDetails";
import "../styles/Item2.css";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  IconButton,
  Box,
  Typography,
  useTheme,
  Button,
  Skeleton,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { enqueueSnackbar } from "notistack";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";

import { addToCart, setDisplay, setItem } from "../state";
import { PRODUCT } from "../utils/constants";

const Item2 = ({ item }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const breakPoint = useMediaQuery("(min-width:700px)");
  const breakPoint3 = useMediaQuery("(max-width:700px)");
  const display = useSelector((state) => state.cart.quickDisplay);
  const [isLiked, setIsLiked] = useState(true);

  const handleIconClick = () => {
    setIsLiked(!isLiked);
  };

  const {
    palette: { neutral },
  } = useTheme();

  const { variants, title } = item;

  const addtocart = () => {
    if (count <= 0) {
      console.error("Invalid count: Count must be greater than 0");
      return;
    }

    dispatch(addToCart({ item: { ...item, count } }));
    enqueueSnackbar("Added to Cart!");
    console.log("snackbar");
  };

  return (
    <Box
      position="relative"
      style={{
        transform: isHovered ? "translate3d(0, 0, -10px)" : "",
        boxShadow: isHovered ? "0 10px 20px rgba(0, 0, 0, 0.2)" : "",
        cursor: "pointer",
      }}
      className="image_jk"
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
    >
      <Box
        mb={"3px"}
        padding={"10px"}
        className="product"
        sx={{
          borderRadius: "20px",
          padding: breakPoint ? "2px" : "2px",
          marginBottom: "1px",
        }}
      >
        <Link to={`/product-details/${item.id}`}>
          <div className="product_list">
            {item.image && item.image != null ? (
              <img
                className="product_img"
                alt={item.name}
                width="30px"
                height="50px"
                src={item.image.src}
                loading="lazy"
              />
            ) : (
              <Skeleton variant="rectangular" height="200px" />
            )}
          </div>
        </Link>

        <Box
          display={isHovered ? "block" : "none"}
          style={{
            cursor: "pointer",
            position: "absolute",
            top: "20px",
            right: "-40px",
          }}
        >
          <Box
            display={breakPoint3 ? "none" : "flex"}
            justifyContent="space-between"
            flexDirection={"column"}
            style={{
              margin: "1px",
              padding: "0px 25px",
              width: "10em",
            }}
          >
            <Button
              id="myBtn"
              sx={{
                color: "whitesmoke",
                borderRadius: "50%",
                backgroundColor: "#EF6F1F",
                width: "10%",
                minWidth: "40px",
                height: "34px",
                "&:hover": {
                  backgroundColor: "#EF6F1F",
                },
              }}
            >
              <IconButton style={{ widht: "40px", height: "40px" }}>
                {isLiked ? (
                  <FavoriteBorderOutlinedIcon
                    fontSize="medium"
                    onClick={handleIconClick}
                    style={{
                      transform: "scale(1.3)",
                      color: "whitesmoke",
                    }}
                  />
                ) : (
                  <FavoriteOutlinedIcon
                    fontSize="medium"
                    onClick={handleIconClick}
                  />
                )}
              </IconButton>
            </Button>
            <Button
              id="myBtn"
              onClick={() => {
                addtocart();
              }}
              sx={{
                color: "whitesmoke",
                borderRadius: "100%",
                backgroundColor: "#EF6F1F",
                width: "10%",
                minWidth: "40px",
                height: "34px",
                marginBottom: "10px",
                "&:hover": {
                  backgroundColor: "#EF6F1F",
                },
              }}
            >
              <IconButton style={{ widht: "30px", height: "40px" }}>
                {" "}
                <ShoppingCartOutlinedIcon
                  fontSize="medium"
                  style={{ transform: "scale(1.3)", color: "whitesmoke" }}
                />
              </IconButton>
            </Button>
            <Button
              id="myBtn"
              onClick={() => {
                dispatch(setDisplay(!display));
                dispatch(setItem(item));
              }}
              sx={{
                color: "whitesmoke",
                borderRadius: "100%",
                backgroundColor: "#EF6F1F",
                width: "10%",
                minWidth: "40px",
                height: "34px",
                "&:hover": {
                  backgroundColor: "#EF6F1F",
                },
              }}
            >
              <IconButton style={{ widht: "2px", height: "40px" }}>
                <RemoveRedEyeOutlinedIcon
                  fontSize="medium"
                  sx={{ transform: "scale(1.3)", color: "whitesmoke" }}
                />
              </IconButton>
            </Button>
          </Box>
        </Box>
      </Box>

      <Box mt="3px">
        <Typography id="typo" className="product_title">
          {title}
        </Typography>
        {variants[0].compareAtPriceV2 ? (
          <Typography
            textAlign={"left"}
            fontWeight="bold"
            fontSize="16px"
            color={"green"}
            style={{ marginLeft: "5px" }}
          >
            <span style={compareText}>
              {parseFloat(variants[0].compareAtPriceV2.amount).toFixed(2)}
            </span>
            &nbsp;
            {parseFloat(variants[0].price).toFixed(2)}
          </Typography>
        ) : (
          <Typography
            textAlign={"left"}
            fontWeight="bold"
            fontSize="16px"
            color={"green"}
            style={{ marginLeft: "5px" }}
          >
            $ {parseFloat(variants[0].price).toFixed(2)}
          </Typography>
        )}
        {/* <Typography
          textAlign={"left"}
          fontWeight="bold"
          fontSize="16px"
          color={"green"}
          style={{ marginLeft: "5px" }}
        >
          ${" "}
          {variants[0].compareAtPriceV2
            ? parseFloat(variants[0].price).toFixed(2) +
              " - $ " +
              parseFloat(variants[0]?.compareAtPriceV2.amount).toFixed(2)
            : parseFloat(variants[0].price).toFixed(2)}
        </Typography> */}
        <button
          className="addtocart"
          onClick={() => addtocart()}
          disabled={!item.variants[0].availableForSale}
          style={{
            background: !item.variants[0].availableForSale && "darkgrey",
          }}
        >
          {!item.variants[0].availableForSale
            ? "OUT OF STOCK"
            : PRODUCT.ADD_TO_CART}
        </button>
      </Box>
    </Box>
  );
};

const compareText = {
  color: "#4d4d4d",
  textDecoration: "line-through",
};

export default Item2;
