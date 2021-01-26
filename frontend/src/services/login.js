import api from './api';

const loginWithGithub = async () => {    
    const res = await api.get('/api/login');
    console.log(res);
}

export default loginWithGithub;

