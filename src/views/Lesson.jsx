import { Box, Text, Button, Flex } from '@chakra-ui/react';
import { useFormik } from 'formik';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useState, useMemo } from 'react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import '../style.css';

export default () => {
  const navigate = useNavigate();
  const params = useParams();
  const [data, setData] = useState(localStorage.getItem(`subjectCK/${params.id}+${params.themeId}`));
  const items = JSON.parse(localStorage.getItem('subject'));

  const item = useMemo(() => {
    return JSON.parse(localStorage.getItem(`themes/${params?.id}`))?.find((i) => i.id === params?.themeId);
  }, [items, params?.themeId, params?.id]);

  const user = JSON.parse(localStorage.getItem('user'));

  const formik = useFormik({
    initialValues: {
      data: '',
    },
    onSubmit: (values) => {
      localStorage.setItem(`subjectCK/${params.id}+${params.themeId}`, values.data);
      setData(values.data);
    },
  });

  return (
    <Header>
      <Box p={'30px'}>
        <Flex justifyContent="flex-start">
          <Button onClick={() => navigate(-1)} ml="5px" mb="20px" leftIcon={<ArrowBackIcon />}>
            Повернутися до предмету
          </Button>
        </Flex>
        <Box bg="#e3e3e3" p="20px" borderRadius="8px">
          <Text fontSize="20px">{item?.theme}</Text>
        </Box>
        {user.role === 1 && (
          <form onSubmit={formik.handleSubmit}>
            <Box mt="30px" boxShadow="md" p="15px" borderRadius="10px" background="white">
              <CKEditor
                editor={ClassicEditor}
                data={data}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  formik.setFieldValue('data', data);
                }}
              />
              <Flex justifyContent="flex-end" mt="20px">
                <Button type="submit">Submit</Button>
              </Flex>
            </Box>
          </form>
        )}

        {!!data && (
          <Box mt="30px" boxShadow="md" p="30px" borderRadius="10px" backgroundColor="white">
            <p style={{ textAlign: 'left' }} dangerouslySetInnerHTML={{ __html: data }} />
          </Box>
        )}
      </Box>
    </Header>
  );
};
