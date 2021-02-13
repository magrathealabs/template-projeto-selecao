import { Document } from 'mongoose';

export interface IUser extends Document {

    name: string;
    sessionId: string;
    gitId: string;
    gitToken: string;

    starred?: starred[];

}

interface starred {
    url: string;
    tags: string[];
}
