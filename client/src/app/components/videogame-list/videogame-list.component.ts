import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

import { VideoGame } from '@shared/interfaces/videogame.interface';
import { VideoGameService } from '@services/videogame.service';

@Component({
    selector: 'app-videogame-list',
    standalone: true,
    imports: [CommonModule, MatCardModule],
    templateUrl: './videogame-list.component.html',
    styleUrl: './videogame-list.component.scss'
})

export class VideoGameListComponent implements OnInit {
    videoGames: VideoGame[] = [];

    constructor(private videoGameService: VideoGameService) {}

    ngOnInit(): void {
        this.videoGameService.getVideoGames().subscribe({
            next: (videoGames: VideoGame[]) => {
                this.videoGames = videoGames;
            },
            error: (error) => {
                console.error(error);
            }
        });
    }
}
