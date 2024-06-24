import { Box } from "@mui/material";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import NavMenu from "../components/NavMenu";
import React, { useEffect } from "react";

const Confirmation = () => {
  // This useEffect hook will run every time the component mounts
  useEffect(() => {
    // Using the window.scrollTo method to scroll to the top of the page
    window.scrollTo(0, 0);
  }, []); // The empty array means it will only run on mount and unmount

  return (
    <Box m="90px auto" width="80%" height="50vh">
      <Alert severity="success">
        <AlertTitle>Success</AlertTitle>
        You have successfully made an Order —{" "}
        <strong>Congrats on Making your Purchase</strong>
      </Alert>
    </Box>
  );
};

export default Confirmation;
