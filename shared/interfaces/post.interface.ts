import { User } from './user.interface';
import { VideoGame } from './videogame.interface';
import { Comment } from './comment.interface';

export interface Post {
    id: string;
    author: User;
    game: VideoGame;
    title: string;
    content: string;
    comments?: Comment[];
    featured_image?: string;
    created_at: Date;
    updated_at?: Date;
    deleted_at?: Date;
}
