import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '@shared/interfaces/user.interface';
import { SERVER_URL } from 'src/utils/app.constants';

@Injectable({
    providedIn: 'root'
})

export class UserService {
    private userURL = `${SERVER_URL}/users`;

    constructor(private http: HttpClient) { }

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.userURL);
    }

    getUser(id: string): Observable<User> {
        return this.http.get<User>(`${this.userURL}/${id}`);
    }

    deleteUser(id: string): Observable<User> {
        return this.http.delete<User>(`${this.userURL}/${id}`);
    }

    patchUser(id: string, formData: FormData): Observable<User> {
        return this.http.patch<User>(`${this.userURL}/${id}`, formData);
    }
}
