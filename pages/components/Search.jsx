import React from "react";
import { Input, Box, VStack, StackDivider } from "@chakra-ui/react";

const Search = ({ onChangeHandler }) => {
  return (
    <Box>
      <Input
        variant="filled"
        placeholder="Search Movies"
        onChange={onChangeHandler}
      />
    </Box>
  );
};

export default Search;
