/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../../App";
import { OAuth } from "oauthio-web"

import { Wrapper } from "./styles";
import iconImg from '../../assets/icon-logo.svg'

const Login = () => {

  const { state, dispatch } = useContext(AuthContext);
  const [data, setData] = useState({ errorMessage: "", isLoading: false });

  if (state.isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <Wrapper>
      <section className="container">
        <div>

          <img src={iconImg} alt="icon-github"/>
          <h1>Github<span>tags</span></h1>
          
          <span>{data.errorMessage}</span>
          <div className="login-container">
            {data.isLoading ? (
              <div className="loader-container">
                <div className="loader"></div>
              </div>
            ) : (
              <>
                {
                  // Link to request GitHub access
                }
                <button
                  className="login-link"     
                  onClick={() => {
                    OAuth.initialize(process.env.REACT_APP_OAUTH_IO);
                      
                    OAuth.popup('github').then(github => {
                                           
                        github.get('/user').then(data => {
                          
                          dispatch({
                            type: "LOGIN",
                            payload: { user: data, isLoggedIn: true }
                          });
                        })
                      });  
                  }}
                >
                  
                  <span>Login with GitHub</span>
                </button>
              </>
            )}
          </div>
        </div>
      </section>
    </Wrapper>
  );
}

export default Login;