import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Flex, Container, Heading, Text } from "@chakra-ui/react";
import getConfig from "next/config";
import axios from "axios";
import RecentlySearched from "../components/recentlySearched";
import useRecentlySearchedItem from "../hooks/useRecentlySearchedItem";
import { Ingredient } from "../types/globals";
import ResultsList from "../components/searchResultList";
import SearchCard from "../components/searchCard";

const {
  publicRuntimeConfig: { CACHED_API_INGREDIENTS },
} = getConfig();

function App() {
  const [query, setQuery] = useState<string>("");
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [ingredientsLoading, setIngredientsLoading] = useState<boolean>(false);
  const [recentlySearchedItem, addRecentlySearchedItem] =
    useRecentlySearchedItem();
  const router = useRouter();
  const searchParam = router.query["query"]?.toString() || "";

  const getIngredients = async (queryParam: string) => {
    if (queryParam !== "") {
      setIngredientsLoading(true);
      try {
        const response = await axios(CACHED_API_INGREDIENTS, {
          params: {
            query: queryParam,
          },
        });
        setIngredients(response.data.results);
        addRecentlySearchedItem(queryParam);
      } catch (error: any) {
        if (error.response?.status === 402) {
          alert("error occured");
        }
      } finally {
        setIngredientsLoading(false);
      }
    } else setIngredients([]);
  };

  useEffect(() => {
    if (router.isReady) {
      setQuery(searchParam);
      getIngredients(searchParam);
    }
  }, [router.isReady, searchParam]);

  const setSearchParam = (queryParam: string) => {
    router.push(
      {
        pathname: "/",
        query: {
          query: queryParam,
        },
      },
      undefined,
      { shallow: true }
    );
  };

  return (
    <main>
      <Heading textAlign="center" padding={5} fontSize="xl">
        <Text>Write specified ingredient to see yummy result!</Text>
      </Heading>
      <Container maxWidth="100%">
        <SearchCard
          value={query}
          onSubmit={(event) => {
            setSearchParam(query);
          }}
          onChange={setQuery}
        />
        <Flex flexDirection="row-reverse">
          <RecentlySearched
            recentlySearchedItem={recentlySearchedItem}
            setQuery={setSearchParam}
          />
          <ResultsList items={ingredients} isLoading={ingredientsLoading} />
        </Flex>
      </Container>
    </main>
  );
}

export default App;
