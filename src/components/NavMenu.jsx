import { useDispatch, useSelector } from "react-redux";
import Jklog from "../assets/logo/jklogo.png";

import { Badge, Box, IconButton } from "@mui/material";
import { makeStyles } from "tss-react/mui";
import "../styles/style.css";
import {
  ShoppingBagOutlined,
  MenuOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { SearchOutlined } from "@mui/icons-material";
import { setIsCartOpen, setIsNavOpen, setIsFilterOpen } from "../state";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { encode as btoa } from "base-64";
import {
  setItems,
  setValue,
  setPriceFilter,
  setSortOrder,
  setItemsCategories,
} from "../state";
import React, { useEffect, useState, useMemo } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../App.css";
import styled from "@emotion/styled";
import "react-dropdown/style.css";
import { fetchDataFromApi } from "../utils/api";
import _ from "lodash";
import "../styles/Item2.css";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import NavbarDropdown from "./NavBarDropdown";
import "../styles/Navbar.css";
import Papers from "./Papers";
import { ApiDataPostType } from "../api/Api";

function NavMenu({ navFromTop }) {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const breakPoint = useMediaQuery("(min-width:800px)");

  useEffect(() => {
    setSearchField("");
  }, [location.search, params]);

  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const isNavOpen = useSelector((state) => state.cart.isNavOpen);
  const isFilterOpen = useSelector((state) => state.cart.isFilterOpen);
  const cart = useSelector((state) => state.cart.cart);
  const itemsCategories = useSelector((state) => state.cart.itemsCategories);

  const items = useSelector((state) => state.cart.items);
  const value = useSelector((state) => state.cart.value);
  const sortOrder = useSelector((state) => state.cart.sortOrder);
  const [item, setItem] = useState([]);
  const [search, setSearchField] = useState("");
  const [categoryList, setCategoryList] = useState(itemsCategories);
  const [show, setShow] = useState(false);
  const [hide, setHide] = useState(true);
  const [asc, setAsc] = useState([]);
  const [dsc, setDsc] = useState([]);
  const [name, setName] = useState("All");
  const [val, setVal] = useState("");
  const [categories, setCategories] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);

  const getCategories = () => {
    fetchDataFromApi("/api/categories").then((res) => {
      // console.log("categories========", res);
      setCategories(res.data);
    });
  };

  const options = ["one", "two", "three"];
  const defaultOption = options[0];

  const fetchProducts = () => {
    return ApiDataPostType("/customer/get-all-products")
      .then((response) => response.data.response)
      .catch((error) => {
        console.error("Error fetching products:", error);
        throw error; // Rethrow to handle it in the calling function.
      });
  };

  function sortProducts(products, asc = true) {
    return products.slice().sort((a, b) => {
      const priceDiff = a.variants[0].price - b.variants[0].price;
      return asc ? priceDiff : -priceDiff;
    });
  }

  async function getItems() {
    try {
      let products = items;
      if (items.length === 0) {
        products = await fetchProducts(); // Handle the promise with await.
        setItem(products);
        dispatch(setItems(products));
      }
      if (itemsCategories.length === 0 && products.length > 0) {
        const modifiedCategory = GetSortedCategory(products);
        // console.log("modifiedCategory", modifiedCategory);
        dispatch(setItemsCategories(modifiedCategory));
      }

      const sortedAsc = sortProducts(products, true);
      const sortedDsc = sortProducts(products, false);
      setAsc(sortedAsc);
      setDsc(sortedDsc);
    } catch (err) {
      console.error(err, "this is error");
    }
  }

  const GetSortedCategory = (products) => {
    const tagsArray = products.map(product => product.tags.split(/\s*,\s*/)).flat();
    const uniqueTags = [...new Set(tagsArray)];
    return uniqueTags.sort();
  };

  useEffect(() => {
    if (!item?.length > 0) {
      getItems();
    }
    getCategories();
  }, []);

  const handlePriceFilter = (priceFilter) => {
    const filtered = asc.filter(
      (product) =>
        (priceFilter.minPrice === "" ||
          product.variants[0].price >= priceFilter.minPrice) &&
        (priceFilter.maxPrice === "" ||
          product.variants[0].price <= priceFilter.maxPrice)
    );
    if (priceFilter.minPrice === 3 && priceFilter.maxPrice === 150) {
      setHide(true);
    } else {
      setHide(false);
    }
    setItem(filtered);
  };

  useMemo(() => {
    const filtered = items.filter((product) =>
      product.title.toLowerCase().includes(search.toLowerCase())
    );
    setItem(filtered);
  }, [items, search]);

  useMemo(() => {
    // console.log("itemsCategories",itemsCategories)
    const filtered = itemsCategories.filter((cat) =>
      cat.toLowerCase().includes(search.toLowerCase())
    );
    // console.log("filtered", filtered)
    setCategoryList(filtered);
  }, [items, search]);

  const handleSearchField = (e) => {
    setSearchField(e.target.value);
    setHide(false);
    // console.log(search, "search");
    if (e.target.value === "") {
      setHide(true);
      getItems();
    }
  };

  var fruitArrays = {};
  // console.log(categories);
  if (categories) {
    for (var i = 0; i < categories.length; i++) {
      const a = items.filter(
        (item) => item.tags === categories[i].attributes.Type
      );
      fruitArrays[categories[i].attributes.Type] = [a];
    }
  }

  const englishbooks = items.filter((item) => item.tags === "English Books");
  const SwamijiKirtans = items.filter(
    (item) => item.tags === "Swamiji Kirtans"
  );
  const BalMukundBooks = items.filter(
    (item) => item.tags === "BalMukund Books"
  );
  const EnglishLectures = items.filter(
    (item) => item.tags === "English Lectures-Swamiji (Audio)"
  );
  const Videos = items.filter((item) => item.tags === "Videos");

  const change = () => {
    dispatch(setValue("All"));
  };

  const handleCategoriesChange = (value) => {
    if (value in fruitArrays) {
      setItem(fruitArrays[value][0]);
      setHide(false);
    }
  };

  const styles = makeStyles((theme) => ({
    select: {
      "&:before": {
        borderColor: "",
      },
      "&:after": {
        borderColor: "",
      },
    },
    icon: {
      right: "0px",
      background: "red",
    },
  }));

  const SearchClass = show ? "searchActive" : "";

  const handleNavMenuClick = (cat) => {
    navigate(`/category/${cat}`);
  };
  // console.log(show);

  const handleKeyDownSearch = (e) => {
    if (search) {
      // Handle arrow key navigation
      if (e.key === "ArrowUp") {
        console.log("up");
        setSelectedItemIndex((prevIndex) =>
          prevIndex === null ? 0 : Math.max(0, prevIndex - 1)
        );
      } else if (e.key === "ArrowDown") {
        console.log("down");
        setSelectedItemIndex((prevIndex) =>
          prevIndex === null
            ? 0
            : Math.min(categoryList.length + item.length - 1, prevIndex + 1)
        );
      } else if (e.key === "Enter") {
        console.log("enter");
        navigate(`/search?category=none&filter=All&searchInput=${search}`);
        // Handle Enter key press
        // if (selectedItemIndex !== null) {
        //   const selectedCategory = categoryList[selectedItemIndex];
        //   const selectedItem = item[selectedItemIndex - categoryList.length];

        //   if (selectedCategory) {
        //     navigate(`/category/${selectedCategory}`);
        //   } else if (selectedItem) {
        //     navigate(`/item/${selectedItem.id}`);
        //   }
        // }
      }
    }
  };

  return (
    <>
      <div style={{ position: "sticky", top: 0, zIndex: 101 }}>
        {!breakPoint && (
          <Box className="offersavailable">
            <Papers />
          </Box>
        )}

        <Navbar
          expand="lg"
          className="navbox"
          style={{ top: navFromTop ? 0 : "", backgroundColor: "#FFFFFF" }}
        >
          <div className="navbars container">
            {!breakPoint && (
              <IconButton
                aria-controls="basic-navbar-nav"
                onClick={() => dispatch(setIsNavOpen({}))}
                sx={{ color: "#FFFFFF" }}
                className="menub"
              >
                <MenuOutlined />
              </IconButton>
            )}
            <Navbar.Brand
              onClick={() => {
                navigate(`/`);
              }}
            >
              {" "}
              <img
                src={Jklog}
                alt="not found"
                onClick={() => change()}
                style={{ width: "6rem", height: "45px" }}
                loading="lazy"
              />
            </Navbar.Brand>

            <Box
              //columnGap="20px",
              display="flex"
              justifyContent="end"
              columnGap="0px"
              zIndex="2"
              flex="1"
            >
              <div className={`Search ${SearchClass}`}>
                <div
                  className="inputfield"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flex: "1",
                    justifyContent: "flex-end",
                  }}
                >
                  <input
                    placeholder="Search for Products..."
                    type="text"
                    value={search}
                    onChange={handleSearchField}
                    onKeyDown={(e) => {
                      handleKeyDownSearch(e);
                    }}
                    style={{
                      position: "relative",
                      width: "100%",
                      borderRadius: !search ? "50px" : "",
                    }}
                  />
                  {search && (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        className="clear-icon"
                        onClick={() => setSearchField("")}
                        style={{
                          cursor: "pointer",
                          // position: "absolute",
                          margin: "0px 8px 0px -32px",
                          fill: "#645743",
                          border: "1px solid #645743",
                          borderRadius: "50%",
                          zIndex: 1,
                        }}
                      >
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
                      </svg>
                      <div
                        style={{
                          background: "#EF6F1F",
                          padding: "6.5px 10px",
                          borderTopRightRadius: "2rem",
                          borderBottomRightRadius: "2rem",
                          border: "1px solid #645743",
                        }}
                      >
                        <SearchOutlined
                          fontSize="large"
                          sx={{
                            color: "white",
                            zIndex: 1,
                            cursor: "pointer",
                            background: "#EF6F1F",
                            borderRadius: "1rem",
                          }}
                          onClick={() =>
                            navigate(
                              `/search?category=none&filter=All&searchInput=${search}`
                            )
                          }
                        />
                      </div>
                    </>
                  )}
                </div>

                {/* <IconButton>
                <SearchOutlined fontSize="medium" sx={{ color: " #EF6F1F;" }} onClick={handleSearchField} />
              </IconButton> */}
                {search && (categoryList.length > 0 || item.length > 0) && (
                  <div className="searchlist">
                    {categoryList?.map((cat, index) => (
                      <div
                        key={index}
                        onClick={() =>
                          navigate(
                            `/search?category=${cat}&filter=All&searchInput=${search}`
                          )
                        }
                        className="lst"
                      >
                        {cat}
                      </div>
                    ))}
                    {item.map((item, index) => (
                      <div
                        key={index}
                        onClick={() => navigate(`/item/${item.id}`)}
                        className="lst"
                      >
                        {item.title}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <IconButton className="Searchmb" onClick={() => setShow(!show)}>
                <SearchOutlined fontSize="medium" sx={{ color: "black" }} />
              </IconButton>

              <Badge
                badgeContent={cart.length === 0 ? "0" : cart.length}
                color="secondary"
                invisible={cart.length > 1000} // any random stuff to not execute this line
                sx={{
                  "& .MuiBadge-badge": {
                    right: 9,
                    top: 5,
                    padding: "0 4px",
                    height: "14px",
                    minWidth: "13px",
                  },
                }}
              >
                <IconButton
                  onClick={() => dispatch(setIsCartOpen({}))}
                  sx={{
                    color: "black",
                    "@media (max-width: 992px)": {
                      "& .MuiSvgIcon-root": {
                        fontSize: "medium",
                      },
                    },
                  }}
                >
                  <ShoppingCartOutlined fontSize="large" />
                </IconButton>
              </Badge>
            </Box>
          </div>
        </Navbar>

        <NavbarDropdown updatingProps={location.search} />

        {breakPoint && (
          <Box className="offersavailable">
            <Papers />
          </Box>
        )}
      </div>
    </>
  );
}

export default NavMenu;
