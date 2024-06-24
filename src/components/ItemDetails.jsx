// Import necessary styles
import "../styles/ItemDetails.css";
import "../styles/Navbar.css";

// Import necessary modules
import { Box, Button, IconButton, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { shades } from "../theme";
import { useDispatch } from "react-redux";
import { encode as btoa } from "base-64";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { SearchOutlined } from "@mui/icons-material";
import CancelIcon from "@mui/icons-material/Cancel";
import useMediaQuery from "@mui/material/useMediaQuery";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// Import necessary components
import { addToCart, setValue } from "../state";
import Loader from "./Loader";
import MyImage from "./MyImage";
import NavMenu from "./NavMenu";
import Item2 from "./Item2";
import { ITEM_DETAILS } from "../utils/constants";

const ItemDetails = () => {
  // Define variables and hooks
  const breakPoint = useMediaQuery("(min-width:400px)");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const [count, setCount] = useState(1);
  const [item, setItem] = useState([]);
  const [i, setId] = useState();
  const [show, setShow] = useState(false);
  const [search, setSearchField] = useState("");

  // Function to get data from API
  const getData = async () => {
    try {
      navigate(`/product-details/${params.itemId}`);
      setId(params.itemId);

      if (
        updateditem.tags === "POS" ||
        updateditem.tags === "" ||
        updateditem.tags === undefined
      ) {
        dispatch(setValue("All"));
      } else {
        dispatch(setValue(updateditem[0].tags));
      }

      window.scrollTo(0, 0);
    } catch (err) {
      console.log(err, "this is error");
    }
  };

  // This useEffect hook will run every time the component mounts
  useEffect(() => {
    // Using the window.scrollTo method to scroll to the top of the page
    window.scrollTo(0, 0);
  }, []); // The empty array means it will only run on mount and unmount

  // Filter the selected item
  const updateditem = item.filter((d) => {
    return d.id == i;
  });

  // Update the category based on the selected item
  if (updateditem) {
    if (
      updateditem[0]?.tags === "POS" ||
      updateditem[0]?.tags === "" ||
      updateditem[0]?.tags === undefined
    ) {
      dispatch(setValue("All"));
    } else if (updateditem[0].tags === "English Lectures-Swamiji (Audio)") {
      dispatch(setValue("English Lectures"));
    } else if (updateditem[0].tags === "BalMukund Books") {
      dispatch(setValue("Bal Mukund Books"));
    } else if (updateditem[0].tags === "Videos") {
      dispatch(setValue("Videos"));
    } else {
      dispatch(setValue(updateditem[0].tags));
    }
  }

  // Slider settings for related products
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1224,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  };

  useEffect(() => {
    async function getItems() {
      try {
        var headers = new Headers();
        headers.append(
          "Authorization",
          "Basic " +
            btoa(
              "ce9a3ad16708f3eb4795659e809971c4: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"
            )
        );
        const result = await fetch(
          "https://hmstdqv5i7.execute-api.us-east-1.amazonaws.com/jkshopstage/products",
          {
            headers: headers,
          }
        );

        const itemJson = await result.json();
        console.log(itemJson, "from-product display page");
        setItem(itemJson.products);
        setLoading(false);
      } catch (err) {
        console.log(err, "this is error");
      }
    }
    getData();
    getItems();
  }, [params.itemId]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          {updateditem.map((updateditem, index) => (
            <Box width="100%" m="80px auto" key={updateditem.id} className="">
              <div className="container">
                {" "}
                <Box display="flex" flexWrap="wrap" columnGap="40px">
                  <Box flex="1 1 40%" mb="40px">
                    <MyImage imgs={updateditem.images} />

                    <Typography
                      m="20px 0 5px 0"
                      alignItems="flex-end"
                      fontSize={!breakPoint ? "12px" : "22px"}
                      fontFamily={"Rubik"}
                    >
                      {ITEM_DETAILS.PRICE} -{" "}
                      <strong style={{ color: "green" }}>
                        ${updateditem?.variants[0].price}
                      </strong>
                    </Typography>
                  </Box>
                  <Box flex="1 1 50%" mb="40px">
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      fontSize="16px"
                    >
                      <Box mt="30px">
                        <Button
                          onClick={() => {
                            navigate(`/`);
                            dispatch(setValue("All"));
                          }}
                          variant="contained"
                          sx={{ backgroundColor: "#EF6F1F" }}
                        >
                          {" "}
                          <ArrowBackIcon />
                        </Button>
                      </Box>
                    </Box>

                    <Box m={!breakPoint ? "0px 0 0px 0" : "65px 0 25px 0"}>
                      <Typography
                        variant={!breakPoint ? "h5" : "h2"}
                        style={{
                          textDecorationLine: "underline",
                          fontFamily: "Satoshi, sans-serif",
                          color: "#645743",
                        }}
                      >
                        {updateditem?.title}
                      </Typography>

                      <Typography
                        sx={{ mt: "20px" }}
                        fontSize={!breakPoint ? "12px" : "20px"}
                        fontFamily="Rubik"
                        style={{
                          fontFamily: "Satoshi, sans-serif",
                          color: "#645743",
                        }}
                        textAlign={breakPoint ? "left" : "center"}
                        dangerouslySetInnerHTML={{
                          __html: updateditem.body_html,
                        }}
                      ></Typography>
                    </Box>

                    <Box display="flex" alignItems="center" minHeight="50px">
                      <Box
                        display="flex"
                        alignItems="center"
                        border={`1.5px solid ${shades.neutral[300]}`}
                        mr="20px"
                        p="2px 5px"
                        backgroundColor={"#edaa38"}
                      >
                        <IconButton
                          onClick={() => {
                            if (count > 1) {
                              setCount(Math.max(count - 1, 0));
                            }
                          }}
                        >
                          <RemoveIcon />
                        </IconButton>
                        <Typography sx={{ p: "0 5px" }}>{count}</Typography>
                        <IconButton onClick={() => setCount(count + 1)}>
                          <AddIcon />
                        </IconButton>
                      </Box>
                      <Button
                        sx={{
                          backgroundColor: "#cf4520",
                          color: "white",
                          borderRadius: 0,
                          fontFamily: "Rubik",
                          minWidth: !breakPoint ? "150px" : "100px",
                          padding: "10px 40px",
                          "&:hover": {
                            backgroundColor: "#222222",
                          },
                        }}
                        onClick={() =>
                          dispatch(
                            addToCart({ item: { ...updateditem, count } })
                          )
                        }
                      >
                        {ITEM_DETAILS.ADD_TO_CART}
                      </Button>
                    </Box>

                    <Box
                      display={"flex"}
                      justifyContent={"end"}
                      mr={!breakPoint ? "20px" : "200px"}
                    >
                      <Typography
                        fontSize={!breakPoint ? "12px" : "16px"}
                        fontFamily={"Rubik"}
                      >
                        {ITEM_DETAILS.TAGS}:{" "}
                        <strong> {updateditem.tags} </strong>
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Box m="20px 0"></Box>
                <Box display="flex" flexWrap="wrap" gap="15px"></Box>
                <Box mt="50px" mr="30px" width="100%">
                  <Typography
                    variant="h2"
                    fontWeight="bold"
                    style={{
                      fontFamily: "Satoshi, sans-serif",
                      color: "#645743",
                    }}
                  >
                    {ITEM_DETAILS.RELATED_PRODUCTS}
                  </Typography>
                  <Slider {...settings} style={{ margin: "0 15px" }}>
                    {item
                      .filter((item) => item.tags === updateditem.tags)
                      .map((item, i) => (
                        <Item2 item={item} key={`${item.title}-${item.id}`} />
                      ))}
                  </Slider>{" "}
                </Box>
              </div>
              {show && (
                <div className="searchbox">
                  <div className="">
                    {" "}
                    <IconButton>
                      <SearchOutlined
                        fontSize="medium"
                        sx={{ color: " #EF6F1F;" }}
                      />
                    </IconButton>{" "}
                    <input
                      placeholder="Search for Products..."
                      type="text"
                      value={search}
                    />
                    <IconButton
                      onClick={() => setShow(false)}
                      style={{
                        position: "absolute",
                        right: 0,
                        color: "#EF6F1F",
                      }}
                    >
                      <CancelIcon />
                    </IconButton>
                  </div>
                </div>
              )}
            </Box>
          ))}
        </Fragment>
      )}
    </>
  );
};

export default ItemDetails;
