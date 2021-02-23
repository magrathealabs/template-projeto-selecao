import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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

    @Prop({default: []})
    repos: [UserStarred]
    
    @Prop()
    details: string;

    @Prop()
    etag: string

    @Prop({type: Boolean, default: true})
    isPrivate: boolean
    
}

@Schema({minimize: false})
export class UserStarred {
    @Prop()
    id: string;

    @Prop()
    owner: string;

    @Prop()
    name: string;

    @Prop()
    description: string;

    @Prop()
    url: string;

    @Prop()
    tags: [Tags]
}

@Schema()
export class Tags {
    @Prop()
    variant: string;

    @Prop()
    text: string;
}

export const UserSchema = SchemaFactory.createForClass(User);