// Import necessary modules and components
import { Box, CircularProgress, IconButton } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import CancelIcon from "@mui/icons-material/Cancel";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchDataFromApi } from "../utils/api";
import {
  ArrowForwardIos,
  ArrowForward,
  ArrowBackIos,
  ArrowCircleLeft,
  ArrowBackIosNew,
  West,
  Close,
} from "@mui/icons-material";
import Jklog from "../assets/logo/jklogo.png";

// Import Redux actions
import { setIsNavOpen, setValue } from "../state";

// Define the Sidebar component
const SideBar = () => {
  // Initialize necessary hooks and selectors
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const value = useSelector((state) => state.cart.value);
  const isNavOpen = useSelector((state) => state.cart.isNavOpen);
  const [megaMenu, setMegaMenu] = useState([]);
  const [displayMenuType, setDisplayMenuType] = useState({
    level: 0,
    data: [],
    title: "",
  });
  const [subItemVisibility, setSubItemVisibility] = useState({});

  useEffect(() => {
    getMegaMenu();
  }, []);
  const getMegaMenu = async () => {
    try {
      const response = await fetchDataFromApi("/api/web-app-mega-menu");
      console.log(response, "MegaMenu-sidebarmenu");
      if (response) {
        setMegaMenu(response?.data.attributes.menuItems);
        setDisplayMenuType({
          ...displayMenuType,
          level: 1,
          data: response?.data.attributes.menuItems,
        });
      }
    } catch (error) {
      console.error("Error fetching MegaMenu:", error);
    }
  };
  // Handle tab change in the Sidebar
  const handleChange = (event, newValue) => {
    dispatch(setValue(newValue));
    window.scrollTo(0, 0);
  };

  // Handle navigation menu item click
  const handleNavMenuClick = (cat) => {
    navigate(`/category/${cat}`);
  };

  const handleNavigate = (subItem) => {
    navigate(
      `/search?category=${
        subItem.TITLE ? subItem.TITLE : subItem.ITEM_TITLE
      }&filter=All&searchInput=none`
    );
    dispatch(setIsNavOpen({}));
  };

  const handleLevelLastClick = (index) => {
    setSubItemVisibility((prevVisibility) => ({
      ...prevVisibility,
      [index]: !prevVisibility[index],
    }));
  };

  // Render the Sidebar component
  return (
    <Box display={isNavOpen ? "block" : "none"} className="sidebarmenu">
      <Box overflow="auto" height="100%" padding="1rem">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <img
            src={Jklog}
            alt="not found"
            onClick={() => change()}
            style={{ width: "6rem", height: "3rem" }}
            loading="lazy"
          />
          <IconButton
            onClick={() => dispatch(setIsNavOpen({}))}
            style={{ color: "brown" }}
          >
            <Close sx={{ width: "1.5rem", height: "1.5rem" }} />
          </IconButton>
        </div>

        {/* For displaying main menu or level-1 */}
        {displayMenuType.level === 1 && (
          <div className="sidebarMenuLeftPanel">
            <div className="sidebarMenuLeftPanelHeader">
              <p
                style={{
                  lineHeight: 1.4,
                  letterSpacing: ".1299px",
                  fontSize: 18,
                }}
              >
                Browse Categories
              </p>
            </div>
            {megaMenu.length > 0 ? (
              megaMenu.map((subItem, index) => (
                <div
                  key={index}
                  className="sidebarMenuitem"
                  onClick={() => {
                    subItem.SUB_CATEGORIES.length > 0
                      ? setDisplayMenuType({
                          level: 2,
                          data: subItem.SUB_CATEGORIES,
                          title: subItem.TITLE,
                        })
                      : handleNavigate(subItem);
                  }}
                >
                  {subItem.TITLE}
                  <ArrowForwardIos size="small" sx={{ margin: "2px" }} />
                </div>
              ))
            ) : (
              <div
                style={{
                  padding: "1rem",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <CircularProgress />
              </div>
            )}
          </div>
        )}

        {/* For displaying sub-categories or level-2 */}
        {displayMenuType.level === 2 && (
          <div className="sidebarMenuLeftPanel">
            <div className="sidebarMenuLeftPanelHeader" style={{ gap: "1rem" }}>
              <IconButton
                onClick={() =>
                  setDisplayMenuType({
                    ...displayMenuType,
                    level: 1,
                    title: "",
                  })
                }
                style={{ color: "brown", marginTop: "-7px" }}
              >
                <West sx={{ width: "1.5rem", height: "1.5rem" }} />
              </IconButton>
              <p
                style={{
                  lineHeight: 1.4,
                  letterSpacing: ".1299px",
                  fontSize: 18,
                }}
              >
                {displayMenuType.title}
              </p>
            </div>
            {displayMenuType.data.length > 0 &&
              displayMenuType.data.map((subItem, index) => (
                <div key={index} className="sidebarMenuitem-parent">
                  <div
                    className="sidebarMenuitem"
                    style={{ padding: "5rem" }}
                    onClick={() => handleLevelLastClick(index)}
                  >
                    {subItem.CATEGORY_TITLE}
                    <div style={{ paddingLeft: "2rem" }}>
                      <ArrowForwardIos size="small" sx={{ margin: "2px" }} />
                    </div>
                  </div>
                  {subItemVisibility[index] &&
                    subItem.SUB_ITEMS.map((childItem, index) => (
                      <div
                        className="sidebarMenuitem-child"
                        key={index}
                        onClick={() => handleNavigate(childItem)}
                      >
                        {childItem.ITEM_TITLE}
                      </div>
                    ))}
                </div>
              ))}
            <div className="sidebarMenuPanelImage">
              <div className="sidebarMenuPanelImageDiv">
                <img
                  className="sidebarMenuPanelImageImg"
                  src="https://jipl-strapi-aws-s3-images-bucket.s3.amazonaws.com/bannerimage_1_5ec00547a5.png"
                />
                <p
                  style={{
                    marginTop: "1rem",
                    marginBottom: 0,
                    fontSize: "12.99px",
                    lineHeight: 1.4,
                    letterSpacing: ".1299px",
                  }}
                >
                  Editor's Picks
                </p>
                <p
                  style={{
                    marginTop: "5px",
                    marginBottom: 0,
                    fontWeight: 500,
                    fontSize: 16,
                    lineHeight: 1.25,
                    letterSpacing: ".08px",
                  }}
                >
                  JKYog Authors
                </p>
              </div>
            </div>
          </div>
        )}
      </Box>
    </Box>
  );
};

// Export the Sidebar component
export default SideBar;
