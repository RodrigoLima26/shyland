import { Injectable } from '@angular/core';
import {LocalStorageService} from 'angular-web-storage';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

    EXPIRED:number = 5;
    STORAGEINDEX:string = 'user';

    constructor(public local: LocalStorageService,
                private http: HttpClient) {}

    login(user) {

        return new Promise((resolve, reject) => {
            this.http.post(`${environment.apiUrl}/admin/login`, user)
                .subscribe((data:any) => {
                    this.setAuthUser(data.user);
                    resolve(data)
                }, err => reject(err));
        })
    }

    setAuthUser(user) {
        this.local.set(this.STORAGEINDEX, user, this.EXPIRED, 'h');
    }
}
