import React, { useState } from 'react';
import { Box, Button, Flex, Image, Link, Select, Text } from '@chakra-ui/react';
import { useFormik } from 'formik';
import { toast, ToastContainer } from 'react-toastify';
import ImagePng from '../t.jpeg';
import axios from 'axios';
import { format } from 'date-fns';

const TaskBlock = ({ id }) => {
  return (
    <Flex w="max-content" p="12px" alignItems="center">
      <Image src={ImagePng} alt="task" boxSize="50px" />
      <Box pl="5">
        <a download href={`https://lysiukapi.herokuapp.com/files/download/${id}`}>
          Завантажити файл
        </a>{' '}
      </Box>
    </Flex>
  );
};

const Answer = ({ id, description, image, name, theme, subject }) => {
  const [s, sa] = useState(0);

  const items = localStorage.getItem('result') || '[]';
  const isReview = items ? JSON.parse(items).find((i) => i.id === id) : '';
  console.log(id);
  const { handleChange, handleSubmit, values } = useFormik({
    initialValues: {
      result: 2,
    },
    onSubmit: (values) => {
      setTimeout(() => {
        localStorage.setItem(
          'result',
          JSON.stringify([
            ...JSON.parse(items),
            {
              name,
              subject: subject.subject,
              date: format(new Date(), 'dd-MM-yyyy'),
              result: values.result,
              theme,
              id,
            },
          ])
        );
        toast.success(`Завдання оцінено на ${values.result} ${values.result === '5' ? 'балів' : 'бала'} `);
        setTimeout(() => {
          sa((prev) => prev + 1);
        }, 3000);
      }, 2000);
    },
  });

  if (isReview) return null;

  return (
    <Box m="20px" p="20px" boxShadow="xl">
      <ToastContainer />

      <Flex justifyContent="space-between" alignItems="center" mb="20px">
        <Text textAlign="left" fontSize="20px" fontWeight="600">
          {subject + ' / ' + theme}
        </Text>
        <Text textAlign="left" fontSize="14px" color="#616362"></Text>
      </Flex>

      <Text textAlign="left" mb="10px">
        {description}
      </Text>
      <Text textAlign="left">{name}</Text>
      <form onSubmit={handleSubmit}>
        <Flex justifyContent="space-between" mt="10px" flexDir={{ base: 'column', sm: 'row' }}>
          <TaskBlock id={image} />
          <Select
            name="result"
            value={values.result}
            onChange={handleChange}
            placeholder="Оцінка"
            ml="5px"
            h="30px"
            w="150px"
            mt={{ base: '10px', sm: '0px' }}
          >
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </Select>
        </Flex>
        <Flex justifyContent="flex-end" mt="25px">
          <Button type="submit" bg={'#a7ddfc'} px="30px">
            submit
          </Button>
        </Flex>
      </form>
    </Box>
  );
};

export default Answer;
