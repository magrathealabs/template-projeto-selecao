import React from 'react'
import {
  Modal as ModalWrapper,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Heading,
  Stack,
} from '@chakra-ui/core'

export function Modal({ isOpen, onClose, children }) {
  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />

      <ModalContent rounded={4} padding={2}>
        <ModalHeader p={2}>
          <Heading fontSize="md" textTransform="uppercase">
            Adicionar tag ao repositório
          </Heading>
        </ModalHeader>
        <ModalBody p={2}>
          <Stack spacing={4}>{children}</Stack>
        </ModalBody>
      </ModalContent>
    </ModalWrapper>
  )
}
