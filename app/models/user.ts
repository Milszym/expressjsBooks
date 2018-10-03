import * as mongoose from 'mongoose';
import {Document, Model, Schema} from 'mongoose';

export interface IUser extends Document {
    name: string;
    password: string;
}

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
});

export const User = mongoose.model<IUser>("User", userSchema);