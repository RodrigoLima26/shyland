import { Component, OnInit } from '@angular/core';
import {MissionService} from '../../../services/api/mission/mission.service';

@Component({
  selector: 'app-client-home',
  templateUrl: './client-home.component.html',
  styleUrls: ['./client-home.component.scss']
})
export class ClientHomeComponent implements OnInit {

    changer:boolean = false;

    constructor(public missionService: MissionService) { }

    ngOnInit(): void {



    }

}
