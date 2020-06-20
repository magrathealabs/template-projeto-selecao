import React from 'react';
import { withRouter } from 'react-router-dom';

import GitHubLogin from 'react-github-login';

import './styles.scss';

const Login = () => {
    const onSuccessGithub = (response) => {
        const code = response.code;
        window.location.href = 'http://localhost:5000/oauth/?code=' + code;
    };

    return (
        <section className='d-flex flex-justify-center flex-items-center '>
            <div className='col-3 mt-5'>
                <div className='Box box-shadow'>
                    <div className='Box-row'>
                        <h3 className='m-0 text-center'>Git tag manager</h3>
                    </div>
                    <div className='Box-row'>
                        <p className='mb-0 text-gray text-center'>Hey, faça login com sua conta do Github para começar!</p>
                    </div>
                    <div className='Box-row text-center'>
                        <GitHubLogin
                            className='btn btn-primary'
                            clientId='2d1dcec2c49eb2043025'
                            onSuccess={onSuccessGithub}
                            valid={true}
                            redirectUri='http://localhost:3000/'
                        >
                            Logar com Github
                        </GitHubLogin>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default withRouter(Login);
