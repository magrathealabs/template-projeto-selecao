import { Document, Schema } from 'mongoose';

export interface IUser extends Document {
    _id: Number;
    name: string;
    sessionId: string;
    _token: string;

    starred?: starred[];

}

interface starred {
    url: string;
    tags: string[];
}
