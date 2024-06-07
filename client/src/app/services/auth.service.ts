import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { SERVER_URL } from 'src/utils/app.constants';

@Injectable({
    providedIn: 'root'
})



export class AuthService {
    private signUpUrl = `${SERVER_URL}/sign-up`;
    private signInUrl = `${SERVER_URL}/sign-in`;

    constructor(private http: HttpClient, private router: Router) { }

    signUp(userData: FormData) {
        return this.http.post<any>(this.signUpUrl, userData);
    }

    signIn(user: any) {
        return this.http.post<any>(this.signInUrl, user);
    }

    loggedIn() {
        return !!localStorage.getItem('token');
    }

    getToken() {
        return localStorage.getItem('token');
    }

    logout() {
        localStorage.removeItem('token');
        this.router.navigate(['/login']).then(() => {
            window.location.href = '/login';
        });
    }
}
