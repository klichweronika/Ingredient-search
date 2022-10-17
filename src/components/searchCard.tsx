import React from "react";
import { Flex, Input, Button } from "@chakra-ui/react";

type SearchCardProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (event: React.SyntheticEvent) => void;
};

function SearchCard({ onSubmit, onChange, value }: SearchCardProps) {
  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    onSubmit(event);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Flex marginBottom={10}>
        <Input
          borderRadius={0}
          backgroundColor="white"
          marginRight={3}
          placeholder="Search for ingredient"
          value={value}
          borderColor="lightgrey"
          onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
            onChange(event.target.value)
          }
        />
        <Button borderRadius={0} width="96" background="seagreen" type="submit">
          Search
        </Button>
      </Flex>
    </form>
  );
}

export default SearchCard;
