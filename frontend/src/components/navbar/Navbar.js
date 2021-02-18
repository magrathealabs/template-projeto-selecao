import { Navbar, Form, InputGroup, FormControl, Button } from 'react-bootstrap';
import React, { useState } from 'react';
import Image from './github';
import { useAuth } from '../../context/authContext';
import api from '../../services/api';
import Switch from 'react-switch';

export default (props) => {
    const clientId = '89edf55f75ba76e63567';

    const { signIn, signed, signOut, user } = useAuth();

    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("");
    const [isPrivate, setIsPrivate] = useState(true);

    // Maior gambis da vida <3
    if (window.location.href.includes("?code=")) {
        localStorage.setItem('code', window.location.href.split("?code=")[1]);
        window.location.href = '/';
    } else if (localStorage.getItem('code')) {
        console.log("Loggin in");
        const code = localStorage.getItem('code');
        localStorage.removeItem('code');
        signIn(code);
    }

    function handleLogin() {
        if (!signed)
            window.location.href = `https://github.com/login/oauth/authorize?scope=user&client_id=${clientId}&redirect_uri=http://127.0.0.1:3000/`;
        else {
            signOut();
        }
    }

    function handleSearch(e) {
        e.preventDefault();
        const data = {
            params: {
                user: search,
                filter: filter
            }
        }
        api.get('/users/starred', data).then(res => {
            let data = {
                cards: res.data,
                user: search
            };
            props.setRepos(data);
        });
    }

    function handlePrivacy() {

        api.post('/users/tag/privacy')
            .then(res => {
                if (res.status == 200 || res.status == 201) {
                    setIsPrivate(res.data);
                }
            })
            .catch();
    }

    return (
        <>
            <Navbar fixed="top" className="bg-dark justify-content-between">
                <Form inline>
                    <Navbar.Brand href="#home">
                        <Image />
                    </Navbar.Brand>
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">/</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Username"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                        />
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">Filter?</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            onChange={e => setFilter(e.target.value)}
                            placeholder="Tag"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                        />
                        <Button type="search" onClick={e => handleSearch(e)} style={{ "borderRadius": "0px 5px 5px 0px" }}>Search repos!</Button>
                    </InputGroup>
                </Form>
                <Form inline>
                    <div>
                        <p style={{ color: 'whitesmoke', marginRight: '10px', display: 'inline' }}>Hello {signed ? `${user} | Make your tags private?` : "visitor"}  </p>
                    </div>
                    <div style={{ marginRight: '10px' }} >
                        {signed && <Switch width={30} height={15} onChange={() => handlePrivacy()} checked={isPrivate} />}
                    </div>


                    <Button onClick={handleLogin}>{signed ? "Logout" : "Login With Github"} </Button>
                </Form>
            </Navbar>
        </>
    );
}