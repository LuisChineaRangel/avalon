import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '@app/material.module';

import { AuthService } from '@services/auth.service';
import { UserService } from '@services/user.service';

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [MaterialModule, RouterModule],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.scss'
})

export class SidebarComponent implements OnInit {
    username: string = '';
    title: string = 'Avalon';

    constructor(public auth: AuthService, public router: Router, public userSvc: UserService) { }

    async ngOnInit(): Promise<void> {
        let user = await this.userSvc.getCurrentUser();
        this.username = user.username;
    }

    logout(): void {
        this.auth.logout();
    }
}
