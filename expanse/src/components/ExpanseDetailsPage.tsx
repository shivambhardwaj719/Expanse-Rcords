import { useParams } from 'react-router-dom';
import { useFrappeGetDoc } from 'frappe-react-sdk';
import { Box, Heading, Text, Spinner, Center, Alert, AlertIcon, AlertTitle, AlertDescription, Button, Table, Tbody, Td, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { UpdateExpenseForm } from './UpdateExpenseForm';

export const ExpenseDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useFrappeGetDoc('Expenses Record', id);

  const { isOpen, onOpen, onClose } = useDisclosure();

  if (isLoading) return <Center h='40vh'><Spinner /></Center>;
  if (error) return (
    <Alert status='error'>
      <AlertIcon />
      <AlertTitle>Error!</AlertTitle>
      <AlertDescription>Unable to fetch expense details.</AlertDescription>
    </Alert>
  );

  return (
    <Box p={4}>
      <Heading as='h1' fontSize='xl'>Expense Details</Heading>
      <Table variant="striped" colorScheme="teal" mt={4}>
        <Thead>
          <Tr>
            <Th>Field</Th>
            <Th>Value</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>ID</Td>
            <Td>{data.name}</Td>
          </Tr>
          <Tr>
            <Td>Description</Td>
            <Td>{data.description}</Td>
          </Tr>
          <Tr>
            <Td>Amount</Td>
            <Td>{data.formatted_amount}</Td>
          </Tr>
          <Tr>
            <Td>Type</Td>
            <Td>{data.type}</Td>
          </Tr>
          <Tr>
            <Td>Owner</Td>
            <Td>{data.owner}</Td>
          </Tr>
          <Tr>
            <Td>Remarks</Td>
            <Td>{data.remarks}</Td>
          </Tr>
        </Tbody>
      </Table>
      <Button mt={4} colorScheme="blue" onClick={onOpen}>Update</Button>
      <Link to="/expenses">
        <Button mt={4} ml={4} colorScheme="blue">Back to List</Button>
      </Link>
      <UpdateExpenseForm isOpen={isOpen} onClose={onClose} expense={data} />
    </Box>
  );
};
