import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Text, Input, List, ListItem } from '@chakra-ui/react';
import Header from '../components/Header';
import axios from 'axios';

export default () => {
  const [value, setValue] = useState('');
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    axios.get('https://lysiukapi.herokuapp.com/users/list').then((res) => {
      setList(res.data?.filter((i) => i.id !== user?.id) || []);
    });
  }, []);
  return (
    <Header>
      <Text fontSize="3xl">Чати</Text>
      <Input
        my="10"
        placeholder="Пошук повідомлень"
        border="1px"
        borderColor="blue.300"
        name="search"
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
      />
      <List colorScheme="red">
        {list
          .filter((i) => (value ? i.name.toLowerCase().includes(value?.toLowerCase()) : true))
          .map(({ name, id }, index) => (
            <ListItem
              key={index}
              cursor="pointer"
              onClick={() => {
                axios
                  .post(`https://lysiukapi.herokuapp.com/messages/start-chat`, {
                    userIds: [Number(id), Number(user?.id)],
                  })
                  .catch(() => {})
                  .finally(() => navigate(`/messages/${id}`));
              }}
              p="20px"
              mb="20px"
              borderRadius="10px"
              style={{ border: '1px solid rgb(11, 197, 234)' }}
            >
              {name}
            </ListItem>
          ))}
      </List>
      {!list.filter((i) => (value ? i.name.toLowerCase().includes(value?.toLowerCase()) : true)).length && (
        <Text fontSize="lg">Нічого не знайдено!</Text>
      )}
    </Header>
  );
};
