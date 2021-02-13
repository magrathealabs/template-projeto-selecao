import { mocked } from 'ts-jest/utils';
import { Request, Response } from 'express';
import user from '@root/models/users';
import userController from '../../../src/controllers/user';

jest.mock('../../../src/controllers/user')

const mc = mocked(userController, true);

describe('test userController functions', () => {

    test('test getUserById', () => {
        const req = {} as Request;
        const res = {} as Response;
        req.params = {'pid': '1'};   

        mc.getUserById(req, res);
        expect(mc.getUserById.mock.calls.length).toBe(1);
        expect(res.statusCode).toBe(400);
        expect(res.json).toBe({ error: 'An id must be supplied' });

    })


});