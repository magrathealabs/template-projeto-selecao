import api from './api';

const LoginWithGithub = async (code) => {    
    return await api.get(`api/login?code=${code}`);
}

export default LoginWithGithub;

