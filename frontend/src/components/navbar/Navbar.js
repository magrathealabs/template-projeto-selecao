import { Navbar, Form, InputGroup, FormControl, Button } from 'react-bootstrap';
import React, { useEffect, useState }  from 'react';
import Image from './github';
import GitHubLogin from 'react-github-login';

export default () => { 
    const clientId = '89edf55f75ba76e63567';
    const [authorize, setAuthorize] = useState(false);

    useEffect( () => {
        if (authorize) {
            console.log("AE")
            window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}`;
        }
    });

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
                    <GitHubLogin clientId={clientId}
                    onSuccess={(res) => {console.log(res)}}
                    onFailure={(res) => {console.log(res)}}
                    />
                    {/* <Button type="login" onClick={e => { e.preventDefault(); setAuthorize(true)} }>Login with Github</Button> */}
                </Form>
        </Navbar>
    </>
    );
}