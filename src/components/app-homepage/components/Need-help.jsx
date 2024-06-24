import { HelpOutline, MailOutline } from "@mui/icons-material";
import { Typography, useMediaQuery } from "@mui/material";
import { Fragment, useState } from "react";
import HelpDesk from "../../HelpDesk";
import { useNavigate } from "react-router-dom";

function NeedHelp() {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:750px)");
  const [showHelpDeskForm, setShowHelpDeskForm] = useState(false);
  const handleHelpDeskFormChange = () => {
    setShowHelpDeskForm(!showHelpDeskForm);
  };
  return (
    <Fragment>
      <Typography
        variant={isMobile ? "h2" : "h1"}
        textAlign="left"
        marginTop="2rem"
      >
        <h2
          className="about_jkyog_gift_shop"
          style={{ fontFamily: "Satoshi, sans-serif" }}
        >
          Need help? You're in the right place
        </h2>
      </Typography>
      <div className="need_help">
        <button className="need_help_buttons" onClick={() => navigate("/faq")}>
          <HelpOutline sx={iconStyle} fontSize="large" />
          FAQ's
        </button>
        <button
          className="need_help_buttons"
          onClick={handleHelpDeskFormChange}
        >
          <MailOutline sx={iconStyle} fontSize="large" />
          Help Desk
        </button>
      </div>
      <HelpDesk
        showForm={showHelpDeskForm}
        onFormChange={handleHelpDeskFormChange}
      />
    </Fragment>
  );
}

const iconStyle = {
  cursor: "pointer",
  width: "1.5em",
  height: "1.2em",
};

export default NeedHelp;
