import React, { useState } from 'react';
import Header from '../components/Header';
import { Box, Button, Checkbox, Flex, Input, Progress, Text, Textarea } from '@chakra-ui/react';
import { ToastContainer, toast } from 'react-toastify';
import { useFormik } from 'formik';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

const SubjectsCreate = () => {
  const [isLoading, setIsLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      subject: '',
    },
    onSubmit: (values) => {
      setIsLoading(true);

      setTimeout(() => {
        const prev = JSON.parse(localStorage.getItem('subjects'));

        localStorage.setItem(
          'subjects',
          JSON.stringify([
            ...(prev || []),
            {
              date: format(new Date(), 'dd-mm-yyyy'),
              id: Math.random() * 100000000000,
              procent: 0,
              name: user?.name,
              subject: values.subject,
            },
          ])
        );
      }, 2000);
      toast.success(`Предмет ${values.subject} було успішно створено`);
      setIsLoading(false);
    },
  });

  return (
    <Header>
      {isLoading && <Progress size="xs" colorScheme="cyan" isIndeterminate />}
      <ToastContainer />
      <form onSubmit={formik.handleSubmit}>
        <Text fontSize="3xl">Створити предмет</Text>
        <Box p="20px">
          <Box w="80%">
            <Flex mt="10px">
              <Input
                borderColor="black"
                ml="5px"
                h="30px"
                name="subject"
                onChange={formik.handleChange}
                value={formik.values.subject}
                placeholder="Назва нового предмета"
              />
            </Flex>
          </Box>

          <Flex>
            <Button isLoading={isLoading} mt="10px" ml="5px" type="submit" colorScheme="blue">
              Submit
            </Button>
          </Flex>
          <Flex>
            <Button onClick={() => navigate('/themes/create')} mt="10px" ml="5px" colorScheme="blue">
              Create new theme
            </Button>
          </Flex>
        </Box>
      </form>
    </Header>
  );
};

export default SubjectsCreate;
