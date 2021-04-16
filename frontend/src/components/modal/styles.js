import styled from "styled-components"

export const ContainerModal = styled.div`
    height: 200px;
    background: #f3f3f3;
    margin: 100px 300px 100px 300px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    padding: 16px;
    border-radius: 8px;
    border: 0;
    @media only screen and (max-width: 1024px) {
        margin: 100px 50px 100px 50px;
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

