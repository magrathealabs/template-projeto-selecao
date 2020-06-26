import React from 'react'
import { Flex, Button, Text, Stack, theme } from '@chakra-ui/core'

function LoginPage() {
  return (
    <Flex
      p={4}
      height="100vh"
      align="center"
      justify="center"
      direction="column"
    >
      <Stack spacing={4} align="center">
        <Text as="h1" fontSize="6xl" fontWeight="bolder" color="gray.500">
          TagHub
        </Text>
        <Button size="lg" variantColor="pink">
          Entrar com github
        </Button>
      </Stack>
    </Flex>
  )
}

export default LoginPage
