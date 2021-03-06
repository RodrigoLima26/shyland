import { Injectable } from '@angular/core';
import {LocalStorageService} from 'angular-web-storage';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MissionService {

  constructor(public local: LocalStorageService,
              private http: HttpClient) { }

  getUserActiveMissions() {
      return new Promise((resolve, reject) => {
          this.http.get(`${environment.apiUrl}/user/missions`)
              .subscribe((data:any) => resolve(data), err => reject(err));
      })
  }
}
