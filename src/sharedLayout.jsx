import React from "react";
import { Outlet } from "react-router-dom";
import NavMenu from "./components/NavMenu";
import Footer from "./components/Footer";
import CartMenu from "./components/CartMenu";
import QuickView from "./components/QuickView";
import SideBar from "./components/SideBar";

function SharedLayout() {
  return (
    <>
      <NavMenu />
      <main>
        <Outlet />
      </main>

      <CartMenu />
      <QuickView />
      <SideBar />
      <Footer />
    </>
  );
}

export default SharedLayout;
