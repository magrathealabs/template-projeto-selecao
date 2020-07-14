import styled from 'styled-components';

export const Wrapper = styled.section`

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  
  > div:nth-child(1) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s;
    width: 300px;
    height: 45%;

    img {
      width: 20%;
      margin-top: -20px
    }

    > h1 {
      font-size: 2rem;
      margin: 20px;
      display: flex;
      align-items: center;

      span  {
      font-size: 18px;
      padding: 4px 8px;
      margin-left: 8px;
      border-radius: 4px;
      color: var(--color1);
      background-color: var(--color2);;
      }
    }

    > span:nth-child(2) {
      font-size: 1.1rem;
      color: #808080;
      margin-bottom: 70px;
    }

    .login-container {
      background-color: var(--color3);
      width: 70%;
      border-radius: 4px;
      color: var(--color1);
      display: flex;
      align-items: center;
      justify-content: center;

      > .login-link {
        text-decoration: none;
        color: var(--color1);
        text-transform: uppercase;
        cursor: pointer;
        display: flex;
        align-items: center;          
        height: 40px;
        width: 100%;
        background-color: var(--color3);
        border:none;

        > span:nth-child(2) {
          margin-left: 5px;
        }
      }

      .loader-container {
        display: flex;
        justify-content: center;
        align-items: center;          
        height: 40px;
      }

      .loader {
        border: 4px solid #f3f3f3;
        border-top: 4px solid #3498db;
        border-radius: 50%;
        width: 12px;
        height: 12px;
        animation: spin 2s linear infinite;
      }

      @keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    }
  }
}
`;
