import './App.css';
import Header from './components/Header/Header';
import {Routes, Route} from "react-router-dom";
import {Main} from "./Pages/Main/Main.jsx";
import Login from "./Pages/Login/Login.jsx";
import {Registration} from './Pages/Registration/Registration.jsx';

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/registration" element={<Registration/>}/>
      </Routes>
    </div>
  );
}

export default App;
