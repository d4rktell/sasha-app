import { Text, Box, List, ListItem } from '@chakra-ui/react';

const LIST = [
  {
    id: 1,
    name: 'Богдан Рихлюк',
    subject: 'Веб-розробка',
  },
  { id: 2, name: 'Дмитро Пупкін', subject: 'Штучний інтеллект ' },
  {
    id: 1,
    name: 'Богдан Рихлюк',
    subject: '.NET',
  },
];
const TableComponent = () => {
  return (
    <Box mt="32">
      <Text fontSize="3xl">Створені мною предмети</Text>
      <List>
        {LIST.map((i) => (
          <ListItem>{i.subject}</ListItem>
        ))}
      </List>
    </Box>
  );
};

export default TableComponent;
