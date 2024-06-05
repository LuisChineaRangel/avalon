export interface User {
    id: string;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    password: string;
    role: string;
    followers?: User[];
    following?: User[];
    created_at: Date;
    updated_at?: Date;
    deleted_at?: Date;
}
