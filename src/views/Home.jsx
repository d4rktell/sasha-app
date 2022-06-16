import React, { useEffect, useState } from 'react';
import SubjectsTable from '../components/SubjectsTable';
import CompletedTable from '../components/CompletedSubjects';
import Header from '../components/Header';
import {
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  Button,
  Select,
  Box,
  Text,
  List,
  ListItem,
  ListIcon,
  Alert,
  AlertIcon,
  Progress,
  IconButton,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import { CheckCircleIcon, InfoIcon, WarningIcon, WarningTwoIcon } from '@chakra-ui/icons';
import { FiDelete } from 'react-icons/fi';
import AdminTable from '../components/AdminTable';

const Home = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [n, setN] = useState(JSON.parse(localStorage.getItem('notifications')));
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      notification: '',
      status: 'info',
    },
    onSubmit: (values) => {
      setIsLoading(true);
      const prev = JSON.parse(localStorage.getItem('notifications'));
      const notifications = [...(prev || []), values];
      setTimeout(() => {
        localStorage.setItem('notifications', JSON.stringify(notifications));
        setN(notifications);
        toast.success(`Сповіщення типу ${values.status} успішно створено.`);
        setIsLoading(false);
        formik.resetForm();
      }, 2000);
    },
  });

  const onDeleteNotify = (n) => {
    const prev = JSON.parse(localStorage.getItem('notifications')).filter((i) => i.notification !== n);
    localStorage.setItem('notifications', JSON.stringify(prev));
    setN(prev);
  };
  return (
    <Header>
      {isLoading && <Progress size="xs" isIndeterminate />}
      <ToastContainer />
      {user?.role === 1 ? (
        <>
          <Box bg="white" p="30px" borderRadius="10px">
            <form onSubmit={formik.handleSubmit}>
              <FormControl isInvalid={!!formik?.errors.notification}>
                <Text fontSize="2xl" mb="10px">
                  Створити сповіщення
                </Text>
                <InputGroup>
                  <Flex flexDir="column" width="100%">
                    <Input
                      placeholder="Введіть текст сповіщення"
                      borderColor="cyan.400"
                      name="notification"
                      onChange={formik.handleChange}
                      value={formik.values.notification}
                    />
                    {formik.errors.notification && <FormErrorMessage>{formik.errors.notification}</FormErrorMessage>}
                  </Flex>
                </InputGroup>
              </FormControl>
              <Box my="10px">
                <Flex width="100%" justify="space-between">
                  <Select
                    maxWidth="300px"
                    placeholder="Виберіть тип сповіщення"
                    borderColor="cyan.400"
                    value={formik.values.status}
                    onChange={formik.handleChange}
                    name="status"
                  >
                    <option value="info">Info</option>
                    <option value="success">Success</option>
                    <option value="error">Error</option>
                    <option value="warning">Warning</option>
                  </Select>
                  <Button isLoading={isLoading} type="submit" colorScheme="cyan">
                    Створити сповіщення
                  </Button>
                </Flex>
              </Box>
            </form>
          </Box>
          {n?.length ? (
            <Box mt="30px" background="white" p="30px" borderRadius="10px">
              <Text fontSize="2xl"></Text>

              <List spacing={5}>
                {n.map((i) => {
                  const icon =
                    i.status === 'success'
                      ? CheckCircleIcon
                      : i.status === 'warning'
                      ? WarningIcon
                      : i.status === 'error'
                      ? WarningTwoIcon
                      : InfoIcon;

                  const color =
                    i.status === 'success'
                      ? 'green.500'
                      : i.status === 'warning'
                      ? 'yellow.500'
                      : i.status === 'error'
                      ? 'red.500'
                      : 'black';

                  return (
                    <ListItem
                      key={i.notification}
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                      borderBottom="1px"
                      style={{
                        borderColor: '#0BC5EA',
                      }}
                    >
                      <div>
                        <ListIcon as={icon} color={color} />
                        {i.notification}
                      </div>
                      <IconButton
                        align="right"
                        onClick={() => onDeleteNotify(i.notification)}
                        variant="ghost"
                        aria-label="open menu"
                        icon={<FiDelete />}
                      />
                    </ListItem>
                  );
                })}
              </List>
            </Box>
          ) : null}
        </>
      ) : (
        <>
          {JSON.parse(localStorage.getItem('notifications'))?.length &&
            !!localStorage.getItem(`${user.id}/n`) &&
            JSON.parse(localStorage.getItem('notifications'))
              .slice(0, 3)
              .map((i) => {
                return (
                  <Alert key={i.notification} status={i.status} mt="10px" borderRadius="10px">
                    <AlertIcon />
                    {i.notification}
                  </Alert>
                );
              })}
          <SubjectsTable />
          <CompletedTable />
        </>
      )}
      {user?.role === 1 && <AdminTable />}
    </Header>
  );
};

export default Home;
