import React, { useRef, useState, useEffect } from 'react';
import { Paper, Typography } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { fetchDataFromApi } from "../utils/api";
import { useNavigate } from 'react-router-dom';
const styles = {
  container: {
    display: 'flex',
    scrollBehavior: 'smooth',
    scrollSnapType: 'x mandatory',
    backgroundColor: '#4d4d4d',
    '&::WebkitScrollbar': {
      display: 'none',
    },
  },
  paper: {
    backgroundColor: '#4d4d4d',
    padding: '0px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '20px',
    borderRadius: '0px',
    scrollSnapAlign: 'center',
  },
  arrowButton: {
    color: 'white',
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 1,
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  leftArrowButton: {
    left: 0,
  },
  rightArrowButton: {
    right: 0,
  },
};

import { PAPERS } from '../utils/constants';

const Papers = () => {
  const breakPoint = useMediaQuery('(min-width:1000px)');
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const [coupen, setCoupen] = useState('');

  const scrollLeft = () => {
    containerRef.current.scrollBy({
      left: -300,
      behavior: 'smooth',
    });
  };

  const scrollRight = () => {
    containerRef.current.scrollBy({
      left: 300,
      behavior: 'smooth',
    });
  };

  // gift-shop-advertisement-bar
  const getCoupenCode = async () => {
    try {
      const resp = await fetchDataFromApi("/api/gift-shop-advertisement-bar?populate=*");
      if (resp) {
        setCoupen(resp?.data.attributes);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(()=>{
    getCoupenCode();
  },[])

  return (
    <div style={styles.container} ref={containerRef}>
      <Paper
        onClick={() => {
          navigate('/coupon');
          window.scrollTo(0, 0);
        }}
        sx={{
          backgroundColor: '#291900',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '25px',
          borderRadius: '0px',
          scrollSnapAlign: 'center',
        }}
        elevation={3}
        className="nav-offer">
        <marquee>
          <Typography className="slide-offer" >
            <span>{coupen?.Title}</span>
            <span>{coupen?.shortDescrption}</span>
          </Typography>
        </marquee>
      </Paper>
    </div>
  );
};

export default Papers;
