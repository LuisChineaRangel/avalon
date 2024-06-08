import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

import { Post } from '@shared/interfaces/post.interface';
import { UserService } from '@services/user.service';
import { PostService } from '@services/post.service';
import { SidebarComponent } from '@components/sidebar/sidebar.component';
import { AuthService } from '@services/auth.service';
import { MaterialModule } from '@app/material.module';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, MaterialModule, SidebarComponent, RouterModule, RouterOutlet],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})

export class HomeComponent implements OnInit {
    token: any;
    user: any = {};
    feed: Post[] = [];

    constructor(public auth: AuthService, public router: Router, private userSvc: UserService, private postSvc: PostService) { }

    async ngOnInit(): Promise<void> {
        this.user = await this.userSvc.getCurrentUser();
    }
}
