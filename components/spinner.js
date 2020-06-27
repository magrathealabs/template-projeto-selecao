import React from 'react'
import { Flex, Spinner } from '@chakra-ui/core'

export function FullpageSpinner() {
  return (
    <Flex flex="1" p={4} align="center" justify="center">
      <Spinner
        thickness="4px"
        size="xl"
        emptyColor="pink.100"
        color="pink.400"
      />
    </Flex>
  )
}
