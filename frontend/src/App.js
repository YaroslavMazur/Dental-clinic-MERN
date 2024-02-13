import {useState} from "react";
import './App.css';
import Header from './components/Header/Header';
import {Routes, Route} from "react-router-dom";
import {Main} from "./Pages/Main/Main.jsx";
import Login from "./Pages/Login/Login.jsx";
import {Registration} from './Pages/Registration/Registration.jsx';
import { Profile } from './Pages/Profile/Profile.jsx';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth, selectIsAuth , selectIsMailActivated} from './redux/slices/authSlice.js';
import { Warning } from './components/Warning/Warning.jsx';
import { Footer } from "./components/Footer/Footer.jsx";

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const isMailActivated = useSelector(selectIsMailActivated);
  const [loading, setLoading] = useState(true);

  const checkAuthentication = async () => {
    try {
      await dispatch(checkAuth());
    
    } catch (error) {
      console.error("Error during checkAuth:", error);
    }finally{
      setLoading(false);
    }
  };

  useEffect(()=>{
    console.log("APP USE EFECT");
    checkAuthentication();

  },[]);

  return (
    <div className="App">
      {loading ? (
        <p>Loading...</p>
      ) : (
          <>
            <Header />
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/login" element={<Login />} />
              <Route path="/registration" element={<Registration />} />
            </Routes>
            <Footer/>
          </>
        )
      }
    </div>
  );
}

export default App;
