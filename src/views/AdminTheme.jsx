import { Text } from '@chakra-ui/react';
import Header from '../components/Header';
import { useParams } from 'react-router-dom';
import Answer from '../components/Answer';

const AdminTheme = () => {
  const params = useParams();
  const answers = JSON.parse(localStorage.getItem(`subject/${params?.themeId}`));
  const subject = JSON.parse(localStorage.getItem('subjects'))?.find((i) => i.id === Number(params.id));

  return (
    <Header>
      {answers?.length ? (
        answers.map((i) => <Answer key={i?.userId} {...i} subject={subject.subject} />)
      ) : (
        <Text>Завдань на перевірку не залишилось.</Text>
      )}
    </Header>
  );
};

export default AdminTheme;
