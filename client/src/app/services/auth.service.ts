import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import dotenv from 'dotenv';

dotenv.config();

@Injectable({
    providedIn: 'root'
})



export class AuthService {
    serverUrl = process.env["SERVER_URL"] || 'http://localhost:3000';
    private signUpUrl = this.serverUrl + '/sign-up';
    private signInUrl = this.serverUrl + '/sign-in';

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
        this.router.navigate(['/']);
    }
}
