import React, { createContext, useContext, useState, useEffect } from 'react';

import LoginWithGithub from '../services/login';

const AuthContext = createContext({ user: {}, signed: false, signIn: {}, signOut: {}, checkLocalStorage: {} });

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {

	const [user, setUser] = useState('');

	const signIn = async (code) => {
		const res = await LoginWithGithub(code);
		if (res.status === 200) {
			console.log(res.status)
			let sessionId = res.data['sessionId'];
			if (sessionId /* && token */) {
				console.log("Successful login");
				// api.defaults.headers.authorization = `Bearer ${token}`;
				setUser(sessionId);
				localStorage.setItem('user', sessionId);
			} else return false;
		} else return false;
			
		return true;
	}

  const signOut = () => {
    setUser({}); 
    localStorage.clear();
    // api.defaults.headers.authorization = '';
  };

  const checkLocalStorage = () => {
    const checkUser = localStorage.getItem('user');
    
    if (!checkUser) return setUser({});
    
    setUser(checkUser);
    
    return Boolean(checkUser);
  };

  useEffect(() => {
    checkLocalStorage();
  }, []);
  
  return (
    <AuthContext.Provider value={{ user, signed: Object.keys(user).length !== 0, signIn, signOut, checkLocalStorage }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};