import styled from 'styled-components';

export const Wrapper = styled.section`
  max-width: 1200px;
  position: relative;

  .title {
    color: var(--color2);
    margin: 20px 20px 0 0px;
    font-size: 16px; 
  }

  .box-repositories {
    padding: 24px;
    margin-top: 20px;   
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.2);

    p {
      line-height: 24px;
      color: var(--color3);

      span {
        font-weight: bold;
      }
    }

    a {
      text-decoration: none;
      color: var(--color2);
    }
  }

  .box-btn-tags {
    display: flex;
    justify-content: space-between;

    button {
      width: 100px;
      max-height: 30px;
      margin-top: 8px;
      background-color: var(--color2);
      color: var(--color1);
      border-radius: 4px;
      padding: 4px;
      border: none;
      outline: none;
    }

    .box-tags {
      display: flex;
      justify-content: flex-end;
      flex-wrap: wrap;
      width: 100%;
      
      span {
        text-align: right;
        margin: 8px 0px 0 8px;
        font-size: 12px;
        background-color: var(--color2);
        color: var(--color1);
        border-radius: 4px;
        padding: 4px;
        cursor: pointer;
      }
    }
  }

  .modal-edit-delete {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0,0,0,0.8);
    z-index: 99999;
    opacity: 1;
    -webkit-transition: opacity 400ms ease-in;
    -moz-transition: opacity 400ms ease-in;
    transition: opacity 400ms ease-in;

    input { 
      padding: 4px;
      width: 140px;
      outline: none;
    }

    button:nth-child(2) {
      width: 60px;
      background-color: var(--color2);
      color: var(--color1);
      padding: 6px 8px;
      outline: none;
      border: none;
      border-radius: 4px;
      margin: 4px 0 4px 4px;
      cursor: pointer;
    }

    button:nth-child(3) {
      width: 60px;
      background-color: #ff4545;
      color: var(--color1);
      padding: 6px 8px;
      outline: none;
      border: none;
      border-radius: 4px;
      margin: 4px 0 4px 4px;
      cursor: pointer;
    }
  }

  .modal-edit-delete > div {
    width: 300px;
    border-radius: 4px;
    position: relative;
    margin: 10% auto;
    padding: 15px 14px;
    background: #fff;

    @media screen and(max-width: 768px) {
      margin: 50% auto;
    }
  }

  .close-modal {
    position: absolute;
    width: 18px;
    right: 0px;
    top: 0px;
    text-align: center;
    background: #ff4545;
    color: var(--color1);
    border: none;
    outline: none;
    cursor: pointer;
  }

  .box-buttons-navigation {
    display: flex;
    justify-content: space-between;
  }

  .btn-prev,
  .btn-next {
    width: 60px;
    background-color: var(--color2);
    color: var(--color1);
    padding: 6px 8px;
    outline: none;
    border: none;
    border-radius: 4px;
    margin: 10px 0 10px 4px;
    cursor: pointer;
  }

  .btn-prev:disabled,
  .btn-next:disabled {
    background-color: #dddddd;
  }
`;
