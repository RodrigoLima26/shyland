import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

    constructor(private http: HttpClient) { }

    addContact(contact) {
        return new Promise((resolve, reject) => {
            this.http.post(`${environment.apiUrl}/contact`, contact)
                .subscribe((data:any) => resolve(data), err => reject(err));
        })
    }

    getContacts(page:any = 1, body:any = {}) {
        return new Promise((resolve, reject) => {
            this.http.get(`${environment.apiUrl}/contact?page=${page}`, {params: body})
                .subscribe((data:any) => resolve(data), err => reject(err));
        })
    }

    readContact(contact_id) {
        return new Promise((resolve, reject) => {
            this.http.post(`${environment.apiUrl}/contact/${contact_id}/read`, {})
                .subscribe((data:any) => resolve(data), err => reject(err));
        })
    }

}
