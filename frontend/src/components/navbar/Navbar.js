import { Navbar, Form, InputGroup, FormControl, Button } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import Image from './github';
import { useAuth } from '../../context/authContext';
import { api, redirect_uri, client_id, ssl } from '../../services/api';
import Switch from 'react-switch';

export default (props) => {
    const { signIn, signed, signOut, user } = useAuth();

    // Maior gambis da vida <3
    if (window.location.href.includes("?code=")) {
        localStorage.setItem('code', window.location.href.split("?code=")[1]);
        window.location.href = '/';
    } else if (localStorage.getItem('code')) {
        const code = localStorage.getItem('code');
        localStorage.removeItem('code');
        signIn(code);
    }

    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("");
    const [isPrivate, setIsPrivate] = useState(true);
    
    useEffect(() => {
        if (signed) {
            api.get('/users/tag/privacy').then(res => setIsPrivate(res.data));
            handleSearch({
                params: {
                    user,
                    filter
                }
            });
            setSearch(user);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [signed]);

    function handleLogin() {
        if (!signed) {
            window.location.href = `https://github.com/login/oauth/authorize?scope=user&client_id=${client_id}&redirect_uri=http${ssl}://${redirect_uri}`;
        }
        else {
            signOut();
        }
    }

    function handleSearch(payload = null) {
        payload = payload || {
            params: {
                user: search,
                filter: filter
            }
        }

        api.get('/users/starred', payload).then(res => {
            let data = {
                cards: res.data,
                user: payload.params.user
            };
            console.log(data);
            props.setRepos(data);
        });
    }

    function handlePrivacy() {

        api.post('/users/tag/privacy')
            .then(res => {
                if (res.status === 200 || res.status === 201) {
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
                            value={search}
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
                        <Button type="search" onClick={e => { e.preventDefault(); handleSearch() }} style={{ "borderRadius": "0px 5px 5px 0px" }}>Search repos!</Button>
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