import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { VideoGame } from '@shared/interfaces/videogame.interface';
import { SERVER_URL } from '@utils/app.constants';

@Injectable({
    providedIn: 'root'
})

export class VideoGameService {
    private videoGameURL = `${SERVER_URL}/videogames`;

    constructor(private http: HttpClient) { }

    getVideoGames(): Observable<VideoGame[]> {
        return this.http.get<VideoGame[]>(this.videoGameURL);
    }

    getVideoGame(id: string): Observable<VideoGame> {
        return this.http.get<VideoGame>(`${this.videoGameURL}/${id}`);
    }

    deleteVideoGame(id: string): Observable<VideoGame> {
        return this.http.delete<VideoGame>(`${this.videoGameURL}/${id}`);
    }

    patchVideoGame(id: string, formData: FormData): Observable<VideoGame> {
        return this.http.patch<VideoGame>(`${this.videoGameURL}/${id}`, formData);
    }
}
