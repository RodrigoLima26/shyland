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

  getAllUserMissions(page:number = 1) {
      return new Promise((resolve, reject) => {
          this.http.get(`${environment.apiUrl}/user/missions/all?page=${page}`)
              .subscribe((data:any) => resolve(data), err => reject(err));
      })
  }

  abandonMission(player_mission_id) {
      return new Promise((resolve, reject) => {
          this.http.delete(`${environment.apiUrl}/user/missions/${player_mission_id}/abandon`)
              .subscribe((data:any) => resolve(data), err => reject(err));
      })
  }

  completeMission(player_mission_id) {
      return new Promise((resolve, reject) => {
          this.http.post(`${environment.apiUrl}/user/missions/${player_mission_id}/complete`, {})
              .subscribe((data:any) => resolve(data), err => reject(err));
      })
  }
}
