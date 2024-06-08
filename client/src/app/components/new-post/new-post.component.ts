import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MaterialModule } from '@app/material.module';
import { PostService } from '@services/post.service';

@Component({
    selector: 'app-new-post',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, MaterialModule, RouterModule],
    templateUrl: './new-post.component.html',
    styleUrl: './new-post.component.scss'
})
export class NewPostComponent implements OnInit {
    newPostForm: FormGroup;

    constructor(private postSvc: PostService, private router: Router, formBuilder: FormBuilder) {
        this.newPostForm = formBuilder.group({
            title: ['', Validators.required],
            content: ['', Validators.required],
            featured_image: ['']
        });
    }

    ngOnInit(): void { }

    newPost(): void {
        if (this.newPostForm.invalid)
            return;
        this.postSvc.postPost(this.newPostForm.value)
            .subscribe({
                next: (response: any) => {
                    this.router.navigate(['/']).then(() => {
                        window.location.reload();
                    });
                },
                error: (error: any) => {
                    console.log(error);
                }
            });
    }
}
