import React, { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { Typography } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { setSortOrder } from "../state";
import { useDispatch, useSelector } from "react-redux";
import { setIsFilterOpen } from "../state";
import useMediaQuery from "@mui/material/useMediaQuery";
import "../styles/style.css";
import { Close } from "@mui/icons-material";

function SortRadioButtons({ onChange, value }) {
  // const sortOrder = useSelector((state) => state.cart.sortOrder);
  const breakPoint = useMediaQuery("(max-width:700px)");
  // const isFilterOpen = useSelector((state) => state.cart.isFilterOpen);
  // const dispatch = useDispatch();

  const handleChange = (value) => {
    onChange(value);
  };
  const handleMobChange = (value) => {
    onChange(value);
  };
  return (
    <>
      {/* <p className="priceheading">SORT BY</p> */}
      <div className="flex justify-between mb-2">
        <p
          className="priceheading"
          style={{
            fontFamily: "Satoshi, sans-serif",
            color: "#645743",
            fontSize: 20,
          }}
        >
          SORT BY
        </p>
        {value !== null && (
          <Close fontSize="large" sx={{ color: "black", cursor: "pointer" }} onClick={() => handleChange(null)}/>
        )}
      </div>
      <FormControl component="fieldset">
        <RadioGroup
          aria-label="sortOrder"
          name="sortOrder"
          value={value}
          onChange={(event)=>{breakPoint ? handleMobChange(event.target.value) : handleChange(event.target.value)}}
          row
        >
          <FormControlLabel
            value="asc"
            control={
              <Radio
                sx={{
                  color: "black",
                  "&.Mui-checked": {
                    color: "rgb(255, 109, 47)",
                  },
                }}
              />
            }
            label={
              <Typography
                variant="h5"
                style={{
                  fontSize: "15px",
                  fontFamily: "Satoshi, sans-serif",
                  color: "#645743",
                }}
              >
                Price <b>Low</b> to <b>High </b> <ArrowUpwardIcon />
              </Typography>
            }
            labelPlacement="end"
          />
          <FormControlLabel
            value="desc"
            control={
              <Radio
                sx={{
                  color: "black",
                  "&.Mui-checked": {
                    color: "rgb(255, 109, 47)",
                  },
                }}
              />
            }
            label={
              <Typography
                variant="h5"
                style={{
                  fontSize: "15px",
                  fontFamily: "Satoshi, sans-serif",
                  color: "#645743",
                }}
              >
                Price <b> High</b> to <b>Low</b> <ArrowDownwardIcon />
              </Typography>
            }
            labelPlacement="end"
          />
        </RadioGroup>
      </FormControl>
    </>
  );
}

export default SortRadioButtons;
