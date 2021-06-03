import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

    constructor(private http: HttpClient) { }

    getNotifications(page:any = 1) {
        return new Promise((resolve, reject) => {
            this.http.get(`${environment.apiUrl}/notifications?page=${page}`)
                .subscribe((data:any) => resolve(data), err => reject(err));
        })
    }

    getNotReadCount() {
        return new Promise((resolve, reject) => {
            this.http.get(`${environment.apiUrl}/notifications/not-read`)
                .subscribe((data:any) => resolve(data), err => reject(err));
        })
    }

    readNotification(notification_id) {
        return new Promise((resolve, reject) => {
            this.http.post(`${environment.apiUrl}/notifications/${notification_id}/read`, {})
                .subscribe((data:any) => resolve(data), err => reject(err));
        })
    }

    deleteNotifications(notification_id) {
        return new Promise((resolve, reject) => {
            this.http.delete(`${environment.apiUrl}/notifications/${notification_id}/delete`)
                .subscribe((data:any) => resolve(data), err => reject(err));
        })
    }

    sendUserMessage(user_id, message, title:string = '', ban:string = '') {

        return new Promise((resolve, reject) => {
            this.http.post(`${environment.apiUrl}/notifications/user/${user_id}/reply`, {message: message, title: title, ban: ban})
                .subscribe((data:any) => resolve(data), err => reject(err));
        })

    }
}
