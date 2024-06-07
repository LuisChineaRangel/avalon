import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

import { Post } from '@shared/interfaces/post.interface';
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
    user: any;
    feed: Post[] = [];

    constructor(public auth: AuthService, public router: Router, private PostService: PostService) { }

    ngOnInit(): void {
        this.token = this.auth.getToken();

        if (!this.token) {
            this.router.navigate(['/login']);
            return;
        }

        try {
            this.token = jwtDecode(this.token);
        } catch (error) {
            console.error('Token inválido:', error);
            this.router.navigate(['/login']);
            return;
        }

        this.user = this.token.user;

        // this.PostService.getPosts().subscribe({
        //     next: (posts: Post[]) => {
        //         for (let post of posts) {
        //             post.author.id === this.user.id ? this.feed.push(post) : null;
        //         }
        //     },
        //     error: (error) => {
        //         console.error(error);
        //     }
        // });
    }
}
