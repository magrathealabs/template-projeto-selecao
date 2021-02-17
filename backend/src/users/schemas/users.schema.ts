import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document, Schema as mSchema } from 'mongoose';
import { getStarredRepos } from '../utils/search';
// import  from 'mongoose';

export type UserDocument = User & Document;

@Schema({minimize: false})
export class User {
    @Prop()
    _id: Number;

    @Prop()
    name: string;

    @Prop()
    sessionId: string;

    @Prop()
    _token: string;

    @Prop()
    details: string;
    
}

export const UserSchema = SchemaFactory.createForClass(User);