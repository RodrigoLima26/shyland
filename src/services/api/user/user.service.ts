import { Injectable } from '@angular/core';
import { LocalStorageService, SessionStorageService, LocalStorage, SessionStorage } from 'angular-web-storage';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    EXPIRED:number = 5;
    STORAGEINDEX:string = 'user';

    constructor(public local: LocalStorageService,
                private http: HttpClient) {}

    login(user) {

        return new Promise((resolve, reject) => {
            this.http.post(`${environment.apiUrl}/user/login`, user)
                .subscribe((data:any) => {
                    this.setAuthUser(data.user);
                    resolve(data)
                }, err => reject(err));
        })
    }

    logout() {
        this.local.clear();
    }

    getAuthUser() {
        return this.local.get(this.STORAGEINDEX);
    }

    setAuthUser(user) {
        this.local.set(this.STORAGEINDEX, user, this.EXPIRED, 'h');
    }

    register(user) {

        return new Promise((resolve, reject) => {
            this.http.post(`${environment.apiUrl}/user/register`, user)
                .subscribe((data:any) => resolve(data), err => reject(err));
        })

    }

    recoverPassword(user) {

        return new Promise((resolve, reject) => {
            this.http.post(`${environment.apiUrl}/user/recover`, user)
                .subscribe((data:any) => resolve(data), err => reject(err));
        });

    }

    confirmRecoverPassword(user, token) {

        return new Promise((resolve, reject) => {
            this.http.post(`${environment.apiUrl}/user/recover/${token}`, user)
                .subscribe((data:any) => resolve(data), err => reject(err));
        });

    }

    loginWithToken(token:any) {
        return new Promise((resolve, reject) =>{
            this.http.post(`${environment.apiUrl}/user/login/token/${token}`, {})
                .subscribe((data:any) => resolve(data), (err) => reject(err));
        })
    }

    getUserByApiToken() {
        return new Promise((resolve, reject) => {
            this.http.get(`${environment.apiUrl}/user/get-by-token`)
                .subscribe((data:any) => resolve(data), err => reject(err));
        })
    }
}
