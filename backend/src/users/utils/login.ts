const axios = require('axios');
import { AxiosResponse } from 'axios';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from '../dto/create-user.dto';

const configService = new ConfigService();
export const getAccessToken = (code: string): Promise<AxiosResponse> => {
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

export const registerAnonymous = (name: string): Partial<CreateUserDto> => {
    return axios({
        url: `https://api.github.com/users/${name}`,
        headers: {
            Accept: 'application/vnd.github.v3+json'
        }
    }).then(res => {
        return {
            _id: res.data.id,
            name: res.data.login
        }
    }).catch(err => {
        throw new Error('User does not exist');
    })
}