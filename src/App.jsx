import { useState, useContext } from 'react';
import './App.css';
import Login from './components/Login';
import MainApp from './components/MainApp';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

function App() {
  
const[hasLoggedIn, setHasLoggedIn]=useState(false);
const[username, setUser]= useState('');

  return (
    
          <Router>
      <Routes>
        <Route
          path="/"
          element={<Login hasLoggedIn={hasLoggedIn} setHasLoggedIn={setHasLoggedIn} username={username} setUser={setUser}/>}
        />
        <Route
          path="/dashboard"
          element={
            hasLoggedIn ? (
                <MainApp username={username}/>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Routes>
    </Router>
 
  
     
   
  )
}

export default App
