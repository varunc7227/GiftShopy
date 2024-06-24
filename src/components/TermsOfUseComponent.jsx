import React, { useEffect } from "react";
import "./SiteMap.css";
import NavMenu from "./NavMenu";
import { Typography } from "@mui/material";

const TermsOfUseComponent = () => {
  // This useEffect hook will run every time the component mounts
  useEffect(() => {
    // Using the window.scrollTo method to scroll to the top of the page
    window.scrollTo(0, 0);
  }, []); // The empty array means it will only run on mount and unmount

  return (
    <div>
      <div
        className="main-section container"
        style={{ justifyContent: "center" }}
      >
        <div className="terms-of-use-container">
          <Typography
            style={{
              fontFamily: "Satoshi, sans-serif",
              fontSize: "2rem",
              fontWeight: 600,
              padding: "2rem 0",
              textAlign: "center",
            }}
          >
            Terms of Use
          </Typography>
          <section className="terms-content">
            {/* <Typography
              style={{
                fontFamily: "Satoshi, sans-serif",
                fontSize: "1.9rem",
                fontWeight: 600,
                padding: "2rem 0",
                textAlign: "left",
              }}
            >
              Welcome to Our Website
            </Typography> */}
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
              These terms and conditions outline the rules and regulations for
              the use of Company Name's Website, located at www.example.com. By
              accessing this website we assume you accept these terms and
              conditions. Do not continue to use Website Name if you do not
              agree to take all of the terms and conditions stated on this page.
            </Typography>
            {/* ... additional terms and conditions content ... */}
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfUseComponent;
