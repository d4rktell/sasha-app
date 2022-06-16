import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  Box,
  Avatar,
  FormControl,
  InputRightElement,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

export const VALIDATION_SCHEMA = Yup.object().shape({
  email: Yup.string().required('Fields is required').email('Email should be valid'),
  password: Yup.string()
    .required('Field is required')
    .min(5, 'Should be at least 5 characters')
    .max(15, 'Should be less than 15 characters'),
});

const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleShowClick = () => setShowPassword(!showPassword);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validateOnChange: false,
    validationOnBlur: false,
    validationSchema: VALIDATION_SCHEMA,
    onSubmit: (values) => {
      setIsLoading(true);

      axios
        .post('https://lysiukapi.herokuapp.com/users/login', values, {
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
        })
        .then((res) => {
          const { token, user } = res?.data;
          localStorage.setItem('accessToken', token);
          localStorage.setItem('user', JSON.stringify(user));
          navigate('/');
        })
        .catch((e) => {
          toast.error(e.response.data.description);
        })
        .finally(() => setIsLoading(false));
    },
  });

  return (
    <Flex flexDirection="column" height="100vh" backgroundColor="gray.200" justifyContent="center" alignItems="center">
      <ToastContainer />
      <Stack flexDir="column" mb="2" justifyContent="center" alignItems="center">
        <Avatar bg="teal.500" />
        <Heading color="teal.400">Welcome</Heading>
        <Box minW={{ base: '90%', md: '468px' }}>
          <form onSubmit={formik.handleSubmit}>
            <Stack spacing={4} p="1rem" backgroundColor="whiteAlpha.900" boxShadow="md">
              <FormControl isInvalid={!!formik?.errors.email}>
                <InputGroup>
                  <Flex flexDir="column" width="100%">
                    <Input
                      width="full"
                      type="text"
                      placeholder="E-mail"
                      name={'email'}
                      onChange={formik.handleChange}
                      value={formik.values.email}
                    />
                    {formik.errors.email && <FormErrorMessage>{formik.errors.email}</FormErrorMessage>}
                  </Flex>
                </InputGroup>
              </FormControl>
              <FormControl isInvalid={!!formik?.errors.password}>
                <InputGroup>
                  <Flex flexDir="column" width="100%">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      name={'password'}
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      placeholder="Пароль"
                    />
                    {formik.errors.password && <FormErrorMessage>{formik.errors.password}</FormErrorMessage>}
                  </Flex>
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? 'Сховати' : 'Показати'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Button
                isLoading={isLoading}
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
              >
                Авторизуватися
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        Бажаєте зареєструватися?{' '}
        <Link style={{ color: '#319795' }} to="/register">
          Зареєструватися
        </Link>
      </Box>
    </Flex>
  );
};

export default Login;
