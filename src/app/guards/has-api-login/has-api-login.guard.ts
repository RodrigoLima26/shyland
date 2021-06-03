import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {UserService} from '../../../services/api/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class HasApiLoginGuard implements CanActivate {

    constructor( private userService : UserService, private router : Router){}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        let user:any = this.userService.getAuthUser()

        if(user && user.adm == 1) return this.router.parseUrl('/admin/dashboard');
        else if(user && !user.adm) return this.router.parseUrl('/jogador');
        return true;

    }


}
