// Import statements for dependencies and components
import '../styles/style.css'; // Import CSS styles
import { useDispatch, useSelector } from 'react-redux'; // Import Redux hooks
import { Box, Typography, Button, IconButton } from '@mui/material'; // Import Material-UI components
import CancelIcon from '@mui/icons-material/Cancel'; // Import CancelIcon
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook from React Router
import { encode as btoa } from 'base-64'; // Import btoa function for base64 encoding
import React, { Fragment, useEffect, useState, useMemo } from 'react'; // Import React and its hooks
import useMediaQuery from '@mui/material/useMediaQuery'; // Import useMediaQuery hook

import 'slick-carousel/slick/slick.css'; // Import slick carousel styles
import 'slick-carousel/slick/slick-theme.css'; // Import slick carousel theme styles
import '../styles/Navbar.css'; // Import Navbar styles
import '../App.css'; // Import global App styles
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp'; // Import KeyboardDoubleArrowUpIcon
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown'; // Import KeyboardDoubleArrowDownIcon
import TuneIcon from '@mui/icons-material/Tune'; // Import TuneIcon
import 'react-dropdown/style.css'; // Import React Dropdown styles
import _ from 'lodash'; // Import lodash library
import '../styles/Item2.css'; // Import Item2 styles
import { useParams } from 'react-router-dom'; // Import useParams hook

import SortRadioButtons from './SortRadioButtons'; // Import SortRadioButtons component
import CategoriesButton from './CategoriesButton'; // Import CategoriesButton component
import PriceFilter from './PriceFilter'; // Import PriceFilter component
import { setItems, setPriceFilter, setSortOrder, setItemsCategories, setIsFilterOpen } from '../state'; // Import Redux actions
import Loader from './Loader'; // Import Loader component
import NavMenu from './NavMenu'; // Import NavMenu component
import Item2 from './Item2'; // Import Item2 component
import { PRODUCT_CATEGORY } from '../utils/constants';

