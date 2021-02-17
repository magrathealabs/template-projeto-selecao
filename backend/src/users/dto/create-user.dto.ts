import { Schema } from 'mongoose';

export class CreateUserDto {
    constructor(_id: Number, name: string, sessionId: string, _token: string) { 
        this._id = _id; 
        this.name = name; 
        this.sessionId = sessionId; 
        this._token = _token; 
        this.details = JSON.stringify({});
    }

    _id: Number;
    name: string;
    sessionId: string;
    _token: string;
    details: string;
}
