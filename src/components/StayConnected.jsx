import React, { useState } from "react";
import "./StayConnected.css"; // Import the CSS file for styling
import axios from "axios";
import { Typography, useMediaQuery } from "@mui/material";
import "../styles/Item2.css";

// Component CSS styles
const styles = {
  container: {
    width: "200px",
    padding: "20px",
    textAlign: "center",
  },
  messageBox: {
    margin: "10px",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "4px",
  },
  success: {
    backgroundColor: "#d4edda",
    color: "#155724",
    borderColor: "#c3e6cb",
  },
  error: {
    backgroundColor: "#f8d7da",
    color: "#721c24",
    borderColor: "#f5c6cb",
  },
};

const StayConnected = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(true);
  const breakPoint = useMediaQuery("(max-width:760px)");

  const handleSubmit = (event) => {
    event.preventDefault();

    const url = `https://sso.jkyog.org/api/v1/customer/subscribe`;
    const payload = {
      email: email,
    };

    axios
      .post(url, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setMessage("Thank you for subscribing to our newsletter!");
        setIsSuccess(true);
      })
      .catch((error) => {
        setMessage("This email is already registered for our newsletter.");
        setIsSuccess(false);
      });
  };

  return (
    <div className="stay-connected">
      <Typography
        fontFamily={"Lora"}
        variant={breakPoint ? "h2" : "h1"}
        textAlign="left"
        marginTop="2rem"
      >
        <h2
          className="about_jkyog_gift_shop"
          style={{ fontFamily: "Satoshi, sans-serif" }}
        >
          Stay Connected
        </h2>
      </Typography>
      <div style={{ padding: breakPoint ? "1rem 2rem" : "1rem 10rem" }}>
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
          Explore our vibrant online community and stay connected with the
          latest updates, news, and events.Join us on a journey of connection –
          stay updated, engaged, and inspired with our interactive website.
        </Typography>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="email-input"
        />
        <button type="submit" className="subscribe-button">
          Subscribe
        </button>
      </form>
      {message && (
        <div
          style={{
            ...styles.messageBox,
            ...(isSuccess ? styles.success : styles.error),
          }}
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default StayConnected;
