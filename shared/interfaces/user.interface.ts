export interface User {
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    password: string;
    profileImage: string;
    followers?: string[];
    following?: string[];
    created_at: Date;
    updated_at?: Date;
    deleted_at?: Date;
}
