import React, { createContext, useReducer, useState } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import StarredRepositories from "./pages/StarredRepositories";
import FilteredRepositories from "./pages/FilteredRepositories";

import { initialState, reducer } from "./store/reducer";
import { PrivateRoute } from './routes/PrivateRoute';

import GlobalStyle from './styles/global';

export const AuthContext = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch
      }}
    >
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login}/>
        <Route path="/" exact component={Home}/>
        
        <PrivateRoute path="/starred-repositories" component={StarredRepositories} />
        <PrivateRoute path="/filtered" component={FilteredRepositories} />

      </Switch>
      <GlobalStyle />
    </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
