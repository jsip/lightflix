import {
  Box,
  Divider,
  Flex,
  GridItem,
  Heading,
  Img,
  SimpleGrid,
  Stack,
  Stat,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
  Wrap,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Cast from "../../common/components/Cast";
import Layout from "../../common/components/Layout";
import WCards from "../../common/components/WCards";
import checkMediaType from "../../common/lib/checkMediaType";
import getCast from "../../common/lib/getCast";
import getInfo from "../../common/lib/getInfo";
import getWork from "../../common/lib/getWork";
import verifyMediaType from "../../common/lib/verifyMediaType";
import formatLongP from "../../common/utils/formatLongP";
import getBiggest from "../../common/utils/getBiggest";
import styles from "../../styles/Home.module.scss";

export const getServerSideProps = async ({ params }) => {
  const castInfo = await getInfo(params.cast, "person");
  return {
    props: {
      castInfo,
    },
  };
};

const CastPage = ({ castInfo }) => {
  const [castWork, setCastWork] = useState();
  const [similarActors, setSimilarActors] = useState([]);
  useEffect(() => {
    setSimilarActors([]);
    getWork.work(castInfo.id).then((work) => {
      setCastWork(work);
      getBiggest.Vals(work, 4, "popularity").then((vals) => {
        vals = verifyMediaType(vals);
        console.log(vals);
        for (let v of vals) {
          getCast(v.id, v.media_type).then((castObj) => {
            console.log(castObj);
            if (castObj.cast.length > 1) {
              setSimilarActors((curr) => [
                ...(curr || []),
                castObj.cast[0].id !== castInfo.id
                  ? castObj.cast[0] || null
                  : castObj.cast[1] || null,
                castObj.cast[0].id !== castInfo.id
                  ? castObj.cast[1] || null
                  : castObj.cast[2] || null,
              ]);
            } else {
              setSimilarActors((curr) => [...curr]);
            }
          });
        }
      });
    });
  }, [castInfo]);
  if (!castInfo || !castWork || !similarActors) {
    return null;
  } else {
    console.log(castInfo);
    return (
      <Layout>
        <SimpleGrid columns={10} gap={8}>
          <GridItem className={styles.wrapper} colSpan={8}>
            <SimpleGrid columns={3}>
              <GridItem colSpan={1}>
                <Img
                  src={checkMediaType("imgSrc", "person", castInfo)}
                  fallbacksrc={"/noMoviePoster.jpg"}
                  borderRadius="25px"
                />
              </GridItem>
              <GridItem colSpan={2}>
                <Box ml={8}>
                  <Box mb={4}>
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
                              ? `Principalement ${
                                  castInfo.gender === 1
                                    ? "connue pour sa carrière en"
                                    : "connue pour sa carrière en"
                                } ${castInfo.known_for_department.toLowerCase()}`
                              : null}
                          </Heading>
                        </Box>
                      </Stack>
                    </Flex>
                    <Heading fontSize="5xl">
                      {checkMediaType("title", "person", castInfo)}
                    </Heading>
                  </Box>
                  <Stat mt={8} mb={12}>
                    <StatLabel>Informations</StatLabel>
                    <StatNumber>
                      {castInfo.place_of_birth
                        ? castInfo.place_of_birth
                        : "Place de naissance inconnue"}
                    </StatNumber>
                    <StatHelpText>
                      {castInfo.birthday
                        ? new Date(castInfo.birthday).toDateString()
                        : "Date de fête inconnue"}
                      {castInfo.deathday
                        ? ` - ${new Date(castInfo.deathday).toDateString()}`
                        : null}
                    </StatHelpText>
                  </Stat>
                  <WCards castWork={castWork} />
                </Box>
              </GridItem>
            </SimpleGrid>
            <Box mt={8}>
              <Heading fontSize="3xl" mb={4}>
                À propos de {castInfo.name}
              </Heading>
              {formatLongP(checkMediaType("bio", "person", castInfo))}
            </Box>
          </GridItem>
          <GridItem className={styles.wrapper} colSpan={2}>
            <Heading>Crédits Similaires</Heading>
            <Wrap spacing={"3.5vh"} mt={8}>
              <Cast
                returnDesc="false"
                castData={similarActors}
                disableTooltip
              />
            </Wrap>
          </GridItem>
        </SimpleGrid>
      </Layout>
    );
  }
};

export default CastPage;
