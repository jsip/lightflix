import { Box } from "@chakra-ui/react";
import React from "react";
import styles from "../../styles/Main.module.scss";
import Footer from "./Footer";
import NavBar from "./NavBar";
import Wrapper from "./Wrapper";

const Layout = ({ children }) => {
  return (
    <div className={styles.containerBg}>
      <Box className={styles.container}>
        <NavBar></NavBar>
        <Wrapper>{children}</Wrapper>
        <Footer />
      </Box>
    </div>
  );
};

export default Layout;
