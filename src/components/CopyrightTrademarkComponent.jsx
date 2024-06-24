import React, { useEffect } from "react";
import "./SiteMap.css";
import NavMenu from "./NavMenu";
import { Typography } from "@mui/material";

const CopyrightTrademarkComponent = () => {
  // This useEffect hook will run every time the component mounts
  useEffect(() => {
    // Using the window.scrollTo method to scroll to the top of the page
    window.scrollTo(0, 0);
  }, []); // The empty array means it will only run on mount and unmount

  const currentYear = new Date().getFullYear(); // Dynamically set the current year

  return (
    <div>
      <div className="main-section container">
        <div className="copyright-trademark-container">
          <Typography
            style={{
              fontFamily: "Satoshi, sans-serif",
              fontSize: "2rem",
              fontWeight: 600,
              padding: "2rem 0",
              textAlign: "center",
            }}
          >
            Copyright & Trademark
          </Typography>
          <section className="content">
            <Typography
              style={{
                fontFamily: "Satoshi, sans-serif",
                fontSize: "1.9rem",
                fontWeight: 300,
                padding: "2rem 0",
                textAlign: "left",
              }}
            >
              Intellectual Property Rights
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
              Unless otherwise stated, Company Name and/or its licensors own the
              intellectual property rights for all material on Company Name. All
              intellectual property rights are reserved. You may access this
              from Company Name for your own personal use subjected to
              restrictions set in these terms and conditions.
            </Typography>
            {/* ... additional copyright and trademark information ... */}
            <Typography
              style={{
                fontFamily: "Satoshi, sans-serif",
                fontSize: "1.9rem",
                fontWeight: 300,
                padding: "2rem 0",
                textAlign: "left",
              }}
            >
              Trademark Information
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
              The trademarks, logos, and service marks displayed on this website
              are the property of Company Name or their licensors. You are not
              permitted to use these Marks without the prior written consent of
              Company Name or such third party which may own the Mark.
            </Typography>

            {/* ... more content as needed ... */}

            <footer style={{ marginTop: "2rem" }}>
              <Typography
                style={{
                  fontFamily: "Satoshi, sans-serif",
                  fontSize: "0.9rem",
                  fontWeight: 800,
                  color: "dimgrey",
                  letterSpacing: "0.5px",
                  lineHeight: "30px",
                }}
              >
                &copy; {currentYear} Company Name. All rights reserved.
              </Typography>
            </footer>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CopyrightTrademarkComponent;
