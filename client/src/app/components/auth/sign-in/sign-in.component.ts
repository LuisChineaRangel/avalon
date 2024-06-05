import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { AuthService } from '@services/auth.service';

@Component({
    selector: 'app-sign-in',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule],
    templateUrl: './sign-in.component.html',
    styleUrl: './sign-in.component.scss'
})

export class SignInComponent implements OnInit {
    signInForm: FormGroup;
    error_message: string = '';

    formFields = [
        { label: 'Email', name: 'email' },
        { label: 'Password', name: 'password' },
    ];

    constructor(private auth: AuthService, private router: Router, formBuilder: FormBuilder) {
        this.signInForm = formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    ngOnInit(): void { }

    signIn(): void {
        if (this.signInForm.invalid) {
            this.error_message = 'Username or password is incorrect';
            return;
        }

        this.auth.signIn(this.signInForm.value)
            .subscribe({
                next: (response: any) => {
                    localStorage.setItem('token', response.token);
                    this.router.navigate(['/']);
                },
                error: (error: any) => {
                    this.error_message = error.error.message;
                    console.log(error);
                }
            });
    }
}
