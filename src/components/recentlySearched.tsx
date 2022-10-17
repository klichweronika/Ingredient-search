import React from "react";
import { Box, Heading, Text, Link } from "@chakra-ui/react";

type RecentlySearchedProps = {
  recentlySearchedItem: string[];
  setQuery: (query: string) => void;
};

function RecentlySearched({
  recentlySearchedItem,
  setQuery,
}: RecentlySearchedProps) {
  const handleClick = (query: string) => {
    setQuery(query);
  };

  return (
    <Box padding={16} border="1px solid lightgrey" background="white">
      <Heading marginBottom={3} fontSize="lg">
        Ingredient history search
      </Heading>
      {recentlySearchedItem.length ? (
        recentlySearchedItem.map((searchedItem, id) => (
          <Text fontSize="md" key={id} paddingTop={1}>
            <Link fontSize="xl" onClick={() => handleClick(searchedItem)}>
              {searchedItem}
            </Link>
          </Text>
        ))
      ) : (
        <Text fontSize="md">Empty!</Text>
      )}
    </Box>
  );
}

export default RecentlySearched;
