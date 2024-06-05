import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControlOptions } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { AuthService } from '@services/auth.service';

@Component({
    selector: 'app-sign-up',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule],
    templateUrl: './sign-up.component.html',
    styleUrl: './sign-up.component.scss'
})

export class SignUpComponent implements OnInit {
    signUpForm: FormGroup;
    error_message: string = '';

    formFields = [
        { label: 'Username', name: 'username' },
        { label: 'First Name', name: 'first_name' },
        { label: 'Last Name', name: 'last_name' },
        { label: 'Email', name: 'email' },
        { label: 'Phone Number', name: 'phone_number' },
        { label: 'Password', name: 'password' },
        { label: 'Confirm Password', name: 'confirmPassword' },
    ];

    constructor(private auth: AuthService, private router: Router, formBuilder: FormBuilder) {
        this.signUpForm = formBuilder.group({
            username: ['', Validators.required],
            first_name: ['', Validators.required],
            last_name: ['', Validators.required],
            email: ['', Validators.required],
            phone_number: ['', Validators.required],
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required],
            acceptTerms: [false, Validators.requiredTrue]
        }, { validators: this.passwordValidator } as AbstractControlOptions);
    }

    ngOnInit(): void { }

    signUp(): void {
        if (this.signUpForm.invalid || this.signUpForm.get('acceptTerms')?.value === false) {
            this.error_message = 'Please fill out all required fields and accept the terms';
            return;
        }

        this.auth.signUp(this.signUpForm.value)
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

    passwordValidator(form: FormGroup) {
        const password = form.get('password');
        const confirmPassword = form.get('confirmPassword');

        password?.value !== confirmPassword?.value ? confirmPassword?.setErrors({ passwordMismatch: true }) : confirmPassword?.setErrors(null);
    }
}
