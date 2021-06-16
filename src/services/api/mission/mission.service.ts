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

  getAllUserMissionsById(player_id, page:number = 1) {
      return new Promise((resolve, reject) => {
          this.http.get(`${environment.apiUrl}/user/${player_id}/missions/all?page=${page}`)
              .subscribe((data:any) => resolve(data), err => reject(err));
      })
  }

  getAdminMissions(body:any, page:number = 1) {
      return new Promise((resolve, reject) => {
          this.http.get(`${environment.apiUrl}/admin/missions?page=${page}`,{params: body})
              .subscribe((data:any) => resolve(data), err => reject(err));
      })
  }

  deleteMission(mission_id) {
      return new Promise((resolve, reject) => {
          this.http.delete(`${environment.apiUrl}/admin/missions/${mission_id}`)
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

  newMission(mission) {
      return new Promise((resolve, reject) => {
          this.http.post(`${environment.apiUrl}/admin/missions`, mission)
              .subscribe((data:any) => resolve(data), err => reject(err));
      })
  }

  getMission(mission_id) {
      return new Promise((resolve, reject) => {
          this.http.get(`${environment.apiUrl}/admin/missions/${mission_id}`)
              .subscribe((data:any) => resolve(data), err => reject(err));
      })
  }
}
