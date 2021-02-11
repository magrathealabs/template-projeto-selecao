import { Navbar, Form, InputGroup, FormControl, Button } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import Image from './github';


export default () => { 
    const clientId = '89edf55f75ba76e63567';
    const [gitText, setGitText] = useState("asd");


    function isLoggedIn() {
        return localStorage.getItem("gttk") != null;
    }

    function github() {
        if (isLoggedIn()) {
            localStorage.removeItem("gttk");
            window.location.href = "https://localhost:3000/";
        } else {
            window.location.href=`https://github.com/login/oauth/authorize?scope=user&client_id=${clientId}&redirect_uri=http://127.0.0.1:3000/login`;
        }
    }

    return (
    <>
        <Navbar className="bg-dark justify-content-between">
                <Form inline>
                    <Navbar.Brand href="#home">
                        <Image/>
                    </Navbar.Brand>
                    <InputGroup>
                    <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1">/</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        placeholder="Username"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                    />
                    <Button type="search" style={{ "borderRadius": "0px 5px 5px 0px"}}>Search Repos</Button>
                    </InputGroup>
                </Form>
                <Form inline>
                    <Button type="button" onCompositionEnd={_ => {setGitText(isLoggedIn() ? "Logout" : "Login with Github")}} variant="light" onClick={_ => github()}>
                    {gitText}
                    </Button>
                </Form>
        </Navbar>
    </>
    );
}