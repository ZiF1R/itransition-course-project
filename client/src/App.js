import React, { useEffect, useState } from "react";
// import { ThemeProvider } from '@mui/material/styles';
import Login from "./auth/Login";
import Registration from "./auth/Registration";
import MainPage from "./main-pages/MainPage";
import Layout from "./main-pages/Layout";
import Profile from "./main-pages/profile/Profile";
// import theme from "./theme/theme";
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import topicsService from "./shared/api/topics.service";
import collectionsService from "./shared/api/collections.service";
import './App.css';

function App() {
  // const [currentTheme, setCurrentTheme] = useState();
  const [currentUser, setCurrentUser] = useState(null);
  const [collectionTopics, setCollectionTopics] = useState([]);
  const [fieldTypes, setFieldTypes] = useState([]);

  useEffect(() => {
    topicsService
      .getTopics()
      .then(res => setCollectionTopics(res.data.topics))
      .catch(err => console.log(err));

    collectionsService
      .getOptionalFieldTypes()
      .then(res => setFieldTypes(res.data.types))
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
          <Route path="profile" element={
            <Profile
              fieldTypes={fieldTypes}
              topics={collectionTopics}
              currentUser={currentUser}
            /> } />
        </Route>
      </Routes>
    </BrowserRouter>
    // </ThemeProvider>
  );
}

export default App;
