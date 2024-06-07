import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthService } from '@services/auth.service';
import { MaterialModule } from '@app/material.module';
import { jwtDecode } from 'jwt-decode';

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

    constructor(public auth: AuthService, public router: Router) { }

    ngOnInit(): void {
        if (!this.auth.loggedIn()) {
            this.router.navigate(['/login']);
            return;
        }

        this.token = this.auth.getToken();
        this.token = jwtDecode(this.token);
        this.user = this.token.user;
        console.log(this.token);
    }

    save(): void {
        this.editing = false;
    }

    cancel(): void {
        this.editing = false;
    }
}
