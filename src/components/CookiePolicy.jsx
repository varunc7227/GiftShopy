import React, { useEffect } from "react";
import "./SiteMap.css";
import NavMenu from "./NavMenu";
import { Typography } from "@mui/material";

const CookiePolicy = () => {
  // This useEffect hook will run every time the component mounts
  useEffect(() => {
    // Using the window.scrollTo method to scroll to the top of the page
    window.scrollTo(0, 0);
  }, []); // The empty array means it will only run on mount and unmount

  return (
    <div>
      <div className="main-section container">
        <div className="cookie-policy-container">
          <Typography
            style={{
              fontFamily: "Satoshi, sans-serif",
              fontSize: "2rem",
              fontWeight: 600,
              padding: "2rem 0",
              textAlign: "center",
            }}
          >
            Cookie Policy
          </Typography>
          <section className="policy-content">
            <Typography
              style={{
                fontFamily: "Satoshi, sans-serif",
                fontSize: "1.9rem",
                fontWeight: 300,
                padding: "2rem 0",
                textAlign: "left",
              }}
            >
              What Are Cookies
            </Typography>
            <Typography
              style={{
                fontFamily: "Satoshi, sans-serif",
                fontSize: "1.1rem",
                fontWeight: 400,
                color: "dimgrey",
                letterSpacing: "0.5px",
                lineHeight: "30px",
              }}
            >
              As is common practice with almost all professional websites, this
              site uses cookies, which are tiny files that are downloaded to
              your computer, to improve your experience. This page describes
              what information they gather, how we use it, and why we sometimes
              need to store these cookies.
            </Typography>
            <Typography
              style={{
                fontFamily: "Satoshi, sans-serif",
                fontSize: "1.9rem",
                fontWeight: 300,
                padding: "2rem 0",
                textAlign: "left",
              }}
            >
              How We Use Cookies
            </Typography>
            <Typography
              style={{
                fontFamily: "Satoshi, sans-serif",
                fontSize: "1.1rem",
                fontWeight: 400,
                color: "dimgrey",
                letterSpacing: "0.5px",
                lineHeight: "30px",
              }}
            >
              As is common practice with almost all professional websites, this
              site uses cookies, which are tiny files that are downloaded to
              your computer, to improve your experience. This page describes
              what information they gather, how we use it, and why we sometimes
              need to store these cookies.
            </Typography>
            <Typography
              style={{
                fontFamily: "Satoshi, sans-serif",
                fontSize: "1.9rem",
                fontWeight: 300,
                padding: "2rem 0",
                textAlign: "left",
              }}
            >
              Disabling Cookies
            </Typography>
            <Typography
              style={{
                fontFamily: "Satoshi, sans-serif",
                fontSize: "1.1rem",
                fontWeight: 400,
                color: "dimgrey",
                letterSpacing: "0.5px",
                lineHeight: "30px",
              }}
            >
              As is common practice with almost all professional websites, this
              site uses cookies, which are tiny files that are downloaded to
              your computer, to improve your experience. This page describes
              what information they gather, how we use it, and why we sometimes
              need to store these cookies.
            </Typography>
            <Typography
              style={{
                fontFamily: "Satoshi, sans-serif",
                fontSize: "1.9rem",
                fontWeight: 300,
                padding: "2rem 0",
                textAlign: "left",
              }}
            >
              What Are Cookies
            </Typography>
            <Typography
              style={{
                fontFamily: "Satoshi, sans-serif",
                fontSize: "1.1rem",
                fontWeight: 400,
                color: "dimgrey",
                letterSpacing: "0.5px",
                lineHeight: "30px",
              }}
            >
              As is common practice with almost all professional websites, this
              site uses cookies, which are tiny files that are downloaded to
              your computer, to improve your experience. This page describes
              what information they gather, how we use it, and why we sometimes
              need to store these cookies.
            </Typography>
            <Typography
              style={{
                fontFamily: "Satoshi, sans-serif",
                fontSize: "1.9rem",
                fontWeight: 300,
                padding: "2rem 0",
                textAlign: "left",
              }}
            >
              More Information
            </Typography>
            <Typography
              style={{
                fontFamily: "Satoshi, sans-serif",
                fontSize: "1.1rem",
                fontWeight: 400,
                color: "dimgrey",
                letterSpacing: "0.5px",
                lineHeight: "30px",
              }}
            >
              As is common practice with almost all professional websites, this
              site uses cookies, which are tiny files that are downloaded to
              your computer, to improve your experience. This page describes
              what information they gather, how we use it, and why we sometimes
              need to store these cookies.
            </Typography>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;
