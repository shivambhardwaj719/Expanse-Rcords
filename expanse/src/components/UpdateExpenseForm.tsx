import React, { useState } from 'react';
import { useFrappeUpdateDoc } from 'frappe-react-sdk';
import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, useToast } from '@chakra-ui/react';

interface UpdateExpenseFormProps {
  isOpen: boolean;
  onClose: () => void;
  expense: {
    name: string;
    description: string;
    formatted_amount: string;
    type: string;
    owner: string;
    remarks: string;
  };
}

export const UpdateExpenseForm: React.FC<UpdateExpenseFormProps> = ({ isOpen, onClose, expense }) => {
  const [formData, setFormData] = useState({
    name: expense.name,
    description: expense.description,
    formatted_amount: expense.formatted_amount,
    type: expense.type,
    owner: expense.owner,
    remarks: expense.remarks
  });

  const { updateDoc } = useFrappeUpdateDoc();
  const toast = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      await updateDoc('Expenses Record', formData.name, formData);
      toast({
        title: "Expense updated.",
        description: "The expense record has been updated successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      toast({
        title: "Update failed.",
        description: "There was an error updating the expense record.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Update Expense</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={4}>
            <FormLabel>Description</FormLabel>
            <Input name="description" value={formData.description} onChange={handleChange} />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Amount</FormLabel>
            <Input name="formatted_amount" value={formData.formatted_amount} onChange={handleChange} />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Type</FormLabel>
            <Input name="type" value={formData.type} onChange={handleChange} />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Owner</FormLabel>
            <Input name="owner" value={formData.owner} onChange={handleChange} />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Remarks</FormLabel>
            <Input name="remarks" value={formData.remarks} onChange={handleChange} />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>Save</Button>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
