import React from 'react'
import { Text, Stack, Button, Tag, TagCloseButton } from '@chakra-ui/core'

export function RepositoryCard({
  name,
  description,
  tags,
  id,
  openModal,
  onRemoveTag,
  owner,
}) {
  return (
    <Stack bg="white" borderWidth={1} borderRadius="4px" p={4} boxShadow="sm">
      <Text fontSize="2xl" fontWeight="bold" color="pink.400">
        {name}
      </Text>

      <Text fontSize="lg">{description}</Text>

      <Stack isInline spacing={2} flexWrap="wrap">
        {tags?.map(tag => (
          <Tag mb={2} key={tag} rounded="full">
            {tag}
            <TagCloseButton
              onClick={() => onRemoveTag({ rid: id, tag, owner })}
            />
          </Tag>
        ))}
      </Stack>

      <Button
        mt="auto"
        variant="solid"
        variantColor="twitter"
        onClick={() => openModal({ id, name })}
      >
        Adicionar Tags
      </Button>
    </Stack>
  )
}
