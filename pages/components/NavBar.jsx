import React, { useEffect, useState } from "react";
import { Image, Flex, Spacer, Link, Box } from "@chakra-ui/react";
import styles from "../../styles/NavBar.module.css";
import Search from "./Search";
import XSMovieCard from "./XSMovieCard";
import NextLink from "next/link";

const NavBar = () => {
  const [query, setQuery] = useState("");
  const [movieData, setMovieData] = useState("");
  const queryHandler = (e) => {
    if (e.target.value.trim() !== "") {
      setQuery(e.target.value);
    } else {
      setQuery(null);
    }
  };

  return (
    <Flex className={styles.header}>
      <NextLink href="/" rel="noopener noreferrer">
        <Link className={styles.logoCont}>
          <Image src="/logo.png" alt="logo" className={styles.logo} />
          <div className={styles.logoText}>
            <p>LiteFlix</p>
          </div>
        </Link>
      </NextLink>
      <Spacer />
      <Box>
        <Search onChangeHandler={queryHandler} />
        <br />
        {!query ? "Search something to begin." : `Searching for ${query}`}
        <XSMovieCard query={query} />
        {/* {!isEmpty ? (
          loading ? (
            <div>Loading movies...</div>
          ) : (
          )
        ) : (
          "No matching movies."
        )} */}
      </Box>
    </Flex>
  );
};

export default NavBar;
