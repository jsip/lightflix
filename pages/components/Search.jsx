import React from "react";
import { Input, Box, VStack, StackDivider } from "@chakra-ui/react";

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
