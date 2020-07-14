import styled from 'styled-components';

export const Wrapper = styled.section`
  max-width: 1200px;
  width: 100%;
 
  button {
    position: absolute;
    all: unset;
    width: 100px;
    height: 35px;
    margin: 10px 10px 0 0;
    align-self: flex-end;
    background-color: #fa9000;
    color: var(--color1);
    text-align: center;
    border-radius: 3px;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      filter: brightness(94%);
    }
  }

  > div {
    font-size: 18px;
    width: 100%;

    .content {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      align-items: center;
      
      padding: 24px;
      margin-top: 20px;   
      box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.2);
     
      .box-avatar {
        display: flex;
        flex-direction: column;

        span {
          margin-top: 16px;
        }
      }
      

      img {
        height: 150px;
        width: 150px;
        border-radius: 50%;
      }

      .box-infomations {
        display: flex;
        flex-direction: column;

        span {
          margin-bottom: 4px;
        }
      }

      .box-buttons {
        display: flex;
        flex-direction: column;

        button {
          padding: 4px 8px;
          font-size: 12px;
        }
      }
    }
  }

  .title {
    color: var(--color2);
    margin: 20px;
  }
`;
