import { Schema, model } from 'mongoose';
import { User } from '@shared/interfaces/user.interface';

const UserSchema = new Schema<User>({
    username: { type: String, required: true, unique: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone_number: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImage: { type: String },
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date },
    deleted_at: { type: Date }
});

export default model<User>('User', UserSchema);
