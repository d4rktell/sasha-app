import { Table, Thead, Tbody, Tr, Th, Td, TableCaption, TableContainer } from '@chakra-ui/react';

const LIST = [
  {
    name: 'Ольга Мельник',
    subject: 'Веб-розробка',
    date: '1111',
    procent: 10,
  },
  {
    name: 'Дмитро Пупкін',
    subject: 'Предмет 7',
    date: '1111',
    procent: 5,
  },
];

const TableComponent = () => {
  return (
    <TableContainer>
      <Table variant="simple">
        <TableCaption>Предмети</TableCaption>
        <Thead>
          <Tr>
            <Th>Викладач</Th>
            <Th>Предмет</Th>
            <Th isNumeric>Прогрес</Th>
          </Tr>
        </Thead>
        <Tbody>
          {LIST.map(({ name, subject, procent }) => (
            <Tr key={name + subject}>
              <Td>{name}</Td>
              <Td>{subject}</Td>
              <Td isNumeric>{procent}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default TableComponent;
