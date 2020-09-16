import { Navbar, Form, InputGroup, FormControl, Button } from 'react-bootstrap';
import React from 'react';
import Image from './github';

export default () => { 
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
                    <Button type="search" style={{ "border-radius": "0px 5px 5px 0px"}}>Search Repos</Button>
                    </InputGroup>
                </Form>
                <Form inline>
                    <Button type="login">Login with Github</Button>
                </Form>
        </Navbar>
    </>
    );
}