// ProductCategory component definition
const ProductCategory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isFilterOpen = useSelector((state) => state.cart.isFilterOpen);

  const items = useSelector((state) => state.cart.items);
  const value = useSelector((state) => state.cart.value);
  const sortOrder = useSelector((state) => state.cart.sortOrder);
  const [item, setItem] = useState([]);
  const breakPoint = useMediaQuery('(max-width:700px)');
  const breakPoint2 = useMediaQuery('(max-width:1220px)');
  const breakPoint3 = useMediaQuery('(max-width:530px)');
  const [search, setSearchField] = useState('');
  const [show, setShow] = useState(false);
  const [view, setView] = useState(true);
  const [hide, setHide] = useState(true);
  const [asc, setAsc] = useState([]);
  const [dsc, setDsc] = useState([]);
  const params = useParams();
  const [category, setCategory] = useState(params.catName);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // useEffect to filter and sort items based on category
  useEffect(() => {
    let arr = items.filter((item) => item.tags === params.catName);
    let arr2 = items.filter((item) => item.tags === params.catName);
    arr = arr.slice().sort((a, b) => a.variants[0].price - b.variants[0].price);
    arr2 = arr2.slice().sort((a, b) => b.variants[0].price - a.variants[0].price);
    setAsc(arr);
    setDsc(arr2);
  }, [params.catName]);

  // useEffect to set the current category based on URL params
  useEffect(() => {
    setCategory(params?.catName);
  }, [params.catName]);

  // This useEffect hook will run every time the component mounts
  useEffect(() => {
    // Using the window.scrollTo method to scroll to the top of the page
    window.scrollTo(0, 0);
  }, []); // The empty array means it will only run on mount and unmount

  // useEffect to update items and category when category or items change
  useEffect(() => {
    setCategory(category);
    setItem(productByCategory);
    setHide(false);
  }, [category, items]);

  // Function to fetch items from an external API
  async function getItems() {
    try {
      var headers = new Headers();
      headers.append(
        'Authorization',
        'Basic ' + btoa('ce9a3ad16708f3eb4795659e809971c4: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'),
      );

      const result = await fetch('https://hmstdqv5i7.execute-api.us-east-1.amazonaws.com/jkshopstage/products', {
        headers: headers,
      });

      const resp = await result.json();

      if (resp) {
        // Get categories
        let listCat = [
          ...new Set(
            resp?.products
              ?.filter((item) => item?.tags)
              .map((item) => {
                return item?.tags;
              }),
          ),
        ];
        dispatch(setItemsCategories(listCat));

        console.log(resp);
        setItem(resp?.products);
        dispatch(setItems(resp?.products));
        console.log(resp?.products, 'res');
        let arr = resp?.products;
        let arr2 = resp?.products;
        arr = arr.slice().sort((a, b) => a.variants[0].price - b.variants[0].price);
        arr2 = arr2.slice().sort((a, b) => b.variants[0].price - a.variants[0].price);
        setAsc(arr);
        setDsc(arr2);
      }
    } catch (err) {
      console.log(err, 'this is error');
    }
  }

  // Function to handle filtering items by price
  const handlePriceFilter = (priceFilter) => {
    const filtered = asc.filter(
      (product) =>
        (priceFilter.minPrice === '' || product.variants[0].price >= priceFilter.minPrice) &&
        (priceFilter.maxPrice === '' || product.variants[0].price <= priceFilter.maxPrice),
    );
    if (priceFilter.minPrice === 3 && priceFilter.maxPrice === 150) {
      setHide(true);
    } else {
      setHide(false);
    }

    setItem(filtered);
  };

  // useMemo hook to filter items based on search input
  useMemo(() => {
    const filtered = items.filter((product) => product.title.toLowerCase().includes(search.toLowerCase()));
    setItem(filtered);
  }, [items, search]);

  // Function to handle search field input
  const handleSearchField = (e) => {
    setSearchField(e.target.value);
    window.scrollTo({ top: 2300, behavior: 'smooth' });
    setHide(false);
    setCategory('Products');
    if (e.target.value === '') {
      setHide(true);
      getItems();
    }
  };

  // Object to store items grouped by categories
  var fruitArrays = {};
  console.log(categories);
  if (categories) {
    for (var i = 0; i < categories.length; i++) {
      const a = items.filter((item) => item.tags === categories[i].attributes.Type);
      fruitArrays[categories[i].attributes.Type] = [a];
    }
  }

  // Filter items by current category
  const productByCategory = items.filter((item) => item.tags === category);

  // Filter items by specific categories
  const englishbooks = items.filter((item) => item.tags === 'English Books');
  const newArrivalsItems = items.filter((item) => item.tags === 'POS');
  const bestSellersItems = items.filter((item) => item.tags === '');
  const SwamijiKirtans = items.filter((item) => item.tags === 'Swamiji Kirtans');
  const BalMukundBooks = items.filter((item) => item.tags === 'BalMukund Books');
  const EnglishLectures = items.filter((item) => item.tags === 'English Lectures-Swamiji (Audio)');
  const Videos = items.filter((item) => item.tags === 'Videos');

  // Function to handle sorting order change
  const handleSortOrderChange = (value) => {
    if (value === 'asc') {
      setItem(asc);
      setHide(false);
    }
    if (value === 'desc') {
      setItem(dsc);
      setHide(false);
    }
  };

  // Function to handle category change
  const handleCategoriesChange = (value) => {
    setCategory(value);
    setHide(false);
  };

  // Function to clear filters
  const clearFilter = () => {
    dispatch(setPriceFilter([3, 150]));
    const priceFilter = {
      minPrice: 3,
      maxPrice: 150,
    };
    handlePriceFilter(priceFilter);
    handleCategoriesChange('All Products');
    dispatch(setSortOrder(''));
  };

  // Function to clear mobile filters
  const clearMobFilter = () => {
    dispatch(setPriceFilter([3, 150]));
    const priceFilter = {
      minPrice: 3,
      maxPrice: 150,
    };
    handlePriceFilter(priceFilter);
    handleCategoriesChange('All Products');
    dispatch(setIsFilterOpen({}));
    dispatch(setSortOrder(''));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Box width="100%" m="80px auto" className="">
            <div className="container">
              {value === 'All' ? (
                <p className="allproductheading">{category}</p>
              ) : (
                <p className="allproductheading">{value}</p>
              )}
              <Box
                display={breakPoint2 && value === 'All' ? 'flex' : 'none'}
                alignContent={'flex-end'}
                sx={{
                  height: '32px',

                  borderRadius: '5px',
                  background: '#ffdd93',
                  margin: '0 10px',
                  padding: '10px 5px',
                  fontSize: '20px',
                }}>
                <Button onClick={() => dispatch(setIsFilterOpen({}))}>
                  <TuneIcon sx={{ cursor: 'pointer', width: '40%' }} fontSize="large" />
                  <Typography variant="h5" fontWeight="bold" fontFamily="Satoshi, sans-serif">
                    {PRODUCT_CATEGORY.TITLE}
                  </Typography>
                </Button>
              </Box>
              <Box display="flex">
                <Box
                  className="filter-sidebar"
                  sx={{
                    width: '300px',
                    border: '1px solid #ccc',
                    display: breakPoint2 ? 'none' : '',

                    height: 'fit-content',
                  }}>
                  <PriceFilter onPriceChange={handlePriceFilter} />{' '}
                  <div style={{ margin: '0 20px 20px 20px' }}>
                    <div>
                      <SortRadioButtons onChange={handleSortOrderChange} value={sortOrder} />
                      <CategoriesButton onChange={handleCategoriesChange} value={category} />
                      <Button
                        onClick={() => clearFilter()}
                        variant="contained"
                        sx={{
                          marginLeft: '0em',
                          fontWeight: 'bold',
                          fontSize: '1em',
                          padding: '.7em',
                          marginBottom: breakPoint2 ? '3em' : '1em',
                          fontFamily: 'Rubik',
                          background: '#EF6F1F',
                          marginTop: '1em',
                        }}>
                        <strong>{PRODUCT_CATEGORY.CLEAR_FILTER}</strong>
                      </Button>
                    </div>
                  </div>
                </Box>

                <Box
                  width={breakPoint2 ? '100%' : '70%'}
                  maxHeight={item?.length > 3 ? 'auto' : '220px'}
                  marginTop={breakPoint2 ? '10px' : '0'}
                  display={breakPoint3 ? 'block' : 'grid'}
                  gridTemplateColumns={breakPoint ? 'repeat(auto-fill, 250px)' : 'repeat(auto-fill, 210px)'}
                  justifyContent="space-around"
                  rowGap={breakPoint ? '25px' : '40px'}
                  columnGap="2%">
                  {value === 'All' &&
                    (hide
                      ? view
                        ? item.slice(0, 10).map((item) => <Item2 item={item} key={`${item.title}-${item.id}`} />)
                        : item
                            .slice(11, item.length)
                            .map((item) => <Item2 item={item} key={`${item.title}-${item.id}`} />)
                      : item.map((item) => <Item2 item={item} key={`${item.title}-${item.id}`} />))}
                  {value === 'Trending' &&
                    newArrivalsItems.map((item) => <Item2 item={item} key={`${item.title}-${item.id}`} />)}
                  {value === 'Best Sellers' &&
                    bestSellersItems.map((item) => <Item2 item={item} key={`${item.title}-${item.id}`} />)}
                  {value === 'English Books' &&
                    englishbooks.map((item) => <Item2 item={item} key={`${item.title}-${item.id}`} />)}

                  {value === 'Bal Mukund Books' &&
                    BalMukundBooks.map((item) => <Item2 item={item} key={`${item.title}-${item.id}`} />)}
                  {value === 'English Lectures' &&
                    EnglishLectures.map((item) => <Item2 item={item} key={`${item.title}-${item.id}`} />)}

                  {value === 'Swamiji Kirtans' &&
                    SwamijiKirtans.map((item) => <Item2 item={item} key={`${item.title}-${item.id}`} />)}
                  {value === 'Videos' && Videos.map((item) => <Item2 item={item} key={`${item.title}-${item.id}`} />)}
                </Box>
              </Box>
              {/**desktop filter end*/}
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                  sx={{
                    display: hide && value === 'All' ? '' : 'none',
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    background: '#EF6F1F',
                  }}
                  onClick={() => setView(!view)}
                  variant={'contained'}>
                  SHOW {view ? 'ALL' : 'LESS'} {view ? <KeyboardDoubleArrowDownIcon /> : <KeyboardDoubleArrowUpIcon />}
                </Button>
              </div>
            </div>
          </Box>
          {show && (
            <div className="searchbox">
              <div className="">
                <IconButton>
                  <SearchOutlined fontSize="medium" sx={{ color: ' #EF6F1F;' }} />
                </IconButton>
                <input placeholder="Search for Products..." type="text" value={search} onChange={handleSearchField} />
                <IconButton onClick={() => setShow(false)} style={{ position: 'absolute', right: 0, color: '#EF6F1F' }}>
                  <CancelIcon />
                </IconButton>
              </div>
              {search && (
                <div className="searchlist">
                  {item.map((item) => (
                    <div onClick={() => navigate(`/product-details/${item.id}`)} className="lst">
                      {item.title}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/**
           * mobile filter start
           */}
          <Box
            display={isFilterOpen ? 'block' : 'none'}
            // backgroundColor="rgba(0, 0, 0, 0.4)"
            position="fixed"
            zIndex={99}
            width="100%"
            height="100%"
            left="0"
            top="0"
            overflow="auto"
            backgroundColor="#fff">
            <Box overflow="auto" height="100%">
              <IconButton
                onClick={() => dispatch(setIsFilterOpen({}))}
                style={{ position: 'absolute', right: '0', margin: '5px' }}>
                <CancelIcon fontSize="large" />
              </IconButton>
              <Box className="filter-sidebar" padding="30px" marginTop="10px">
                <PriceFilter onPriceChange={handlePriceFilter} />
                <div>
                  <SortRadioButtons onChange={handleSortOrderChange} value={sortOrder} />
                  <Button
                    onClick={breakPoint2 ? () => clearMobFilter() : () => clearFilter()}
                    variant="contained"
                    //color="secondary"
                    sx={{
                      marginLeft: '0em',
                      fontWeight: 'bold',
                      fontSize: '1em',
                      padding: '1em',
                      marginBottom: breakPoint2 ? '3em' : '1em',
                      fontFamily: 'Rubik',
                    }}>
                    <strong>{PRODUCT_CATEGORY.CLEAR}</strong>
                  </Button>
                </div>
              </Box>
            </Box>
          </Box>
          {/**mobile filter end */}
        </Fragment>
      )}
    </>
  );
};

export default ProductCategory;
