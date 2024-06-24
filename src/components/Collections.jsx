import React, { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { encode as btoa } from 'base-64';
import { useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';

import Products from './Products';
import Loader from './Loader';

const Collections = () => {
  const params = useParams();
  const i = useSelector((state) => state.cart.items);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getCollections() {
    var headers = new Headers();
    headers.append(
      'Authorization',
      'Basic ' + btoa('ce9a3ad16708f3eb4795659e809971c4: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'),
    );

    const result = await fetch(`http://localhost:5000/${params.collectionId}/products.json`, {
      headers: headers,
    });
    const resp = await result.json();
    if (resp) {
      console.log(resp.products, 'products');
      setProducts(resp?.products);
    }
    setLoading(false);
  }

  useEffect(() => {
    getCollections();
  }, [params.collectionId]);


  // This useEffect hook will run every time the component mounts
  useEffect(() => {
    // Using the window.scrollTo method to scroll to the top of the page
    window.scrollTo(0, 0);
  }, []); // The empty array means it will only run on mount and unmount

  return (
    <Box
      margin="20px auto"
      display="grid"
      gridTemplateColumns={'repeat(auto-fill, 200px)'}
      justifyContent="space-around"
      rowGap="100px"
      columnGap="3.33%">
      {' '}
      {loading ? (
        <Loader />
      ) : products.length > 0 ? (
        products.map((item) => <Products item={item} key={`${item.title}-${item.id}`} />)
      ) : (
        <Typography variant="h1" marginTop={'5em'}>
          {' '}
          No Products To Show
        </Typography>
      )}
    </Box>
  );
};

export default Collections;
