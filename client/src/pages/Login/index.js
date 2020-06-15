import React from 'react';
import { withRouter } from 'react-router-dom';

import { login } from '../../services/auth';
import GitHubLogin from 'react-github-login';

import './styles.scss';

import api from '../../services/api';

const SignIn = (props) => {
    const onSuccessGithub = (response) => {
        console.log('REsponse: ', response);
        const code = response.code;

        window.location.href = 'http://localhost:5000/oauth/?code=' + code;
    };

    return (
        <section className='d-flex flex-justify-center flex-items-center '>
            <div className='col-4 mt-5'>
                <div className='Box box-shadow'>
                    <div className='Box-row'>
                        <h3 className='m-0 text-center'>Git tag manager</h3>
                    </div>
                    <div className='Box-row'>
                        <p className='mb-0 text-gray text-center'>Hey, log in with your GitHub account to get started</p>
                    </div>
                    <div className='Box-row text-center'>
                        <GitHubLogin
                            className='btn btn-primary'
                            clientId='1aa8f80f9003b322baf9'
                            onSuccess={onSuccessGithub}
                            valid={true}
                            redirectUri='http://localhost:3000/'
                        >
                            Login with Github
                        </GitHubLogin>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default withRouter(SignIn);
