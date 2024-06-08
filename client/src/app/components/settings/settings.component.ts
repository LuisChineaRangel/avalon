import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@app/material.module';

import { AuthService } from '@services/auth.service';
import { UserService } from '@app/services/user.service';

@Component({
    selector: 'app-settings',
    standalone: true,
    imports: [CommonModule, MaterialModule, RouterModule, RouterOutlet, FormsModule, ReactiveFormsModule],
    templateUrl: './settings.component.html',
    styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnInit {
    token: any;
    user: any = {};
    editing: boolean = false;

    constructor(public auth: AuthService, public router: Router, public userSvc: UserService) { }

    async ngOnInit(): Promise<void> {
        this.user = await this.userSvc.getCurrentUser();
    }

    save(): void {
        this.editing = false;
        this.userSvc.patchUser(this.user._id, this.user)
            .subscribe({
                next: (response: any) => {
                    window.location.reload();
                },
                error: (error: any) => {
                    console.log(error);
                }
            });
    }

    cancel(): void {
        this.editing = false;
    }

    onFileSelected(event: any): void {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];

            const reader = new FileReader();
            reader.onload = e => this.user.profileImage = reader.result;

            reader.readAsDataURL(file);
        }
    }
}
