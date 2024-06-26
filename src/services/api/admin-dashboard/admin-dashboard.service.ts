import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminDashboardService {

    constructor(private http: HttpClient) {}

    get() {
        return new Promise((resolve, reject) => {
            this.http.get(`${environment.apiUrl}/admin/dashboard`)
                .subscribe((data:any) => resolve(data), err => reject(err));
        })
    }
}
