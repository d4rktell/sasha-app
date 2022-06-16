import React, { useState } from 'react';
import Header from '../components/Header';
import { Input, Select, Text, Button } from '@chakra-ui/react';
import { useFormik } from 'formik';

const ThemeEdit = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  const [s, setS] = useState(JSON.parse(localStorage.getItem('subjects') || [])?.filter((i) => i.name === user.name));

  const formik = useFormik({
    initialValues: {
      theme: '',
      subject: '',
    },
    onSubmit: (values) => {
      const prev = JSON.parse(localStorage.getItem(`themes/${values?.subject}`));
      localStorage.setItem(
        `themes/${values?.subject}`,
        JSON.stringify([
          ...(prev || []),
          {
            id: Math.random() * 1000000,
            theme: values.theme,
          },
        ])
      );
    },
  });

  return (
    <Header>
      <Text fontSize="3xl">Створити тему до предмета</Text>
      <form onSubmit={formik.handleSubmit}>
        <Input
          h="40px"
          mb="15px"
          mt="15px"
          name="theme"
          onChange={formik.handleChange}
          borderColor="cyan.400"
          value={formik.values.theme}
          placeholder="Назва нової теми"
        />
        <Select
          maxWidth="300px"
          placeholder="Виберіть предмет"
          borderColor="cyan.400"
          value={formik.values.subject}
          onChange={formik.handleChange}
          name="subject"
        >
          {s?.length &&
            s.map((i) => (
              <option key={i.id} value={i.id}>
                {i?.subject}
              </option>
            ))}
        </Select>
        <Button mt="10px" type="submit" colorScheme="blue">
          Create
        </Button>
      </form>
    </Header>
  );
};

export default ThemeEdit;
