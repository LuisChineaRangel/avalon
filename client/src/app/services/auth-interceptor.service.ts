import { inject, Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpInterceptorFn, HttpHandlerFn } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '@services/auth.service';

// @Injectable({
//     providedIn: 'root'
// })

// export class AuthInterceptor implements HttpInterceptor {
//     constructor(private auth: AuthService) { }

//     intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//         const token = this.auth.getToken();
//         let authReq = req;

//         console.log(token);
//         console.log(authReq);

//         if (token)
//             authReq = req.clone({
//                 headers: req.headers.set('Authorization', token)
//             });
//         return next.handle(authReq);
//     }
// }

export const AuthInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
    const token = inject(AuthService).getToken();
    let authReq = req;

    console.log(token);
    console.log(authReq);

    if (token)
        authReq = req.clone({
            headers: req.headers.set('Authorization', token)
        });
    return next(authReq);
};
