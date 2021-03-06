import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {UserService} from '../../../services/api/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class HasApiTokenGuard implements CanActivate {

    constructor( private userService : UserService, private router : Router){}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        let user:any = this.userService.getAuthUser()

        if(!user) return this.router.parseUrl('/');
        return true;

    }


}
