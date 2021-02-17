import React, { createContext, useContext, useState, useEffect } from 'react';

import LoginWithGithub from '../services/login';
import api from '../services/api';

const AuthContext = createContext({ user: '', sessionId: '', signed: false, signIn: {}, signOut: {}, checkLocalStorage: {} });

export const AuthProvider = ({ children }) => {

	const [user, setUser] = useState('');
  const [sessionId, setSessionId] = useState('');

	const signIn = async (code) => {
		const res = await LoginWithGithub(code);
		if (res.status === 200) {
      console.log(res.data);
			let name = res.data['name'];
			let sessionId = res.data['sessionId'];
			if (sessionId && name) {
				console.log("Successful login");
				api.defaults.headers.authorization = `Bearer ${sessionId}`;
				setUser(name);
        setSessionId(sessionId);
				localStorage.setItem('user', name);
        localStorage.setItem('sessionId', sessionId);
			} else return false;
		} else return false;
			
		return true;
	}

  const signOut = () => {
    setUser('');
    setSessionId(''); 
    localStorage.clear();
    api.defaults.headers.authorization = '';
  };

  const checkLocalStorage = () => {
    console.log('checkLocalStorage');
    const checkUser = localStorage.getItem('user');
    const checkSession = localStorage.getItem('sessionId');

    if (!checkUser) setUser('');
    if (!checkSession) return setSessionId('');
    console.log('check', checkUser, checkSession);
    setUser(checkUser);
    setSessionId(checkSession);

    api.defaults.headers.authorization = `Bearer ${checkSession}`;
    
    return Boolean(checkSession);
  };

  useEffect(() => {
    checkLocalStorage();
  }, []);
  
  return (
    <AuthContext.Provider value={{ user, sessionId, signed: (user !== '' && sessionId !== ''), signIn, signOut, checkLocalStorage }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};