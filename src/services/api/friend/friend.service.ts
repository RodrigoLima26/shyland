import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FriendService {

    constructor(private http: HttpClient) { }

    getAllFriends() {
        return new Promise((resolve, reject) => {
            this.http.get(`${environment.apiUrl}/friendship/all`, {})
                .subscribe((data:any) => resolve(data), err => reject(err));
        })
    }

    sendFriendship(user_id) {
        return new Promise((resolve, reject) => {
            this.http.post(`${environment.apiUrl}/friendship/notification/${user_id}`, {})
                .subscribe((data:any) => resolve(data), err => reject(err));
        })
    }

    confirmFriendship(notification_id) {
        return new Promise((resolve, reject) => {
            this.http.post(`${environment.apiUrl}/friendship/notification/${notification_id}/confirm`, {})
                .subscribe((data:any) => resolve(data), err => reject(err));
        })
    }

    deleteFriendship(friend_id) {
        return new Promise((resolve, reject) => {
            this.http.delete(`${environment.apiUrl}/friendship/${friend_id}/unfriend`)
                .subscribe((data:any) => resolve(data), err => reject(err));
        })
    }
}
