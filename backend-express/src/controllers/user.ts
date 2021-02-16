const axios = require('axios');
import { AxiosResponse } from 'axios';
const crypto = require('crypto');
import { Request, Response } from 'express';
import userModel from '../models/users';
import { IUser } from '../models/interfaces/user';

const clientId = '89edf55f75ba76e63567';
const clientSecret = '12926e1fe82f004aba1e340c1aa914bde01edffe';


let getUserById = async (req: Request, res: Response) => {

    let {id} = req.params;

    let data = await userModel.findOne({_id: id})

    if(!data) return res.status(400).send({ error: 'User not found' });

    res.json({status: true, message: 'Returning user', data});
};

let getAll = async (req: Request, res: Response) => {
        let data = await userModel.find();

        res.json({status: true, message: 'All users', data});
    };

let createUser = async (data: any) => {
        
        const { name, sessionId, id, _token }: IUser = data;
        const _id = id;
        
        let user = await userModel.findOne({_id: _id});
        if (user) {
            console.log("User exists, updating sessionId", sessionId);
            await userModel.updateOne(user, {$set: {sessionId: sessionId} });
        } else {
            console.log('creating new user', _id, name, sessionId, _token);
            await userModel.create({
                _id,
                name, 
                sessionId,
                _token,
            });
        }   
    }

let login = async (req: Request, res: Response) => {
        const body = {
            client_id: clientId,
            client_secret: clientSecret,
            code: req.query.code
        };
        const opts = { headers: { accept: 'application/json' } };
        
        axios.post(`https://github.com/login/oauth/access_token`, body, opts)
        .then((_res: AxiosResponse) => _res.data['access_token'])
        .then((_token: String) => {
            console.log("access_token", _token);
            const opts = { headers: { Authorization: `bearer  ${_token}` } };
            axios.get(`https://api.github.com/user`, opts)
            .then(async (_res: AxiosResponse) => {
                const sessionId: String = crypto.randomBytes(16).toString('base64');
                const { name, id } = _res.data;
                await createUser({name, sessionId, id, _token});
                const clientPayload = {sessionId: sessionId};
                console.log("returning clientPayload", clientPayload)
                return res.status(200).json(clientPayload);
            })
            .catch((err: Error) => res.status(501).json({message: err.message}));
            
        })
        .catch((err: Error) => res.status(500).json({message: err.message}));
    };

export default {
    getUserById,
    getAll,
    login
};