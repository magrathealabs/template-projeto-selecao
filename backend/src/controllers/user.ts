import { Request, Response } from 'express';
import userModel from '../models/users';
import { IUser } from '../models/interfaces/user';

const has = require('has-keys');

export default {
    async getUserById(req: Request, res: Response) {

        if(!has(req.params, 'id')) return res.status(400).send({ error: 'An id must be supplied' });

        let {id} = req.params;

        let data = await userModel.findOne({_id: id})

        if(!data) return res.status(400).send({ error: 'User not found' });

        res.json({status: true, message: 'Returning user', data});
    },

    async getAll(req: Request, res: Response) {
        let data = await userModel.find();

        res.json({status: true, message: 'All users', data});
    },

    async createUser(req: Request, res: Response) {
        // validacao
        const { name, email }: IUser = req.body;

        const user = await userModel.create({
           name,
           email
        });

        return res.status(200).send({ user })

    }
}
