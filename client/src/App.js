import React, { useState } from "react";
// import { ThemeProvider } from '@mui/material/styles';
import Login from "./auth/Login";
import Registration from "./auth/Registration";
import MainPage from "./main page/MainPage";
import Layout from "./main page/Layout";
import Profile from "./main page/profile/Profile";
// import theme from "./theme/theme";
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import './App.css';

function App() {
  // const [currentTheme, setCurrentTheme] = useState();
  const [currentUser, setCurrentUser] = useState(null);

  return (
    // <ThemeProvider theme={currentTheme}>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login setCurrentUser={setCurrentUser} />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/" element={<Layout currentUser={currentUser} />}>
          <Route index element={<MainPage currentUser={currentUser} />} />
          <Route path="profile" element={<Profile currentUser={currentUser} />} />
        </Route>
      </Routes>
    </BrowserRouter>
    // </ThemeProvider>
  );
}

export default App;
