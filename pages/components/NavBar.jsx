import React, { useEffect, useState } from "react";
import { Image, Flex, Spacer, Link, Box, Input } from "@chakra-ui/react";
import styles from "../../styles/NavBar.module.css";
import Search from "./Search";
import XSMovieCard from "./XSMovieCard";
import NextLink from "next/link";
import { useRouter } from "next/router";

const NavBar = () => {
  const router = useRouter();
  let path = router.pathname.split("/");

  const [query, setQuery] = useState();

  const queryHandler = (e) => {
    if (e.target.value.trim() !== "") {
      setQuery(e.target.value);
    } else {
      setQuery(null);
    }
  };

  const clickHandler = () => setQuery("");

  const nav = (
    <Flex className={styles.header}>
      <NextLink href="/" rel="noopener noreferrer">
        <Link className={styles.logoCont}>
          <Image src="/logo.png" alt="logo" className={styles.logo} />
          <div className={styles.logoText}>
            <p>LightFlix</p>
          </div>
        </Link>
      </NextLink>
      <Spacer />
      <NextLink href="/movies" rel="noopener noreferrer">
        <Link className={styles.logoCont}>
          <div className={styles.logoText}>
            <p>Movies</p>
          </div>
        </Link>
      </NextLink>
      <Spacer />
      <Box>
        <Search
          onChangeHandler={queryHandler}
          query={query}
          placeholder={`Search ${path[1] || "LightFlix"}`}
        />
        {!query ? `Search ${path[1] || "something"} to begin.` : `Searching for ${query}`}
        <XSMovieCard query={query} clickHandler={clickHandler} />
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
  return nav;
};

export default NavBar;
