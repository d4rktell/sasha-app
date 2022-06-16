import React, { useEffect, useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Button } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';

const Subject = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [list, setList] = useState();

  const user = JSON.parse(localStorage.getItem('user'));

  const result = JSON.parse(localStorage.getItem('result'));

  useEffect(() => {
    const l = JSON.parse(localStorage.getItem(`themes/${params?.id}`) || '[]');
    setList(l || []);
  }, []);
  return (
    <Header className="tabletest">
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>Тема</Th>
            </Tr>
          </Thead>
          <Tbody>
            {list?.length
              ? list.map(({ theme, id }) => {
                  const uploaded = JSON.parse(localStorage.getItem(`subject/${id}`) || '[]')?.find(
                    (i) => i?.userId === user?.id
                  );
                  const count = result?.find((i) => Number(i.id) === Number(id));
                  return (
                    <Tr key={id} style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Td>{theme}</Td>
                      <Td>
                        {user.role === 2 ? (
                          <>
                            <Button onClick={() => navigate(`/subjects/${params.id}/themes/${id}`)}>
                              Переглянути матеріал
                            </Button>
                            <Button
                              disabled={!!uploaded}
                              _disabled={{
                                color: 'green.400',
                              }}
                              onClick={() => navigate(`/subjects/${params.id}/upload/${id}`, { state: { theme } })}
                            >
                              {count
                                ? `Оцінено на ${count?.result}`
                                : uploaded
                                ? 'Завантажено'
                                : 'Завантажити на перевірку'}
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button
                              colorScheme="blue"
                              variant="solid"
                              onClick={() => navigate(`/subjects/${params.id}/finish/${id}`)}
                            >
                              Переглянути завдання
                            </Button>
                            <Button
                              marginLeft="5px"
                              colorScheme="teal"
                              variant="solid"
                              onClick={() => navigate(`/subjects/${params.id}/themes/${id}`, { state: { theme } })}
                            >
                              Редагувати
                            </Button>
                          </>
                        )}
                      </Td>
                    </Tr>
                  );
                })
              : null}
          </Tbody>
        </Table>
      </TableContainer>
    </Header>
  );
};

export default Subject;
