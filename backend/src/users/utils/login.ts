const axios = require('axios');
import { AxiosResponse } from 'axios';
import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();
export const getAccessToken = (code: string) : Promise<AxiosResponse> => {
    const body = {
        client_id: configService.get("CLIENT_ID"),
        client_secret: configService.get("CLIENT_SECRET"),
        code: code
    };
    const opts = { headers: { accept: 'application/json' } };
    
    return axios.post(`https://github.com/login/oauth/access_token`, body, opts)
};

export const getUserData = (_token: string): Promise<AxiosResponse> => {
    const opts = { headers: { Authorization: `bearer  ${_token}` } };
    return axios.get(`https://api.github.com/user`, opts);
}