import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@app/material.module';
import { lastValueFrom } from 'rxjs';

import { UserService } from '@services/user.service';

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [CommonModule, RouterModule, MaterialModule],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.scss'
})

export class ProfileComponent implements OnInit {
    user: any = {};

    constructor(private userSvc: UserService) { }

    async ngOnInit(): Promise<void> {
        this.userSvc.getCurrentUser().then(user_data => {
            lastValueFrom(this.userSvc.getProfile(user_data.username)).then(user => {
                this.user = user;
                console.log(this.user);
            });
        });
    }
}
