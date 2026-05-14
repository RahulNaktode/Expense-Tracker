import { useState } from 'react'
import { useNavigate } from 'react-router'
import Layout from './components/Layout'
import {Routes, Route} from "react-router"
import Signup from './views/Signup'
import Login from './views/Login'
import Dashboard from './views/Dashboard'

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  const clearAuth = () => {
    try{
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    }catch(error){
      console.error("Error clearing authentication:", error);
    }

    setUser(null);
    setToken(null);
  }

  const handleLogout = () => {
    clearAuth();
    navigate("/login");
  }

  return (
    <>
      
        <Routes>
          <Route path="/" element={<Layout  />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      
    </>
  )
}

export default App
