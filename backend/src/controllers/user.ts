const axios = require('axios');
const crypto = require('crypto');
import { Request, Response } from 'express';
import userModel from '../models/users';
import { IUser } from '../models/interfaces/user';

const has = require('has-keys');
const clientId = '89edf55f75ba76e63567';
const clientSecret = 'e475a4c0226361572be5c3ab1232530859ec4ca7';


let getUserById = async (req: Request, res: Response) => {

        if(!has(req.params, 'id')) return res.status(400).send({ error: 'An id must be supplied' });

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
        
        const { name, sessionId, gitId, gitToken }: IUser = data;
        let user = await userModel.findOne({_id: gitId});
        if (user) {
            await userModel.updateOne(user, {$set: {sessionId: sessionId} });
        } else {
            await userModel.create({
                name, 
                sessionId,
                gitId, 
                gitToken,
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
        .then((res: any) => res.data['access_token'])
        .then((_token: any) => {
            
            const opts = { headers: { Authorization: `bearer  ${_token}` } };
            axios.get(`https://api.github.com/user`, opts)
            .then((_res: any) => {
                const sessionId: String = crypto.randomBytes(16).toString('base64');
                const { name, id } = _res.data;
                createUser({name, sessionId, id, _token});
                return res.json(sessionId);
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