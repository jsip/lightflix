import React from "react";
import NavBar from "./NavBar";
import Wrapper from "./Wrapper";

const Layout = ({ children }) => {
  return (
    <>
      <NavBar></NavBar>
      <Wrapper>{children}</Wrapper>
    </>
  );
};

export default Layout;
