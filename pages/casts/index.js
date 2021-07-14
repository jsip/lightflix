import { Heading, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import Layout from "../components/Layout";
import fetchData from "../lib/fetchData";
import API_KEY from "../utils/constants";

export const getStaticProps = async () => {
  const casts = await fetchData(
    `https://api.themoviedb.org/3/trending/person/week?api_key=${API_KEY}`
  );
  return {
    props: {
      casts,
    },
  };
};

const Casts = ({ casts }) => {
  const _casts = casts.results.map((cast) => {
    let id = cast.id.toString();
    return (
      <NextLink key={cast.id} href="/casts/[cast]" as={`/casts/${id}`}>
        <Link>
          <Heading>{cast.name}</Heading>
        </Link>
      </NextLink>
    );
  });
  return <Layout>{_casts}</Layout>;
};

export default Casts;
