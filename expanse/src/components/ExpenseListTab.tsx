import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, Center, Heading, HStack, Spinner, Stack, Table, Tbody, Td, Th, Tr, useDisclosure } from "@chakra-ui/react"
import {  useFrappeGetDocList } from "frappe-react-sdk"
import AddExpenseRecord from "./AddExpenseRecord"

// import { Link } from "react-router-dom"

interface ExpenseFields {
    name: string
    formatted_amount: string
    type: string
    description: string
    remarks: string
    owner: string,
    file: string
}

export const ExpenseListTab = () => {

    const{data, isLoading, error} = useFrappeGetDocList('Expenses Record',{
        fields:['name', 'formatted_amount', 'type','description','remarks','owner','remarks']
    })

    const{isOpen ,onOpen, onClose} = useDisclosure()

    return(
        <Stack>
            <HStack justify={'space-between'}>
                <Heading as='h1' fontSize={'xl'}>Expanses</Heading>
                <Box>
                    <Button colorScheme="blue" onClick = { onOpen } > Add Expanses </Button>
                </Box>
            </HStack>
            {isLoading && <Center h='40vh'><Spinner/></Center>}
            {error && <Alert status='error'>
            <AlertIcon/>
            <AlertTitle>Your browser is outdated!</AlertTitle>
            <AlertDescription>Something is wrong.</AlertDescription>
            </Alert>}
            {data && <Table>
                <Tr>
                    <Th>
                        ID
                    </Th>
                    <Th>
                        Description
                    </Th>
                    <Th>
                        Amount
                    </Th>
                    <Th>
                        Type
                    </Th>
                    <Th>
                        Owner
                    </Th>
                    <Th>
                        Remarks
                    </Th>
                    {/* <Th>
                        File
                    </Th> */}
                </Tr>
                <Tbody>
                {data.map((d: ExpenseFields) => <Tr key={d.name}>
                        <Td>
                            {d.name}
                        </Td>
                        <Td>
                            {d.description}
                        </Td>
                        <Td>
                            {d.formatted_amount}
                        </Td>
                        <Td>
                            {d.type}
                        </Td>
                        <Td>
                            {d.owner}
                        </Td>
                        <Td>
                            {d.remarks}
                        </Td>
                        <Td>
                            {/* {d.file &&
                                <Link isExternal href={d.file}>
                                    Download
                                </Link>
                            } */}
                        </Td>
                    </Tr>)}
                </Tbody>
                </Table>
                }
                <AddExpenseRecord isOpen={isOpen} onClose={onClose} />
        </Stack>
    )
}