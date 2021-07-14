import { Box, Input } from "@chakra-ui/react";
import React from "react";

const Search = ({ query, onChangeHandler, placeholder }) => {
  return (
    <Box>
      <Input
        variant="filled"
        placeholder={placeholder}
        onChange={onChangeHandler}
        value={query}
      />
    </Box>
  );
};

export default Search;
