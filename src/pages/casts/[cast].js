import {
  Box,
  Flex,
  GridItem,
  Heading,
  Img,
  SimpleGrid,
  Stat,
  StatArrow,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
  Stack,
  Text,
  Divider,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import Layout from "../../common/components/Layout";
import WCards from "../../common/components/WCards";
import checkMediaType from "../../common/lib/checkMediaType";
import getInfo from "../../common/lib/getInfo";
import getWork from "../../common/lib/getWork";
import styles from "../../styles/Home.module.scss";

export const getServerSideProps = async ({ params }) => {
  const castInfo = await getInfo(params.cast, "person");
  return {
    props: {
      castInfo,
    },
  };
};

const Cast = ({ castInfo }) => {
  console.log(castInfo);
  const [castWork, setCastWork] = useState();
  useEffect(() => {
    getWork.work(castInfo.id).then((work) => setCastWork(work));
  }, [castInfo.id]);
  if (!castInfo) {
    return null;
  } else {
    return (
      <Layout>
        <SimpleGrid columns={6} gap={8}>
          <GridItem className={styles.wrapper} colSpan={5}>
            <SimpleGrid columns={3}>
              <GridItem colSpan={1}>
                <Img
                  src={checkMediaType("imgSrc", "person", castInfo)}
                  alt=""
                  borderRadius="25px"
                />
              </GridItem>
              <GridItem colSpan={2}>
                <Box ml={8}>
                  <Box mb={16}>
                    <Flex>
                      <Stack direction="row" mt={2}>
                        <StatGroup>
                          <Stat>
                            <StatNumber>{castInfo.popularity}</StatNumber>
                          </Stat>
                          <Divider orientation="vertical" ml={3} />
                        </StatGroup>
                        <Box pt={1}>
                          <Heading fontSize="2xl">
                            {castInfo.known_for_department
                              ? `Primarily known for ${castInfo.gender === 1 ? "her" : "his"
                              } ${castInfo.known_for_department.toLowerCase()}`
                              : null}
                          </Heading>
                        </Box>
                      </Stack>
                    </Flex>
                    <Heading fontSize="5xl" mb={2}>
                      {checkMediaType("title", "person", castInfo)}
                    </Heading>
                  </Box>
                  <WCards Id={castInfo.id} mediaType="person" />
                  <Stat mt={8}>
                    <StatLabel>Birth Information</StatLabel>
                    <StatNumber>{castInfo.place_of_birth ? castInfo.place_of_birth : "Unknown birthplace"}</StatNumber>
                    <StatHelpText>
                      {castInfo.birthday ? new Date(castInfo.birthday).toDateString() : "Unknown birthday"}
                      {castInfo.deathday
                        ? ` - ${new Date(castInfo.deathday).toDateString()}`
                        : null}
                    </StatHelpText>
                  </Stat>
                  <Box mt={8}>{checkMediaType("bio", "person", castInfo)}</Box>
                </Box>
              </GridItem>
            </SimpleGrid>
          </GridItem>
          <GridItem className={styles.wrapper} colSpan={1}>
            <Heading>Similar</Heading>
          </GridItem>
        </SimpleGrid>
      </Layout>
    );
  }
};

export default Cast;
