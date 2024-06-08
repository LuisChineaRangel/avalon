import { Comment } from './comment.interface';

export interface Post {
    author: string;
    title: string;
    content: string;
    comments?: Comment[];
    featured_image?: string;
    created_at: Date;
    updated_at?: Date;
    deleted_at?: Date;
}
