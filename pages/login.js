import React from 'react'
import { signin } from 'next-auth/client'
import { Flex, Button, Text, Stack } from '@chakra-ui/core'

function LoginPage({ callbackUrl }) {
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
        <Button
          size="lg"
          variantColor="pink"
          onClick={() => signin('github', { callbackUrl })}
        >
          Entrar com github
        </Button>
      </Stack>
    </Flex>
  )
}

LoginPage.getInitialProps = ctx => {
  const callbackUrl = process.env.APP_DOMAIN
  return { callbackUrl }
}

export default LoginPage
