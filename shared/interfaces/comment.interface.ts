import { User } from './user.interface';
import { Post } from './post.interface';

export interface Comment {
    id: string;
    author: User;
    post: Post;
    content: string;
    created_at: Date;
    updated_at?: Date;
    deleted_at?: Date;
}
