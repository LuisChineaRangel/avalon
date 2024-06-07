import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '@services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('token');
        let authReq = req;

        console.log(token);
        console.log(authReq);

        if (token)
            authReq = req.clone({
                headers: req.headers.set('Authorization', token)
            });
        return next.handle(authReq);
    }
}
