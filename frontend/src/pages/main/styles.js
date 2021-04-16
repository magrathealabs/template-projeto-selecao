import { Link } from "react-router-dom"
import styled from "styled-components"

export const ContainerCard = styled.div`
    height: 300px;
    width: 350px;
    margin: 12px;
    display: flex;
    flex-direction: column;
    padding: 16px;
    border-radius: 8px;
    box-shadow: 0 0 7px 1px black;
    align-items: center;
    h6{
        margin: 8px;
    }
`
export const ContainerMain = styled.div`
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;

`
export const FormTags = styled.div`
    height: 200px;
    width: 300px;
    margin: 10px auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    background-color: #ffffff;
    border-radius: 9px;
    box-shadow: 0 0 7px 1px black;
    align-items: center;
    h1{
        font-size: 20px;
        color: #3f51b5;
    }
    button{
        margin: 8px;
        border-radius: 5px;
        background: #3f51b5;
        color: #ffffff;
        font-size: 16px;
        padding: 9px;
        border: 0px;
        cursor: pointer;
        transition: 0.2s;
        &:hover{
            opacity: 0.4;
        };
        &:active{
            opacity: 1;
        }
        display:flex;
        flex-direction:row;
        align-items:center;
               
    }
`

export const TagsContainer = styled.div`
    width: 100%;
    margin: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    border-radius: 9px;
    flex-wrap: wrap;
    button{
        margin: 8px;
        border-radius: 5px;
        background: #3f51b5;
        color: #ffffff;
        font-size: 16px;
        padding: 9px;
        border: 0px;
        cursor: pointer;
        transition: 0.2s;
        &:hover{
            opacity: 0.4;
        };
        &:active{
            opacity: 1;
        }
        display:flex;
        flex-direction:row;
        align-items:center;
               
    }
`
export const TitleID = styled.h6`
    color:#3f51b5;
    font-size: 14px;
`
export const TitleName = styled(Link)`
    font-size: 28px;
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

export const TitleDescription = styled.h6`
    font-size: 18px;
    color: #777777;
    text-align: justify;
`
export const Header = styled.header`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding: 16px;
    align-items: flex-start;
    button{
        margin: 8px;
        border-radius: 5px;
        background: #3f51b5;
        color: #ffffff;
        font-size: 16px;
        padding: 9px;
        border: 0px;
        cursor: pointer;
        transition: 0.2s;
        &:hover{
            opacity: 0.4;
        };
        &:active{
            opacity: 1;
        }
        display:flex;
        flex-direction:row;
        align-items:center;
    }
`;