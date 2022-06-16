import { Box, Text, Button, Flex, Input, Progress } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import { useState, useEffect, memo } from 'react';
import { ArrowForwardIcon, ArrowBackIcon } from '@chakra-ui/icons';
import Header from '../components/Header';
import axios from 'axios';

const EnemyText = ({ content }) => {
  if (!content) {
    return null;
  }
  return (
    <Flex maxW="70%" mt="10px">
      <Box bg={'#dee1e3'} borderTopLeftRadius="0px" borderRadius="8px" ml="5px" p="5px">
        <Text textAlign={'left'} p="5px">
          {content}
        </Text>
      </Box>
    </Flex>
  );
};

const UserText = ({ content }) => {
  if (!content) {
    return null;
  }
  return (
    <Flex justifyContent="flex-end" mt="10px">
      <Box bg={'#dee1e3'} borderTopLeftRadius="0px" borderRadius="8px" ml="5px" p="5px" px="10px" maxW="70%">
        <Text textAlign={'left'} p="5px">
          {content}
        </Text>
      </Box>
    </Flex>
  );
};

export const Chat = memo(() => {
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [list, setList] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const params = useParams();

  const formik = useFormik({
    initialValues: {
      content: '',
    },
    onSubmit: (values) => {
      formik.setFieldValue('message', '');
      onSend(values.content);
    },
  });

  const i = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (params?.id)
      axios.get(`https://lysiukapi.herokuapp.com/users/${params?.id}`).then((res) => {
        setUser(res.data || []);
      });
  }, [params?.id]);

  useEffect(() => {
    axios.get(`https://lysiukapi.herokuapp.com/messages/chats-list?userId=${i.id}`).then((response) => {
      const item = response.data.find((i) => i.users.some((item) => item.id === params?.id));
      setList(item);
    });
  }, []);
  // 883879185;
  const onSend = (content) => {
    setIsLoading(true);
    axios
      .post(`https://lysiukapi.herokuapp.com/messages/send`, {
        chatId: list.id,
        userId: i?.id,
        content,
      })
      .then((res) => {
        setList((prev) => ({
          ...prev,
          messages: [
            ...prev.messages,
            {
              ...res.data.message,
              sender: res.data.message.sender,
            },
          ],
        }));
      })
      .finally(() => setIsLoading(false));
  };
  return (
    <Header>
      <Box borderRadius="8px" overflow={'hidden'}>
        <Flex alignItems="center" bg={'#dee1e3'} p="10px">
          <ArrowBackIcon
            h="30px"
            w="30px"
            onClick={() => navigate(-1)}
            cursor="pointer"
            borderRadius="50%"
            transition="0.3s all ease"
            _hover={{ bg: 'white' }}
          />
          <Text pl={'10px'}>{user?.name}</Text>
        </Flex>

        <Box py={'20px'} px="10px" h="400px" style={{ overflowY: 'auto' }}>
          {list?.messages?.length
            ? list.messages.map((item) => {
                if (item?.sender !== i?._id)
                  return <EnemyText key={item.id + item.content + item.timestamp} {...item} />;
                else return <UserText key={item.id + item.content + item.timestamp} {...item} />;
              })
            : null}
          {isLoading && (
            <Flex justifyContent="flex-end" h="44px">
              <Box w="70%">
                <Progress height="44px" isIndeterminate />
              </Box>
            </Flex>
          )}
          {!isLoading && message && <UserText text={message} />}
        </Box>
        <form onSubmit={formik.handleSubmit}>
          <Flex alignItems="center" w="100%" p="15px" borderTop="1px">
            <Box w="100%">
              <Input
                name="content"
                onChange={formik.handleChange}
                value={formik.values.content}
                placeholder="enter your message"
                autoComplete="off"
              />
            </Box>
            <Flex justifyContent="center" ml="5px">
              <Button type="submit" borderRadius="50%" h="40px" w="40px">
                <ArrowForwardIcon h="30px" w="30px" />
              </Button>
            </Flex>
          </Flex>
        </form>
      </Box>
    </Header>
  );
});
