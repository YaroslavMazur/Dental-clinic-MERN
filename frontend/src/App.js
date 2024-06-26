import { useState } from "react";
import './App.css';
import Header from './components/Header/Header';
import { Routes, Route } from "react-router-dom";
import { Main } from "./Pages/Main/Main.jsx";
import Login from "./Pages/Login/Login.jsx";
import { Registration } from './Pages/Registration/Registration.jsx';
import { Profile } from './Pages/Profile/Profile.jsx';
import AppointmentPage from "./Pages/AppointmentPage/AppointmentPage.jsx"
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth, selectIsAuth, selectIsMailActivated } from './redux/slices/authSlice.js';
import { Warning } from './components/Warning/Warning.jsx';
import { Footer } from "./components/Footer/Footer.jsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const isMailActivated = useSelector(selectIsMailActivated);

  const checkAuthentication = async () => {
    try {
      const response = await dispatch(checkAuth());
      console.log(response);
      
    } catch (error) {
      console.error("Error during checkAuth:", error);
    }
  };

  useEffect(() => {
    console.log("APP USE EFECT");
    checkAuthentication();

  }, []);

  return (
    <div className="App">


      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route
          path="/appointment"
          element={
            <ProtectedRoute>
              <AppointmentPage/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile/>
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />


    </div>
  );
}

export default App;
