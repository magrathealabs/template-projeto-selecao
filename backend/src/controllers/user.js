const status = require('http-status');

const userModel = require('@models/users.js');


const has = require('has-keys');


module.exports = {
    async getUserById(req, res){
        if(!has(req.params, 'id'))
            throw {code: status.BAD_REQUEST, message: 'You must specify the id'};

        let {id} = req.params;

        let data = await userModel.findOne({where: {id}});

        if(!data)
            throw {code: status.BAD_REQUEST, message: 'User not found'};

        res.json({status: true, message: 'Returning user', data});
    },
    async getUsers(req, res){
        let data = await userModel.findAll();

        res.json({status: true, message: 'Returning users', data});
    },
    async newUser(req, res){
        if(!has(req.params, ['name', 'email']))
            throw {code: status.BAD_REQUEST, message: 'You must specify the name and email'};

        let { name, email } = req.body;
        
        await userModel.create({name, email});

        res.json({status: true, message: 'User Added'});
    },
    async updateUser(req, res){
        if(!has(req.body, ['id', 'name', 'email']))
            throw {code: status.BAD_REQUEST, message: 'You must specify the id, name and email'};

        let { id, name, email } = req.body;
    
        await userModel.updateUser({name, email}, {where:{id}});

        res.json({status: true, message: 'User updated'});
    },
    async deleteUser(req, res){
        if(!has(req.params, 'id'))
            throw {code: status.BAD_REQUEST, message: 'You must specify the id'};

        let { id } = req.params;

        await userModel.destroy({where: {id}});

        res.json({status: true, message: 'User deleted'});
    }
}
