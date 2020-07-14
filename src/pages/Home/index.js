import React, { useContext } from "react";

import Header from '../../components/Header';
import { AuthContext } from "../../App";

import { Wrapper } from './styles';

const Home = () => {

  const { state, dispatch } = useContext(AuthContext);

  return (
    <Wrapper>        
      <Header /> 
      <h2 className='title'>Bem vindo ao Github tags.</h2>  
    </Wrapper>
  );
}

export default Home;