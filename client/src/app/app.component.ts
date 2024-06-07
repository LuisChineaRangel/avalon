import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AppModule } from './app.module';
import { AuthService } from '@services/auth.service';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [AppModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit {
    title: string = 'Avalon';
    opened: boolean = true;
    isDarkTheme: boolean = false;
    isAuthenticated: boolean = false;
    constructor(public auth: AuthService, public router: Router) { }

    ngOnInit(): void {
        if (this.auth.loggedIn())
            this.isAuthenticated = true;
    }
}
