import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Routes, Route } from "react-router";
import Layout from './components/Layout';
import Signup from './views/Signup';
import Login from './views/Login';
import Dashboard from './views/Dashboard';
import axios from 'axios';
import Income from './views/Income';
import Expense from './views/Expense';

const getTransationsFromStorage = () => {
  const saved = localStorage.getItem("transaction");
  return saved ? JSON.parse(saved) : [];
}

const protectionRouter = ({ user, childern }) => {
  const localToken = localStorage.getItem("token");
  const sessionToken = sessionStorage.getItem("token");
  const hasToken = localToken || sessionToken;

  if (!user || !hasToken) {
    return <Navigate to="/login" replace />
  }
  return childern;
}

const ScrollToTop = () => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" })
  })
}

function App() {
  const [user, setUser] = useState(() => {
    const localUser = localStorage.getItem("user");
    const sessionUser = sessionStorage.getItem("user");
    return localUser ? JSON.parse(localUser) : (sessionUser ? JSON.parse(sessionUser) : null);
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("token") || sessionStorage.getItem("token") || null;
  });

  const [transation, setTransation] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const persistAuth = (userObj, tokenStr, remember = false) => {
    try {
      if (remember) {
        if (userObj) localStorage.setItem("user", JSON.stringify(userObj));
        if (tokenStr) localStorage.setItem("token", tokenStr);
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("token");
      } else {
        if (userObj) sessionStorage.setItem("user", JSON.stringify(userObj));
        if (tokenStr) sessionStorage.setItem("token", tokenStr);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
      setUser(userObj || null);
      setToken(tokenStr || null);
    } catch (err) {
      console.error("persistAuth error:", err);
    }
  };

  const clearAuth = () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
    } catch (error) {
      console.error("Error clearing authentication:", error);
    }
    setUser(null);
    setToken(null);
  };

  const updatedUserData = (updatedUser) => {
    setUser(updatedUser);
    const localToken = localStorage.getItem("token");
    if (localToken) {
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } else {
      sessionStorage.setItem("user", JSON.stringify(updatedUser));
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const localUserRaw = localStorage.getItem("user");
        const sessionUserRaw = sessionStorage.getItem("user");
        const localToken = localStorage.getItem("token");
        const sessionToken = sessionStorage.getItem("token");

        const storedUser = localUserRaw
          ? JSON.parse(localUserRaw)
          : sessionUserRaw ? JSON.parse(sessionUserRaw) : null;
        const storedToken = localToken || sessionToken || null;
        const tokenFromLocal = !!localToken;

        if (storedUser) {
          setUser(storedUser)
          setToken(storedToken)
          setLoading(false)
          return;
        }

        if (storedToken) {
          try {
            const response = await axios.get("http://localhost:8000/user/me", {
              headers: { Authorization: `Bearer ${storedToken}` }
            })
            const profile = response.data;
            persistAuth(profile, storedToken, tokenFromLocal);
          } catch (error) {
            console.log('could not fetch profile with the stored token:', error);
            clearAuth();
          }
        }
      } catch (error) {
        console.log('error bootsrapping auth', error)
      } finally {
        setLoading(false)

        try {
          setTransation(getTransationsFromStorage())
        } catch (error) {
          console.log("Error loading transation:", error)
        }
      }
    })()
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("Transations", JSON.stringify(transation))
    } catch (error) {
      console.log("Error saving transaction", error)
    }
  }, [transation]);

  const handleLogin = (userData, jwtToken, remember = false) => {
    persistAuth(userData, jwtToken, remember);
    navigate("/");
  };

  const handleSignup = (userData, remember = false, tokenFromApi = null) => {
    persistAuth(userData, tokenFromApi, remember);
    navigate("/");
  };

  const handleLogout = () => {
    clearAuth();
    navigate("/login");
  };

  const addTransaction = (newTransaction) =>
    setTransactions((p) => [newTransaction, ...p]);
  const editTransaction = (id, updatedTransaction) =>
    setTransactions((p) =>
      p.map((t) => (t.id === id ? { ...updatedTransaction, id } : t)),
    );
  const deleteTransaction = (id) =>
    setTransactions((p) => p.filter((t) => t.id !== id));
  const refreshTransactions = () =>
    setTransactions(getTransactionsFromStorage());


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/login" element={<Login onLogin={handleLogin} />} />
      <Route path="/signup" element={<Signup onSignup={handleSignup} />} />

      <Route element={
        <Layout
          user={user}
          onLogout={handleLogout}
          transation={transation}
          addTransaction={addTransaction}
          editTransaction={editTransaction}
          deleteTransaction={deleteTransaction}
          refreshTransactions={refreshTransactions}
        />
      }
      >
        <Route path='/' element={<Dashboard />}
          transation={transation}
          addTransaction={addTransaction}
          editTransaction={editTransaction}
          deleteTransaction={deleteTransaction}
          refreshTransactions={refreshTransactions}
        />

        <Route path='/income' element={<Income
          transation={transation}
          addTransaction={addTransaction}
          editTransaction={editTransaction}
          deleteTransaction={deleteTransaction}
          refreshTransactions={refreshTransactions}
        />} />

        <Route path='/expense' element={<Expense
          transation={transation}
          addTransaction={addTransaction}
          editTransaction={editTransaction}
          deleteTransaction={deleteTransaction}
          refreshTransactions={refreshTransactions}
        />} />
      </Route>
    </Routes>
  );
}

export default App;