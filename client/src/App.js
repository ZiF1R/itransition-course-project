import React, { useEffect, useState } from "react";
// import { ThemeProvider } from '@mui/material/styles';
import Login from "./auth/Login";
import Registration from "./auth/Registration";
import MainPage from "./main page/MainPage";
import Layout from "./main page/Layout";
import Profile from "./main page/profile/Profile";
// import theme from "./theme/theme";
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import topicsService from "./shared/api/topics.service";
import './App.css';

function App() {
  // const [currentTheme, setCurrentTheme] = useState();
  const [currentUser, setCurrentUser] = useState(null);
  const [collectionTopics, setCollectionTopics] = useState([]);

  useEffect(() => {
    topicsService
      .getTopics()
      .then(res => setCollectionTopics(res.data.topics))
      .catch(err => console.log(err));
  }, []);

  return (
    // <ThemeProvider theme={currentTheme}>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login setCurrentUser={setCurrentUser} />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/" element={<Layout currentUser={currentUser} />}>
          <Route index element={<MainPage currentUser={currentUser} />} />
          <Route path="profile" element={<Profile topics={collectionTopics} currentUser={currentUser} />} />
        </Route>
      </Routes>
    </BrowserRouter>
    // </ThemeProvider>
  );
}

export default App;
