import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@app/material.module';

import { Post } from '@shared/interfaces/post.interface';
import { PostService } from '@services/post.service';

@Component({
    selector: 'app-posts-list',
    standalone: true,
    imports: [CommonModule, MaterialModule, RouterModule],
    templateUrl: './posts-list.component.html',
    styleUrl: './posts-list.component.scss'
})
export class PostsListComponent implements OnInit {
    posts: Post[] = [];

    constructor(private postSvc: PostService) { }

    ngOnInit(): void {
        this.postSvc.getPosts().subscribe((result: Post[]) => {
            this.posts = result;
            this.posts.sort((a, b) => {
                return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
            });
        });
    }
}
