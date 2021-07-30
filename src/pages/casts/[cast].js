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
} from "@chakra-ui/react";
import { React } from "react";
import Layout from "../../common/components/Layout";
import checkMediaType from "../../common/lib/checkMediaType";
import getInfo from "../../common/lib/getInfo";
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
                <Box mb={12}>
                  <Heading fontSize="5xl">
                    {checkMediaType("title", "person", castInfo)}
                  </Heading>
                  <Heading fontSize="2xl">
                    {castInfo.also_known_as.length > 0
                      ? "Also known as " +
                        castInfo.also_known_as[
                          Math.floor(
                            Math.random() * castInfo.also_known_as.length
                          )
                        ]
                      : null}
                  </Heading>
                </Box>
                <Flex>
                  <Box>
                    <StatGroup>
                      <Stat>
                        <StatLabel>Popularity Index</StatLabel>
                        <StatNumber>{castInfo.popularity}</StatNumber>
                        <StatHelpText>
                          <StatArrow
                            type={Math.random() > 0.5 ? "increase" : "decrease"}
                          />
                          {Math.ceil(Math.random() * 50)}%
                        </StatHelpText>
                      </Stat>
                    </StatGroup>
                  </Box>
                </Flex>
                <Box mt={2} alignItems="center" justifyContent="center">
                  <Heading fontSize="2xl">
                    {castInfo.known_for_department
                      ? `Known for ${
                          castInfo.gender === 1 ? "her" : "his"
                        } ${castInfo.known_for_department.toLowerCase()}`
                      : null}
                  </Heading>
                </Box>
                <Flex mt={2} mb={8}></Flex>
                <Box>{checkMediaType("bio", "person", castInfo)}</Box>
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
};

export default Cast;
