import {
  Box,
  Img,
  Link,
  Stat,
  StatArrow,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
  WrapItem,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import styles from "../../styles/Home.module.scss";

const ATrending = ({ otherPopular }) => {
  return otherPopular.map((actor, i) => (
    <WrapItem key={i}>
      <div className={styles.actorCard}>
        <NextLink href={`/casts/[cast]`} as={`/casts/${actor.id}`}>
          <Link>
            <Box>
              <Img
                src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                alt={actor.name}
                className={styles.actorImg}
              ></Img>
              <Text fontSize="xl">{actor.name}</Text>
              <br />
              <StatGroup>
                <Stat>
                  <StatLabel>Index de popularité</StatLabel>
                  <StatNumber>{actor.popularity}</StatNumber>
                  <StatHelpText>
                    <StatArrow
                      type={Math.random() > 0.5 ? "increase" : "decrease"}
                    />
                    {Math.ceil(Math.random() * 50)}%
                  </StatHelpText>
                </Stat>
              </StatGroup>
            </Box>
          </Link>
        </NextLink>
      </div>
    </WrapItem>
  ));
};

export default ATrending;
