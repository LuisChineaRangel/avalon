import { Post } from './post.interface';

export interface Comment {
    author: string;
    post: Post;
    content: string;
    created_at: Date;
    updated_at?: Date;
    deleted_at?: Date;
}
