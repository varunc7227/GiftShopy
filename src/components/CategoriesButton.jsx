import React, { Fragment, useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import useMediaQuery from "@mui/material/useMediaQuery";

import { setIsFilterOpen } from "../state";
import { setSortOrder } from "../state";
import { CATEGORIES_BUTTON } from "../utils/constants";

import "../styles/style.css";
import { AddOutlined, Remove } from "@mui/icons-material";
import Checkbox from "@mui/material/Checkbox";

function CategoriesButton({
  languages,
  handleLanguageChange,
  categoryCheckboxFilter,
  setCategoryCheckboxFilter,
}) {
  const [show, setShow] = useState({
    format: true,
    language: false,
  });

  const handleShowChange = (type) => {
    setShow((prevShow) => ({ ...prevShow, [type]: !prevShow[type] }));
  };

  return (
    <Fragment>
      {/* Languages Below----------------------------------------------------------------- */}

      <div className="flex justify-between mb-2">
        <p
          className="priceheading mt-4"
          style={{
            fontFamily: "Satoshi, sans-serif",
            color: "#645743",
            fontSize: 20,
          }}
        >
          {/* {CATEGORIES_BUTTON.CATEGORY} */}
          Format
        </p>
        {!show.format ? (
          <AddOutlined
            className="mt-4"
            fontSize="large"
            sx={{ color: "black", cursor: "pointer" }}
            onClick={() => handleShowChange("format")}
          />
        ) : (
          <Remove
            className="mt-4"
            fontSize="large"
            sx={{ color: "black", cursor: "pointer" }}
            onClick={() => handleShowChange("format")}
          />
        )}
      </div>
      {show.format && (
        <FormControl component="fieldset" style={{ width: "100%" }}>
          {categoryCheckboxFilter.map(
            (item, index) =>
              item.name !== "English" &&
              item.name !== "Hindi" &&
              item.name !== "Telugu" &&
              item.name !== "Gujarati" &&
              item.name !== "Marathi" &&
              item.name !== "Odia" && (
                <FormControlLabel
                  key={index}
                  control={
                    <Checkbox
                      checked={item.selected}
                      onChange={() => setCategoryCheckboxFilter(item)}
                      name={item.name}
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
                      sx={{
                        marginRight: "36px",
                        fontSize: "15px",
                        fontFamily: "Satoshi, sans-serif",
                        color: "#645743",
                      }}
                    >
                      {item.name}
                    </Typography>
                  }
                  labelPlacement="end"
                />
              )
          )}
          {/* <p
          style={{
            alignSelf: "end",
            fontFamily: "Satoshi, sans-serif",
            fontSize: 12,
            fontWeight: 800,
            color: " #4795D8",
            cursor: "pointer",
          }}
          onClick={() => {
            setSeeMore(!seeMore);
          }}
        >
          SEE {!seeMore ? "MORE" : "LESS"}
        </p> */}
        </FormControl>
      )}
      <div className="flex justify-between mb-2">
        <p
          className="priceheading mt-4"
          style={{
            fontFamily: "Satoshi, sans-serif",
            color: "#645743",
            fontSize: 20,
          }}
        >
          {/* {CATEGORIES_BUTTON.CATEGORY} */}
          Language
        </p>
        {!show.language ? (
          <AddOutlined
            className="mt-4"
            fontSize="large"
            sx={{ color: "black", cursor: "pointer" }}
            onClick={() => handleShowChange("language")}
          />
        ) : (
          <Remove
            className="mt-4"
            fontSize="large"
            sx={{ color: "black", cursor: "pointer" }}
            onClick={() => handleShowChange("language")}
          />
        )}
      </div>
      {show.language && (
        <FormControl component="fieldset">
          {languages?.map((item, index) => (
            <FormControlLabel
              key={index}
              control={
                <Checkbox
                  checked={item.selected}
                  onChange={() => handleLanguageChange(index)}
                  name={item.name}
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
                  sx={{
                    marginRight: "36px",
                    fontSize: "15px",
                    fontFamily: "Satoshi, sans-serif",
                    color: "#645743",
                  }}
                >
                  {item.name}
                </Typography>
              }
              labelPlacement="end"
            />
          ))}
        </FormControl>
      )}
    </Fragment>
  );
}

export default CategoriesButton;
