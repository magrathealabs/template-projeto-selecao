import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
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
    starred?: starred[];
}

interface starred {
    url: string;
    tags: string[];
}
// declare var Starred: starred;

export const UserSchema = SchemaFactory.createForClass(User);