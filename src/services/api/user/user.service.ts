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

    changePassword(password) {
        return new Promise((resolve, reject) => {
            this.http.post(`${environment.apiUrl}/user/change-password`, {password: password})
                .subscribe((data:any) => resolve(data), err => reject(err));
        })
    }

    update(user) {
        return new Promise((resolve, reject) => {
            this.http.post(`${environment.apiUrl}/user/update`, user)
                .subscribe((data:any) => resolve(data), err => reject(err));
        })
    }

    getUserById(id) {
        return new Promise((resolve, reject) => {
            this.http.get(`${environment.apiUrl}/user/get-by-id/${id}`)
                .subscribe((data:any) => resolve(data), err => reject(err));
        })
    }

    photoUpload(photo) {
        return new Promise((resolve, reject) => {
            this.http.post(`${environment.apiUrl}/user/photo-upload`, {profile_pic: photo})
                .subscribe((data:any) => resolve(data), err => reject(err));
        })
    }

    getAllUsers(page:any = 1, q:string = '') {
        return new Promise((resolve, reject) => {
            this.http.get(`${environment.apiUrl}/users?page=${page}&q=${q}`)
                .subscribe((data:any) => resolve(data), err => reject(err));
        })
    }

    getUserFriendships(user_id:any) {
        return new Promise((resolve, reject) => {
            this.http.get(`${environment.apiUrl}/friendship?user_id=${user_id}`)
                .subscribe((data:any) => resolve(data), err => reject(err));
        })
    }

    friendshipNotification(visit_id:any, user_id:any) {
        return new Promise((resolve, reject) => {
            this.http.post(`${environment.apiUrl}/friendship/notification/${visit_id}`, {})
                .subscribe((data:any) => resolve(data), err => reject(err));
        })
    }

    confirmFriendship(notification_id:any) {
        return new Promise((resolve, reject) => {
            this.http.post(`${environment.apiUrl}/friendship/notification/${notification_id}/confirm`, {})
                .subscribe((data:any) => resolve(data), err => reject(err));
        })
    }

    cancelFriendshipNotiication(notification_id:any) {
        return new Promise((resolve, reject) => {
            this.http.delete(`${environment.apiUrl}/friendship/notification/${notification_id}/delete`)
                .subscribe((data:any) => resolve(data), err => reject(err));
        })
    }

    cancelFriendship(friend_id:any) {
        return new Promise((resolve, reject) => {
            this.http.delete(`${environment.apiUrl}/friendship/notification/${friend_id}/delete`)
                .subscribe((data:any) => resolve(data), err => reject(err));
        })
    }
}
