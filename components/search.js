import React from 'react'
import {
  Box,
  InputGroup,
  Input,
  InputRightElement,
  Button,
} from '@chakra-ui/core'

export function Search({ onChange, onSearch, term }) {
  return (
    <Box p={4} pt={8}>
      <InputGroup>
        <Input
          placeholder="Filtrar por tags"
          variant="filled"
          onChange={onChange}
          value={term}
        />
        <InputRightElement
          width="6em"
          children={
            <Button
              size="sm"
              leftIcon="search"
              variantColor="pink"
              onClick={onSearch}
            >
              Filtrar
            </Button>
          }
        />
      </InputGroup>
    </Box>
  )
}
