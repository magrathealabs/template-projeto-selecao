import React from 'react'
import {
  Box,
  InputGroup,
  Input,
  InputRightElement,
  Button,
} from '@chakra-ui/core'

export function Search({ onChange, onSearch, term, onReset, showResetButton }) {
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
            showResetButton ? (
              <Button
                size="sm"
                leftIcon="close"
                onClick={onReset}
                variantColor="red"
              >
                Limpar
              </Button>
            ) : (
              <Button
                size="sm"
                leftIcon="search"
                variantColor="pink"
                onClick={onSearch}
              >
                Filtrar
              </Button>
            )
          }
        />
      </InputGroup>
    </Box>
  )
}
