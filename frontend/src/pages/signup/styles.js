import { Link } from "react-router-dom"
import styled from "styled-components"

export const ContainerSignupMain = styled.div`
    height: 90vh;
    width: 95%;
    padding: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;    
    align-items: center;
    margin: 10px auto;
`

export const SignupMain = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;

    button{
        margin: 12px;
        border-radius: 5px;
        background: #3f51b5;
        color: #ffffff;
        font-size: 28px;
        padding: 20px;
        border: 0px;
        cursor: pointer;
        transition: 0.2s;
        &:hover{
            opacity: 0.4;
        };
        &:active{
            opacity: 1;
        };
}`

export const Text = styled.div`
    width: auto;
    margin: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px;
    border-radius: 8px;
    box-shadow: 0 0 7px 1px black;
    font-size: 45px;
`
export const By = styled.div`

    display: flex;
    flex-direction: row;
    align-items: center;
    h1{
        margin-right: 6px;
        color: #333333;
        font-size: 18px;
    };
`
export const SpanStyled = styled(Link)`
    font-size: 18px;
    text-decoration: none;
    color: #333333;
    transition: 0.2s;
    &:hover{
        opacity: 0.4;
    };
    &:active{
        opacity: 1;
    }
`