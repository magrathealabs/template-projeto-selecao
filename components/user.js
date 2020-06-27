import React from 'react'
import { Stack, Avatar, Text, Button, Box } from '@chakra-ui/core'
import { signout } from 'next-auth/client'

export function User({ name, image }) {
  return (
    <Stack spacing={2} align="center" isInline>
      <Avatar name={name} src={image} />
      <Box>
        <Text>{name}</Text>
        <Button
          size="xs"
          variantColor="pink"
          onClick={() =>
            signout({ callbackUrl: `${process.env.DOMAIN}/login` })
          }
        >
          Sair
        </Button>
      </Box>
    </Stack>
  )
}
