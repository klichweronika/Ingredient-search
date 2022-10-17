import React from "react";
import { Container, Flex, Text } from "@chakra-ui/react";
import { Ingredient } from "../types/globals";
import IngredientCard from "./ingredientCard";

type ResultsListProps = {
  items: Ingredient[];
  isLoading: boolean;
};

function ResultsList({ items, isLoading }: ResultsListProps) {
  const workingItems = items;

  return (
    <Container
      maxW="100%"
      padding={5}
      border="1px solid lightgrey"
      background="white"
    >
      {items.length === 0 && !isLoading && "Could not find ingredient"}
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <Flex justifyContent="center" gridGap={6} flexWrap="wrap">
          {workingItems.map((ingredient: any) => (
            <IngredientCard ingredient={ingredient} key={ingredient.id} />
          ))}
        </Flex>
      )}
    </Container>
  );
}

export default ResultsList;
