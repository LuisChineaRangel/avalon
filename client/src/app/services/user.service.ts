import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, lastValueFrom } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

import { User } from '@shared/interfaces/user.interface';
import { SERVER_URL } from 'src/utils/app.constants';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})

export class UserService {
    private userURL = `${SERVER_URL}/users`;

    constructor(private http: HttpClient, private auth: AuthService) { }

    private getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.userURL);
    }

    private getUser(id: string): Observable<User> {
        return this.http.get<User>(`${this.userURL}/${id}`);
    }

    getProfile(username: string): Observable<User> {
        return this.http.get<User>(`${this.userURL}/username/${username}`);
    }

    deleteUser(id: string): Observable<User> {
        return this.http.delete<User>(`${this.userURL}/${id}`);
    }

    patchUser(id: string, formData: FormData): Observable<User> {
        return this.http.patch<User>(`${this.userURL}/${id}`, formData);
    }

    async getCurrentUser(): Promise<any> {
        let token = this.auth.getToken();
        token = jwtDecode(token);
        if (token && token.id) {
            const user = await lastValueFrom(this.getUser(token.id));
            return user;
        }
        else
            return null;
    }

    async getFollowing(id: string): Promise<string[] | undefined> {
        console.log(id);
        const user = await lastValueFrom(this.getUser(id));
        return user.following;
    }

    async getFollowers(id: string): Promise<string[] | undefined> {
        const user = await lastValueFrom(this.getUser(id));
        return user.followers;
    }


    async uploadImage(file: File): Promise<any> {
        const user = await this.getCurrentUser();
        const formData = new FormData();
        formData.append('file', file, file.name);
        return this.http.post(`${this.userURL}/upload?user=${user._id}`, formData).subscribe({
            next: (response: any) => {
                console.log(response);
                return response;
            },
            error: (error: any) => {
                console.log(error);
                return error;
            }
        });
    }
}
