import React from 'react'
import { FormControl, Input, Button, FormHelperText } from '@chakra-ui/core'

import { Modal } from './modal'

export function AddTagModal({ field, onClose, onSubmit, isOpen, isLoading }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={onSubmit}>
        <FormControl mb={4}>
          <Input {...field} variant="filled" />
          <FormHelperText>
            Separe as tags por virgula. Ex: Node, Backend
          </FormHelperText>
        </FormControl>

        <Button
          variantColor="pink"
          width="100%"
          isLoading={isLoading}
          isDisabled={isLoading}
          type="submit"
        >
          Adicionar Tag
        </Button>
      </form>
    </Modal>
  )
}
