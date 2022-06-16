import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Text, Progress, Box } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const TableComponent = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const list = JSON.parse(localStorage.getItem('subjects'));

  return (
    <Box mt="30px">
      <Text fontSize="3xl">Предмети</Text>
      <TableContainer>
        <Table variant="simple" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>Викладач</Th>
              <Th>Предмет</Th>
              <Th isNumeric>Прогрес</Th>
            </Tr>
          </Thead>
          <Tbody>
            {list?.length &&
              list
                .filter((i) => (user?.role === 1 ? i.name === user.name : true))
                .map(({ id, name, subject, procent }, index) => {
                  const themes = JSON.parse(localStorage.getItem(`themes/${id}`))?.map((i) => i.id);
                  const results = JSON.parse(localStorage.getItem('result'))?.filter((i) =>
                    themes?.includes(Number(i.id))
                  );

                  const count = (results?.length / themes?.length) * 100;
                  console.log(count);
                  return (
                    <Tr key={id + index + subject}>
                      <Td>{name}</Td>
                      <Td>
                        <Link to={`/subjects/${id}`}>{subject}</Link>
                      </Td>
                      <Td>
                        <Text align="right">{count || 0}%</Text>
                        <Progress hasStripe value={count || 0} backgroundColor="gray" />
                      </Td>
                    </Tr>
                  );
                })}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TableComponent;
