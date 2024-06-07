import { NgModule } from '@angular/core';
import { RouterModule, RouterOutlet, Routes } from '@angular/router';

import { HomeComponent } from '@components/home/home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignInComponent } from '@components/auth/sign-in/sign-in.component';
import { SignUpComponent } from '@components/auth/sign-up/sign-up.component';
import { ProfileComponent } from '@components/profile/profile.component';
import { VideoGameListComponent } from '@components/videogame-list/videogame-list.component';
import { AuthGuard } from '@guards/auth.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'sign-in', component: SignInComponent },
    { path: 'sign-up', component: SignUpComponent },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: 'games', component: VideoGameListComponent, canActivate: [AuthGuard] },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule],
    exports: [RouterModule, RouterOutlet],
})

export class AppRoutingModule { }
