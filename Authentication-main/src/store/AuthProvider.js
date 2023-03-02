import React, { useEffect, useState } from 'react'
import AuthContext from './Auth-Context'

const AuthProvider = (props) => {
  const [token, setToken] = useState(null);


  const userIsLoggedIn = !!token;

  const autoLogout = () => {
    setTimeout(() => {
      localStorage.removeItem('token')
      setToken(null);
    }, 50*1000);

  }

  const loginHandler = (token) => {
    localStorage.setItem('token', JSON.stringify(token));
    setToken(token);
    autoLogout()
  }

  const logoutHandler = () => {
    localStorage.removeItem('token')
    setToken(null);
  }

  const authContext = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    setToken(token)
  }, [])

  return (
    <AuthContext.Provider value={authContext}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthProvider