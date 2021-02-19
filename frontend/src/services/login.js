import { api } from './api';

const LoginWithGithub = (code) => {    
    return api.get(`users/login?code=${code}`);
}

export default LoginWithGithub;

