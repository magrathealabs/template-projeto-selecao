import { createGlobalStyle } from 'styled-components';

import backgroundImg from '../assets/github-background.svg';

export default createGlobalStyle`
  
  :root{
    --color1: #ffffff;
    --color2: #fa9000;
    --color3: #333333;
    /* --color4: #fa9000; */
    /* --color4: #fa9000; */
    /* --color4: #fa9000; */
  }

  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    margin: 0 auto;
    }
  }

  html,
  body {
    height: 100%;
  }

  body {
    padding: 0 20px;
    background: url(${backgroundImg}) no-repeat top;
    background-position-x: 80%;
    font-family: 'Roboto', sans-serif;
  }
`;


  