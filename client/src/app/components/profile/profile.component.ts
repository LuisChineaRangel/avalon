import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@app/material.module';
import { jwtDecode } from 'jwt-decode';

import { AuthService } from '@services/auth.service';
import { UserService } from '@app/services/user.service';

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [CommonModule, MaterialModule, RouterModule, RouterOutlet, FormsModule, ReactiveFormsModule],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
    token: any;
    user: any;
    editing: boolean = false;

    constructor(public auth: AuthService, public router: Router, public userSvc: UserService) { }

    ngOnInit(): void {
        if (!this.auth.loggedIn()) {
            this.router.navigate(['/login']);
            return;
        }

        this.token = this.auth.getToken();
        this.token = jwtDecode(this.token);
        this.user = this.token.user;
    }

    save(): void {
        this.editing = false;
        this.userSvc.patchUser(this.user._id, this.user)
            .subscribe({
                next: (response: any) => {
                    console.log(response);
                },
                error: (error: any) => {
                    console.log(error);
                }
            });
    }

    cancel(): void {
        this.editing = false;
    }
}
