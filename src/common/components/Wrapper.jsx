import { Box } from "@chakra-ui/react";
import React from "react";
import styles from "../../styles/Main.module.scss";

const Wrapper = ({ children }) => {
  return <Box className={styles.wrapper}>{children}</Box>;
};

export default Wrapper;
