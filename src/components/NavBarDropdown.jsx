import { Typography, CircularProgress } from "@mui/material";
import React, { useState, useEffect } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { fetchDataFromApi } from "../utils/api";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setMegaMenu } from "../state";

function NavbarDropdown({ updatingProps }) {
  const navigate = useNavigate();
  const megaMenu = useSelector((state) => state.cart.megaMenu);
  const dispatch = useDispatch();
  const [hideShowNav, setHideShowNav] = useState(false);

  useEffect(() => {
    setHideShowNav(false);
  }, [updatingProps]);

  useEffect(() => {
    const getMegaMenu = async () => {
      if (megaMenu.length > 0) {
        return;
      }

      try {
        const response = await fetchDataFromApi("/api/web-app-mega-menu");
        if (response) {
          dispatch(setMegaMenu(response?.data.attributes.menuItems));
        }
      } catch (error) {
        console.error("Error fetching MegaMenu:", error);
      }
    };

    getMegaMenu();
  }, [dispatch]);

  const handleNavigate = (route) => {
    const searchString = route.replace(/'/g, "");
    navigate(
      `/search?category=${searchString.toString()}&filter=All&searchInput=none`
    );
  };

  const handleNavClick = (value) => {
    setHideShowNav(value);
  };

  return (
    <Navbar.Collapse
      id="basic-navbar-nav"
      fixed="top"
      style={{ position: "sticky!important" }}
    >
      <Nav className="me-auto custom-nav">
        {megaMenu.length > 0 ? (
          megaMenu.map((item, index) =>
            item.SUB_CATEGORIES.length > 0 ? (
              <NavDropdown
                key={item.TITLE + "-" + index}
                title={item.TITLE}
                id="basic-nav-dropdown"
                onClick={() => handleNavClick(true)}
              >
                {hideShowNav && (
                  <div className="dropdownCoverBox">
                    {item.SUB_CATEGORIES.map((subItem, index) => (
                      <>
                        <div
                          key={subItem.CATEGORY_TITLE + "-" + index}
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <NavDropdown.Item
                            className="dropdownitem dropdownitem-selected"
                            style={{ justifyContent: "space-between",fontWeight: 700 }}
                            onClick={() => {
                              handleNavigate(subItem.CATEGORY_TITLE);
                            }}
                            // to={`/search?category=${subItem.CATEGORY_TITLE.toString()}&filter=All&searchInput=none`}
                            // as={Link}
                          >
                            {subItem.CATEGORY_TITLE}
                          </NavDropdown.Item>
                          <div className="megamenu-subItems">
                            {subItem.SUB_ITEMS.map((sub, index) => (
                              <Typography
                                key={sub.ITEM_TITLE + "-" + index}
                                className="megamenu-subItems-text"
                                onClick={() => handleNavigate(sub.ITEM_TITLE)}
                                // to={`/search?category=${sub.ITEM_TITLE.toString()}&filter=All&searchInput=none`}
                                // as={Link}
                              >
                                {sub.ITEM_TITLE}
                              </Typography>
                            ))}
                          </div>
                        </div>
                      </>
                    ))}
                  </div>
                )}
              </NavDropdown>
            ) : (
              <Nav.Link
                key={item.TITLE + "-" + index}
                className="nav-item"
                id="basic-nav-dropdown"
              >
                {item.TITLE}
              </Nav.Link>
            )
          )
        ) : (
          <div style={{ padding: "1rem" }}>
            <CircularProgress />
          </div>
        )}
      </Nav>
    </Navbar.Collapse>
  );
}

export default NavbarDropdown;
