import { extendTheme } from "@chakra-ui/react";

const fonts = { mono: `'Menlo', monospace` };

const theme = extendTheme({
  fonts,
  styles: {
    global: {
      // styles for the `body`
      body: {
        bg: "gray.400",
        color: "white",
      },
      // styles for the `a`
    },
  },
  components: {
    Link: {
      _hover: {
        color: "teal.500",
        textDecoration: "none",
      },
    },
    NextLink: {
      _hover: {
        color: "teal.500",
        textDecoration: "none",
      },
    },
  },
});
export default theme;
