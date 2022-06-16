import { Box, Text, Checkbox, Textarea, Button, Flex, Input, Progress } from '@chakra-ui/react';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Header from '../components/Header';
import axios from 'axios';
import * as Yup from 'yup';

export default () => {
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));

  const formik = useFormik({
    initialValues: {
      theme: location.state.theme,
      description: '',
      file: '',
    },
    onSubmit: (values) => {
      setIsLoading(true);

      let file = new FormData();

      file.append('file', values.file);

      axios
        .post('https://lysiukapi.herokuapp.com/files/upload', file)
        .then((res) => {
          const prev = JSON.parse(localStorage.getItem(`subject/${params?.themeId}`) || '[]');
          localStorage.setItem(
            `subject/${params?.themeId}`,
            JSON.stringify([
              ...(prev || []),
              {
                description: values.description,
                image: res.data?.id,
                name: user.name,
                theme: location.state.theme,
                userId: user?.id,
                id: params?.themeId,
              },
            ])
          );
        })
        .finally(() => {
          toast.success(`Завдання до теми "${location.state.theme}" було успішно завантажено.`);
          setIsLoading(false);
          formik.resetForm();
          navigate(`/subjects/${params?.id}`);
        });
    },
    validationSchema: Yup.object().shape({
      file: Yup.string().required('Required field'),
    }),
    enableReinitialize: true,
  });

  return (
    <Header>
      {isLoading && <Progress size="xs" colorScheme="cyan" isIndeterminate />}
      <ToastContainer />
      <form onSubmit={formik.handleSubmit}>
        <Box border="1px" p="20px">
          <Box w="300px">
            <Flex mt="10px">
              <Text>Тема:</Text>
              <Input
                disabled
                ml="5px"
                h="30px"
                name="theme"
                onChange={formik.handleChange}
                value={formik.values.theme}
              />
            </Flex>
          </Box>
          <Textarea
            mt="15px"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            placeholder=""
            size="sm"
            h="200px"
          />
          <Flex mt="15px">
            <Text>додаток: </Text>
            <Flex flexDir="column" ml="10px">
              <input
                type="file"
                onChange={(event) => {
                  formik.setFieldValue('file', event.currentTarget.files[0]);
                }}
                name="file"
              />
              <Checkbox pt="10px">Повідомити мене</Checkbox>
            </Flex>
          </Flex>
          <Flex justifyContent="flex-end">
            <Button isLoading={isLoading} type="submit">
              Submit
            </Button>
          </Flex>
        </Box>
      </form>
    </Header>
  );
};
