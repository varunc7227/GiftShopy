import { Slider } from "@mui/material";
import "../styles/pricefilter.css";
import { setPriceFilter } from "../state";
import { useDispatch, useSelector } from "react-redux";
import "../theme.js";
import "../styles/style.css";

import { PRICE_FILTER } from "../utils/constants";

function PriceFilter({ onPriceChange, onClear }) {
  const value = useSelector((state) => state.cart.priceFilter);
  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    const priceFilter = {
      minPrice: parseInt(newValue[0]),
      maxPrice: parseInt(newValue[1]),
    };
    dispatch(setPriceFilter(newValue));
    onPriceChange(priceFilter);
  };

  function valuetext(value) {
    return `${value}°C`;
  }
  return (
    <>
      <div className="filterTitle">{PRICE_FILTER.TITLE}</div>
      <div className="silders">
        <div className="priceheading">{PRICE_FILTER.HEADER}</div>
        <div className="slidep">
          {" "}
          <Slider
            size="large"
            getAriaLabel={() => "Temperature range"}
            defaultValue={3}
            getAriaValueText={valuetext}
            value={value}
            valueLabelDisplay="on"
            onChange={handleChange}
            min={3}
            max={150}
            sx={{ color: "#4795d8" }}
          />{" "}
        </div>
      </div>
    </>
  );
}

export default PriceFilter;
