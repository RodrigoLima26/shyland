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

}
