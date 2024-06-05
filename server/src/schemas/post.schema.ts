import { Schema, model } from 'mongoose';
import { Post } from '@shared/interfaces/post.interface';

const PostSchema = new Schema<Post>({
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    game: { type: Schema.Types.ObjectId, ref: 'VideoGame', required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    featured_image: { type: String },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date },
    deleted_at: { type: Date }
});

export default model<Post>('Post', PostSchema);
