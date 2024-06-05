export interface VideoGame {
    id: string;
    name: string;
    description: string;
    release_date: Date;
    rating: number;
    genre: string;
    platforms: string;
    cover_image?: string;
    created_at: Date;
    updated_at?: Date;
    deleted_at?: Date;
}
