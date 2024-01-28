import './App.css';
import Header from './components/Header/Header';
import {Routes, Route} from "react-router-dom";
import {Main} from "./Pages/Main/Main.jsx";
import Login from "./Pages/Login/Login.jsx";
import {Registration} from './Pages/Registration/Registration.jsx';
import { Profile } from './Pages/Profile/Profile.jsx';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { checkAuth } from './redux/slices/authSlice.js';

function App() {
  const dispatch = useDispatch();

  const checkAuthentication = async () => {
    try {
      if (localStorage.getItem("token")) {
        await dispatch(checkAuth());
      }
    } catch (error) {
      console.error("Error during checkAuth:", error);
    }
  };
  useEffect(()=>{
  
    checkAuthentication();
  },[]);

  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/profile" element={<Profile/>}/>

        <Route path="/login" element={<Login/>}/>
        <Route path="/registration" element={<Registration/>}/>
      </Routes>
    </div>
  );
}

export default App;
