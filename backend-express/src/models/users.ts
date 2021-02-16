import mongoose from 'mongoose';

import { IUser } from './interfaces/user';

const userSchema = new mongoose.Schema<IUser>({
    _id: Number,
    name: String,
    sessionId: String,
    _token: String,

    starred: [{
        url: String,
        tags: Array
    }]
});


const User = mongoose.model<IUser>('User', userSchema);


export default User;