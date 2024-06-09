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
    profileImage: string | ArrayBuffer | null = 'default-profile-image.jpg';
    file: File | null = null;

    constructor(public auth: AuthService, public router: Router, public userSvc: UserService) { }

    async ngOnInit(): Promise<void> {
        this.user = await this.userSvc.getCurrentUser();
        this.profileImage = this.user.profileImage || 'default-profile-image.jpg';
    }

    onFileSelected(event: Event): void {
        const target = event.target as HTMLInputElement;
        const file: File = (target.files as FileList)[0];
        this.file = file;
        const reader = new FileReader();
        reader.onload = (e: any) => {
            this.profileImage = e.target.result;
        }
        reader.readAsDataURL(this.file);
    }

    editProfileImage(): void {
        if (this.editing)
            document.getElementById('fileInput')?.click();
    }

    async uploadImage(): Promise<void> {
        if (this.file) {
            try {
                const response = await this.userSvc.uploadImage(this.file);
                console.log(response);
                this.profileImage = response.imageUrl;
            } catch (error) {
                console.error('Image upload failed:', error);
            }
        }
    }

    async save(): Promise<void> {
        this.editing = false;
        await this.uploadImage();
        this.userSvc.patchUser(this.user._id, this.user)
            .subscribe({
                next: (response: any) => {
                    // window.location.reload();
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
