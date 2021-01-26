import mongoose from 'mongoose';

import { IUser } from './interfaces/user';

const userSchema = new mongoose.Schema<IUser>({
    name: String,
    sessionId: String,
    gitId: String,
    gitToken: String,

    starred: [{
        url: String,
        tags: Array
    }]
});


const User = mongoose.model<IUser>('User', userSchema);


export default User;