import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { SignupMain, Text, ContainerSignupMain, By, SpanStyled } from "./styles"

function Signup() {
    const { loginWithRedirect } = useAuth0()
    function onClickRegisterLogin() {
        loginWithRedirect()
    }
    return <ContainerSignupMain>
        <Text> 🦄 Welcome to Tag Generate for GitHub </Text>
        <SignupMain>
            <button onClick={onClickRegisterLogin}>
                Enter you credentials
            </button>
        </SignupMain>
        <By>
            <h1>By Rawan Hawangledt -</h1>
            <SpanStyled to={{
                pathname: "https://github.com/Hawangledt/"
            }} target="_blank">
                Github: Hawangledt
            </SpanStyled>
        </By>
    </ContainerSignupMain>
}

export default Signup