import { Injectable, NgModule } from '@angular/core';
import {Observable} from 'rxjs';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {UserService} from '../services/api/user/user.service';


@Injectable()
export class HttpsRequestInterceptor implements HttpInterceptor {

    /**
     *
     */
    private except = [
        'login',
        'esqueci-senha'
    ];

    constructor(private userService: UserService) {}

    /**
     *
     * @param req
     * @param next
     */
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!this.inExceptList(req.url)) {

            let user:any = this.userService.getAuthUser();

            let api_token = "";
            if(user)
                api_token = user.api_token;

            let dupReq = req.clone({
                setParams: {
                    api_token
                },
                headers: req.headers.set('Accept', 'application/json'),
            });

            return next.handle(dupReq);
        }

        else {
            return next.handle(req);
        }
    }

    /**
     *
     * @param url
     */
    inExceptList(url: string): boolean {
        let ret = false;
        this.except.forEach(end_point => ret = url.endsWith(end_point));
        return ret;
    }
}

@NgModule({
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: HttpsRequestInterceptor, multi: true }
    ]
})
export class InterceptorModule {}
