import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { SERVER_URL } from 'src/utils/app.constants';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private isAuthenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private signUpUrl = `${SERVER_URL}/sign-up`;
    private signInUrl = `${SERVER_URL}/sign-in`;

    constructor(private http: HttpClient) {}

    signUp(userData: FormData) {
        return this.http.post<any>(this.signUpUrl, userData);
    }

    signIn(user: any) {
        return this.http.post<any>(this.signInUrl, user);
    }

    loggedIn(): boolean {
        return !!localStorage.getItem('token');
    }

    getToken(): any {
        return localStorage.getItem('token');
    }

    logout(): void {
        localStorage.removeItem('token');
        this.setAuthenticated(false);
        //window.location.reload();
    }

    isAuthenticated(): Observable<boolean> {
        return this.isAuthenticatedSubject.asObservable();
    }

    setAuthenticated(isAuthenticated: boolean) {
        this.isAuthenticatedSubject.next(isAuthenticated);
    }
}
