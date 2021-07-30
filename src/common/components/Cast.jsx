import {
  Avatar, Badge, Box, Flex, Link, Text, Tooltip,
  WrapItem
} from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";

const Cast = ({ castData, returnDesc }) => {
  const cast = castData.map(
    ({ id, name, character, known_for_department, profile_path }) => (
      <div key={id}>
        <NextLink href={`/casts/[cast]`} as={`/casts/${id}`}>
          <Link>
            <Tooltip
              marginTop="1vh"
              hasArrow
              label={`${name} as ${character}`}
              bg="gray.50"
              color="black"
              placement="bottom"
            >
              <WrapItem>
                <Avatar
                  name={name}
                  src={`https://image.tmdb.org/t/p/original${profile_path}`}
                />
                {returnDesc ? (
                  <Flex ml={2}>
                    <Box>
                      <Text fontWeight={600}>
                        {name.length > 15
                          ? name.replace(/\s+\w+\s/g, " ")
                          : name}
                      </Text>
                      <Badge
                        textTransform="capitalize"
                        width="max-content"
                        height="min-content"
                        textAlign="center"
                      >
                        {known_for_department}
                      </Badge>
                    </Box>
                  </Flex>
                ) : null}
              </WrapItem>
            </Tooltip>
          </Link>
        </NextLink>
      </div>
    )
  );
  return cast;
};

export default Cast;
