import {Schema, model} from 'mongoose';
import {Comment} from '@shared/interfaces/comment.interface';

const CommentSchema = new Schema<Comment>({
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
    content: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date },
    deleted_at: { type: Date }
});

export default model<Comment>('Comment', CommentSchema);
