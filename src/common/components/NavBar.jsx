import { ChevronDownIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  IconButton,
  Img,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Spacer,
  Switch,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React, { useState } from "react";
import styles from "../../styles/NavBar.module.scss";
import GetRouterPath from "../utils/GetRouterPath";
import translatePath from "../utils/translatePath";
import LocaleSwitch from "./LocaleSwitch";
import SCards from "./SCards";
import Search from "./Search";

const NavBar = () => {
  const [query, setQuery] = useState("" || undefined);
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
          <Img src="/logo.png" alt="logo" className={styles.logo} />
          <div className={styles.logoText}>
            <p>LightFlix</p>
          </div>
        </Link>
      </NextLink>
      <Spacer />
      <Box mr={4}>
        <Search
          onChangeHandler={queryHandler}
          query={query}
          placeholder={`Recherchez ${
            translatePath(GetRouterPath()) || "LightFlix"
          }`}
        />
        {!query ? `\u00A0` : `Recherche pour ${query}...`}
        {!query ? (
          ""
        ) : (
          <div
            style={{
              marginTop: "2vh",
              position: "absolute",
              right: 20,
              backgroundColor: "#fff",
              zIndex: 99,
              padding: "2em",
              border: "2px solid gainsboro",
              borderRadius: "15px",
            }}
          >
            <SCards query={query} clickHandler={clickHandler} />
          </div>
        )}
      </Box>
      <Menu closeOnSelect={false}>
        <IconButton as={MenuButton} icon={<ChevronDownIcon />}></IconButton>
        <MenuList>
          <MenuGroup title="Langages">
            <MenuItem>
              <LocaleSwitch />
            </MenuItem>
          </MenuGroup>
          <MenuDivider />
          <MenuGroup title="Thème">
            <MenuItem>
              <Box>
                <MoonIcon />
                &nbsp;&nbsp;
                <Switch colorScheme="teal" size="lg" />
                &nbsp;&nbsp;
                <SunIcon />
              </Box>
            </MenuItem>
          </MenuGroup>
        </MenuList>
      </Menu>
    </Flex>
  );
  return nav;
};

export default NavBar;
