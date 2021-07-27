import {
  Box,
  Image,
  Stat,
  StatArrow,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
} from "@chakra-ui/react";
import React from "react";
import styles from "../../styles/Home.module.scss";

const ATrending = ({ otherThreePopular }) => {
  return otherThreePopular.map((actor, i) => (
    <div key={i} className={styles.actorCard}>
      <Box>
        <Image
          src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
          alt={`${actor.name}'s photo`}
          className={styles.actorImg}
        ></Image>
        <Text fontSize="xl">{actor.name}</Text>
        <br />
        <StatGroup>
          <Stat>
            <StatLabel>Popularity Index</StatLabel>
            <StatNumber>{actor.popularity}</StatNumber>
            <StatHelpText>
              <StatArrow type={Math.random() > 0.5 ? "increase" : "decrease"} />
              {Math.ceil(Math.random() * 50)}%
            </StatHelpText>
          </Stat>
        </StatGroup>
      </Box>
    </div>
  ));
};

export default ATrending;
