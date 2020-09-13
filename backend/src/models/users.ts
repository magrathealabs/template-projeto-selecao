import mongoose from 'mongoose';

import { IUser } from './interfaces/user';

const userSchema = new mongoose.Schema<IUser>({
    name: String,
    email: String,
    starred: [{
        url: String,
        tags: Array
    }]
});


const User = mongoose.model<IUser>('User', userSchema);


export default User;