import { Avatar, Tooltip, WrapItem, Link } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";

const Cast = ({ castData }) => {
  const cast = castData.map(({ id, name, character, profile_path }) => (
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
            </WrapItem>
          </Tooltip>
        </Link>
      </NextLink>
    </div>
  ));
  return cast;
};

export default Cast;
