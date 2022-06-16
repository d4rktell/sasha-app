import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import axios from 'axios';
import Home from './views/Home';
import UserProfile from './views/UserPage';
import { UsersBlock } from './views/Users';
import Messages from './views/Messages';
import UploadSubject from './views/UploadSubject';
import Subject from './views/Subject';
import Register from './views/Register';
import { Chat } from './views/Chat';
import ProfilePage from './views/ProfilePage';
import Lesson from './views/Lesson';
import AdminTheme from './views/AdminTheme';
import Chart from './views/Chart';
import Login from './views/Login';
import './style.css';
import SubjectsCreate from './views/SubjectsCreate';
import ThemeEdit from './views/ThemeEdit';

function App() {
  const [isAuth, setIsAuth] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://lysiukapi.herokuapp.com/users/${user?.id}`)
      .then(() => {
        setIsAuth(true);
      })
      .catch(() => {
        setIsAuth(false);
        navigate('/login');
      });
  }, [user?.id]);

  return (
    <ChakraProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/contacts" element={<UsersBlock />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/subjects/:id/upload/:themeId" element={<UploadSubject />} />
        <Route path="/subjects/:id/themes/:themeId" element={<Lesson />} />
        <Route path="/subjects/:id/finish/:themeId" element={<AdminTheme />} />
        <Route path="/subjects/:id" element={<Subject />} />
        <Route path="/messages/:id" element={<Chat />} />
        <Route path="/subjects/create" element={<SubjectsCreate />} />
        <Route path="/themes/create" element={<ThemeEdit />} />

        {isAuth !== null && !isAuth && (
          <>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </>
        )}
        <Route path="/contacts/:id" element={<ProfilePage />} />
        <Route path="/chart" element={<Chart />} />
      </Routes>
    </ChakraProvider>
  );
}

export default App;
