import React from 'react'
import { Text, Stack, Badge, Button } from '@chakra-ui/core'

export function RepositoryCard({ name, description, tags, id, openModal }) {
  return (
    <Stack bg="white" borderWidth={1} borderRadius="4px" p={4} boxShadow="sm">
      <Text fontSize="2xl" fontWeight="bold" color="pink.400">
        {name}
      </Text>

      <Text fontSize="lg">{description}</Text>

      <Button
        mt="auto"
        variant="solid"
        variantColor="twitter"
        onClick={() => openModal({ id, name })}
      >
        Adicionar Tags
      </Button>

      <Stack isInline spacing={2}>
        {tags?.map(tag => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </Stack>
    </Stack>
  )
}
