// import React from 'react'

import { Button,Modal, ModalBody, ModalCloseButton,chakra, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, FormControl, FormLabel, Input, FormErrorMessage, Textarea, Select } from "@chakra-ui/react"
import { useForm } from "react-hook-form"

type Props = {
    isOpen : boolean,
    onClose : () => void
}

interface FormFields {
    description: string
    amount: number
    type: string
    remarks: string
}

export default function AddExpenseRecord({ isOpen, onClose } : Props) {

    const {register, handleSubmit, formState:{errors}} = useForm<FormFields>()

    const onSubmit  = (data : FormFields) =>{
        console.log(data)
    }

  return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <chakra.form onSubmit = {handleSubmit(onSubmit)}>
            <ModalOverlay />
                <ModalContent>
                <ModalHeader>Add Expanses</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Stack>
                    <FormControl isRequired isInvalid={!!errors.description}>
                                <FormLabel>Description</FormLabel>
                                <Input type='text' {...register('description', {
                                    required: "Description is required",
                                    minLength: {
                                        value: 3,
                                        message: "Description should be at least 3 characters"
                                    }
                                    
                                })} />
                                <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
                            </FormControl>
                            <FormControl isRequired isInvalid={!!errors.amount}>
                                <FormLabel>Amount</FormLabel>
                                <Input type='number' {...register('amount', {
                                    required: "Amount is required",
                                    min: {
                                        value: 1,
                                        message: "Amount should be at least 1"
                                    }
                                })} />
                                <FormErrorMessage>{errors.amount?.message}</FormErrorMessage>
                            </FormControl>
                            <FormControl isRequired isInvalid={!!errors.type}>
                                <FormLabel>Type</FormLabel>
                                <Select {...register('type', {
                                    required: "Type is required"
                                })}>
                                    <option value=''>Select Type</option>
                                    <option value='Credit'>Credit</option>
                                    <option value='Debit'>Debit</option>
                                </Select>
                                <FormErrorMessage>{errors.type?.message}</FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={!!errors.remarks}>
                                <FormLabel>Remarks</FormLabel>
                                <Textarea {...register('remarks')} />
                                <FormErrorMessage>{errors.remarks?.message}</FormErrorMessage>
                            </FormControl>
                    </Stack>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={onClose}>
                        Close
                    </Button>
                    <Button variant='ghost'>Save</Button>
                </ModalFooter>
            </ModalContent>
            </chakra.form>
        </Modal>
  )
}