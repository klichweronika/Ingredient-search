import React from "react";
import { Box, Heading, Image, Text } from "@chakra-ui/react";
import { Ingredient } from "../types/globals";

type IngredientCardProps = {
  ingredient: Ingredient;
};

function IngredientCard({ ingredient }: IngredientCardProps) {
  const { image, name } = ingredient;
  return (
    <Box
      bg="#efefef"
      width={250}
      height={150}
      border="1px solid lightgrey"
      justifyContent="center"
      display="flex"
      alignItems="center"
    >
      <Image
        alt={name}
        src={`https://spoonacular.com/cdn/ingredients_100x100/${image}`}
        objectFit="contain"
      />
      <Heading padding={2} fontSize="sm">
        <Text>{name}</Text>
      </Heading>
    </Box>
  );
}

export default IngredientCard;
