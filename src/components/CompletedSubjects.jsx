import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Text, Box } from '@chakra-ui/react';

const TableComponent = () => {
  const list = [];

  if (!list?.length) return null;
  return (
    <Box mt="32">
      <Text fontSize="3xl">Завершені предмети</Text>
      <TableContainer>
        <Table colorScheme="teal">
          <Thead>
            <Tr>
              <Th>Викладач</Th>
              <Th>Предмет</Th>
              <Th>Дата</Th>
              <Th isNumeric>Оцінка</Th>
            </Tr>
          </Thead>
          <Tbody>
            {list.map(({ name, subject, date, result }) => (
              <Tr key={name + subject}>
                <Td>{name}</Td>
                <Td>{subject}</Td>
                <Td>{date}</Td>
                <Td isNumeric>{result}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TableComponent;
