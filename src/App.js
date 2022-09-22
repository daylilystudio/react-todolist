import './App.css';
import { useState } from 'react'
import { Routes, Route } from "react-router-dom"
import { AuthContext, UserNameContext } from './utils/Context'
import Home from './pages/Home'
import Login from './components/loginView/Login'
import Error from './pages/Error'
import Register from './components/loginView/Register'
import Main from './pages/Main'
import ProtectedRoute from './utils/ProtectedRoute'

function App() {
  const [token, setToken] = useState(null)
  const [userName, setUserName] = useState('')
  return (
    <AuthContext.Provider value={{ token, setToken }}>
      <UserNameContext.Provider value={{ userName, setUserName }}>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="todolist" element={<Main />} />
          </Route>
          <Route path="*" element={<Error />}></Route>
        </Routes>
      </UserNameContext.Provider>
    </AuthContext.Provider>
  )
}

export default App;