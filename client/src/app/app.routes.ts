import { NgModule } from '@angular/core';
import { RouterModule, RouterOutlet, Routes } from '@angular/router';

import { SignInComponent } from '@components/auth/sign-in/sign-in.component';
import { SignUpComponent } from '@components/auth/sign-up/sign-up.component';

import { HomeComponent } from '@components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { VideoGameListComponent } from '@components/videogame-list/videogame-list.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component:  HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'games', component: VideoGameListComponent },
    { path: 'sign-in', component: SignInComponent },
    { path: 'sign-up', component: SignUpComponent },
];

@NgModule({
    imports: [RouterModule],
    exports: [RouterModule, RouterOutlet],
})

export class AppRoutingModule { }
