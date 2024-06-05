import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';

import { VideoGameListComponent } from './videogame-list.component';

describe('VideogameListComponent', () => {
    let component: VideoGameListComponent;
    let fixture: ComponentFixture<VideoGameListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [VideoGameListComponent],
            providers: [provideHttpClient()]
        })
            .compileComponents();

        fixture = TestBed.createComponent(VideoGameListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
