import { Fragment } from "react";
import { Box } from "@mui/material";
import NavMenu from "./NavMenu";

function NoResultFound() {
  return (
    <Fragment>
      <Box width="100%" m="80px auto">
        <div className="container">
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/error-no-search-results_2353c5.png" loading="lazy"/>
          </div>
          <p
            style={{
              fontSize: 26,
              fontWeight: 500,
              margin: "20px 0 10px",
              textAlign: "center",
            }}
          >
            Sorry, requested item not found at this time!
          </p>
          <p
            style={{
              fontSize: 20,
              fontWeight: 500,
              margin: "20px 0 10px",
              textAlign: "center",
              marginBottom: 8,
              color: "#ff6d31",
            }}
          >
            Please check the spelling or try searching for something else
          </p>
        </div>
      </Box>
    </Fragment>
  );
}

export default NoResultFound;
