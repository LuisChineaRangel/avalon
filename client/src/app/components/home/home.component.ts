import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { jwtDecode } from 'jwt-decode';

import { Post } from '@shared/interfaces/post.interface';
import { PostService } from '@services/post.service';
import { AuthService } from '@services/auth.service';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, MatCardModule],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})

export class HomeComponent implements OnInit {
    token: any;
    user: any;
    feed: Post[] = [];

    constructor(private AuthService: AuthService, private PostService: PostService) { }

    ngOnInit(): void {
        this.token = this.AuthService.getToken();

        if (!this.token)
            return;
        this.token = jwtDecode(this.token);
        this.user = this.token.user;

        this.PostService.getPosts().subscribe({
            next: (posts: Post[]) => {
                for (let post of posts) {
                    post.author.id === this.user.id ? this.feed.push(post) : null;
                }
            },
            error: (error) => {
                console.error(error);
            }
        });
    }
}
