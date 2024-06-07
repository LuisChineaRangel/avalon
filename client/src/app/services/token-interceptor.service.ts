import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { AuthService } from '@services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

    constructor(private auth: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.auth.getToken();
        if (token) {
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
        }
        return next.handle(req);
    }
}
