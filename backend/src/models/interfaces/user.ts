import { Document } from 'mongoose';

export interface IUser extends Document {

    name: string;
    email: string;

    starred?: starred[];

}

interface starred {
    url: string;
    tags: string[];
}
