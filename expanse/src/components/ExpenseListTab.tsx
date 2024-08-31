import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, Center, Heading, HStack, Spinner, Stack, Table, Tbody, Td, Th, Tr, useDisclosure } from "@chakra-ui/react";
import { useFrappeDocTypeEventListener, useFrappeGetDocList, useFrappeDeleteDoc } from "frappe-react-sdk";
import { AddExpenseRecord } from "./AddExpenseRecord";
import { Link } from "react-router-dom";

interface ExpenseFields {
    name: string;
    formatted_amount: string;
    type: string;
    description: string;
    remarks: string;
    owner: string;
    file: string;
}

export const ExpenseListTab = () => {
    const { data, isLoading, error, mutate } = useFrappeGetDocList('Expenses Record', {
        fields: ['name', 'formatted_amount', 'type', 'description', 'remarks', 'owner', 'remarks']
    });

    const { isOpen, onOpen, onClose } = useDisclosure();

    const { deleteDoc } = useFrappeDeleteDoc();

    useFrappeDocTypeEventListener('Expense Record', (d) => {
        console.log("Event", d);
        if (d.doctype === "Expense Record") {
            mutate();
        }
    });

    const handleDelete = async (docName: string) => {
        try {
            await deleteDoc('Expenses Record', docName);
            mutate(); // Refresh the list after deletion
        } catch (error) {
            console.error('Failed to delete expense:', error);
        }
    };

    return (
        <Stack>
            <HStack justify={'space-between'}>
                <Heading as='h1' fontSize={'xl'}>Expenses</Heading>
                <Box>
                    <Button colorScheme="blue" onClick={onOpen}>Add Expense</Button>
                </Box>
            </HStack>
            {isLoading && <Center h='40vh'><Spinner /></Center>}
            {error && <Alert status='error'>
                <AlertIcon />
                <AlertTitle>Error!</AlertTitle>
                <AlertDescription>Something went wrong.</AlertDescription>
            </Alert>}
            {data && <Table>
                <thead>
                    <Tr>
                        <Th>ID</Th>
                        <Th>Description</Th>
                        <Th>Amount</Th>
                        <Th>Type</Th>
                        <Th>Owner</Th>
                        <Th>Remarks</Th>
                        <Th>Actions</Th>
                    </Tr>
                </thead>
                <Tbody>
                    {data.map((d: ExpenseFields) => (
                        <Tr key={d.name}>
                            <Td>{d.name}</Td>
                            <Td>{d.description}</Td>
                            <Td>{d.formatted_amount}</Td>
                            <Td>{d.type}</Td>
                            <Td>{d.owner}</Td>
                            <Td>{d.remarks}</Td>
                            <Td>
                                <Link to={`/expenses/${d.name}`}>
                                    <Button colorScheme="teal">View</Button>
                                </Link>
                                <Button colorScheme="red" onClick={() => handleDelete(d.name)}>Delete</Button>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>}
            <AddExpenseRecord isOpen={isOpen} onClose={onClose} />
        </Stack>
    );
};
