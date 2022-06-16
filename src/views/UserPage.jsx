import React from 'react';
import {
  Box,
  Text,
  Button,
  Flex,
  Input,
  Image,
  InputRightElement,
  InputGroup,
  FormControl,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useState } from 'react';
import { EditIcon } from '@chakra-ui/icons';
import Header from '../components/Header';
import * as Yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';

export default () => {
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);

  const handleClick = () => setShow(!show);
  const handleClick1 = () => setShow1(!show1);
  const handleClick2 = () => setShow2(!show2);

  const user = JSON.parse(localStorage.getItem('user'));

  const formik = useFormik({
    initialValues: {
      name: user.name,
      email: user.email,
      oldPassword: '',
      password: '',
      newPassword: '',
    },
    onSubmit: (values) => {
      axios
        .patch('https://lysiukapi.herokuapp.com/users/update', {
          id: user?.id,
          passwords: {
            newPassword: values.newPassword,
            oldPassword: values.oldPassword,
          },
        })
        .then(() => {
          toast.success('User data successfully updated');
          formik.resetForm();
        })
        .catch((e) => toast.error(e?.response?.data?.description));
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required('Field is required').min(2, 'Should be at least 2 characters'),
      oldPassword: Yup.string()
        .required('Field is required')
        .min(5, 'Should be at least 5 characters')
        .max(15, 'Should be less than 15 characters'),
      password: Yup.string()
        .required('Field is required')
        .min(5, 'Should be at least 5 characters')
        .max(15, 'Should be less than 15 characters'),
      newPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
    }),
    validateOnBlur: false,
    validateOnChange: false,
  });

  return (
    <Header>
      <ToastContainer />

      <form onSubmit={formik.handleSubmit}>
        <Flex alignItems="center" justifyContent="center" flexDir="column" w="500px" p="15px">
          <Box position="relative">
            <Image
              borderRadius="8px"
              boxSize="200px"
              objectFit="cover"
              src={
                user?.url ||
                'data:image/png;base64,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'
              }
              alt=""
            />
            <EditIcon cursor="pointer" position="absolute" top={'5px'} right={'5px'} w={'20px'} h={'20px'} />
          </Box>
          <Box w="80%">
            <Text pb={'3px'} pt="15px" textAlign="left">
              Name
            </Text>
            <FormControl isInvalid={!!formik?.errors.name}>
              <InputGroup>
                <Flex flexDir="column" width="100%">
                  <Input name="name" disabled onChange={formik.handleChange} value={formik.values.name} />
                  {formik.errors.name && <FormErrorMessage>{formik.errors.name}</FormErrorMessage>}
                </Flex>
              </InputGroup>
            </FormControl>
          </Box>
          <Box w="80%">
            <Text pb={'3px'} pt="10px" textAlign="left">
              Email
            </Text>
            <Input name="email" onChange={formik.handleChange} value={formik.values.email} disabled />
          </Box>
          <Box w="80%">
            <Text pb={'3px'} pt="10px" textAlign="left">
              Old password
            </Text>
            <FormControl isInvalid={!!formik?.errors.oldPassword}>
              <InputGroup size="md">
                <Flex flexDir="column" width="100%">
                  <Input
                    name="oldPassword"
                    pr="4.5rem"
                    type={show ? 'text' : 'password'}
                    onChange={formik.handleChange}
                    value={formik.values.oldPassword}
                    placeholder="Enter old password"
                  />

                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                      {show ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                  {formik.errors.oldPassword && <FormErrorMessage>{formik.errors.oldPassword}</FormErrorMessage>}
                </Flex>
              </InputGroup>
            </FormControl>
          </Box>
          <Box w="80%">
            <Text pb={'3px'} pt="10px" textAlign="left">
              New password
            </Text>
            <FormControl isInvalid={!!formik?.errors.password}>
              <InputGroup size="md">
                <Flex flexDir="column" width="100%">
                  <Input
                    name="password"
                    pr="4.5rem"
                    type={show1 ? 'text' : 'password'}
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    placeholder="Enter new password"
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick1}>
                      {show1 ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                  {formik.errors.password && <FormErrorMessage>{formik.errors.password}</FormErrorMessage>}
                </Flex>
              </InputGroup>
            </FormControl>
          </Box>
          <Box w="80%">
            <Text pb={'3px'} pt="10px" textAlign="left">
              Repeat new password
            </Text>
            <FormControl isInvalid={!!formik?.errors.newPassword}>
              <InputGroup size="md">
                <Flex flexDir="column" width="100%">
                  <Input
                    name="newPassword"
                    pr="4.5rem"
                    type={show2 ? 'text' : 'password'}
                    onChange={formik.handleChange}
                    value={formik.values.newPassword}
                    placeholder="Repeat new password"
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick2}>
                      {show2 ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                  {formik.errors.newPassword && <FormErrorMessage>{formik.errors.newPassword}</FormErrorMessage>}
                </Flex>
              </InputGroup>
            </FormControl>
          </Box>
          <Flex justifyContent="center" mt="15px">
            <Button type="submit">Submit</Button>
          </Flex>
        </Flex>
      </form>
    </Header>
  );
};
