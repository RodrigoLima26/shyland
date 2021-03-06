import { Component, OnInit } from '@angular/core';
import {MissionService} from '../../../services/api/mission/mission.service';
import {UtilitiesService} from '../../../services/utilities/utilities.service';

@Component({
  selector: 'app-missions',
  templateUrl: './missions.component.html',
  styleUrls: ['./missions.component.scss']
})
export class MissionsComponent implements OnInit {

    missions:any = [];

    constructor(public missionService: MissionService,
                public utilities: UtilitiesService) { }

    ngOnInit(): void {
        this.getUserActiveMissions();
    }

    getUserActiveMissions() {

        let loading:any = this.utilities.loading();

        this.missionService.getUserActiveMissions().then((data:any) => {

            this.missions = data;
        }).catch((err:any) => {

        }).finally(() => loading.close())
    }

    getClassMission(rank) {
        return `mission-card-${rank}`
    }
}
