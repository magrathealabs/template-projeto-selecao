import React from 'react'
import { Text, Stack, Badge, Button } from '@chakra-ui/core'

export function RepositoryCard({ name, description, html_url, tags }) {
  return (
    <Stack bg="white" borderWidth={1} borderRadius="4px" p={4} boxShadow="sm">
      <Text fontSize="2xl" fontWeight="bold" color="pink.400">
        {name}
      </Text>

      <Text fontSize="lg">{description}</Text>

      <Button
        as="a"
        href={html_url}
        color="twitter.400"
        target="_blank"
        mt="auto"
      >
        Ver repo
      </Button>

      <Stack isInline spacing={2}>
        {tags?.map(tag => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </Stack>
    </Stack>
  )
}
