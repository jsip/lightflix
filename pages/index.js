import Layout from "./components/Layout";
import styles from "../styles/Home.module.scss";
import { Stack, VStack, Grid, GridItem } from "@chakra-ui/react";

export default function Home() {
  return (
    <Layout>
      <Grid templateColumns="repeat(4, 1fr)" gap={6}>
        <GridItem className={styles.wrapper} colSpan={3}>
          <div>lightflix and chill?</div>
        </GridItem>
        <GridItem className={styles.wrapper} colSpan={1}>
          <div>featured</div>
        </GridItem>
      </Grid>
    </Layout>
  );
}
