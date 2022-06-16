import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Text, Box, List, ListItem } from '@chakra-ui/react';

const TableComponent = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [a, sa] = useState(0);

  const user = JSON.parse(localStorage.getItem('user'));

  const [list, setList] = useState(
    localStorage.getItem('subjects')
      ? JSON.parse(localStorage.getItem('subjects'))?.filter((i) => i.name === user?.name)
      : []
  );

  useEffect(() => {
    sa((prev) => prev + 1);
  }, []);

  return (
    <Box p="20px">
      <Text fontSize="3xl">Створені мною предмети</Text>
      <List>
        {list?.length
          ? list.map((i) => (
              <ListItem
                key={i.id}
                cursor="pointer"
                onClick={() => navigate(`/subjects/${i.id}`)}
                p="20px"
                mb="20px"
                borderRadius="10px"
                style={{ border: '1px solid rgb(11, 197, 234)' }}
              >
                {i.subject}
              </ListItem>
            ))
          : null}
      </List>
    </Box>
  );
};

export default TableComponent;
