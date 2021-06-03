import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {MissionService} from '../../../services/api/mission/mission.service';
import {UtilitiesService} from '../../../services/utilities/utilities.service';

@Component({
  selector: 'app-missions',
  templateUrl: './missions.component.html',
  styleUrls: ['./missions.component.scss']
})
export class MissionsComponent implements OnInit {

    missions:any = [];

    @Output() completeMissionHandler = new EventEmitter();

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

    abandonMission(mission_id) {

        if(confirm('Deseja realmente abandonar esta missão?')) {

            let loading:any = this.utilities.loading();

            this.missionService.abandonMission(mission_id).then((data:any) => {

                this.getUserActiveMissions();

            }).catch((err:any) => {
                console.log(err);
            }).finally(() => loading.close());

        }

    }

    completeMission(mission_id) {

        let loading:any = this.utilities.loading();

        this.missionService.completeMission(mission_id).then((data:any) => {

            this.getUserActiveMissions();

            this.completeMissionHandler.emit();

        }).catch((err:any) => {
            console.log(err);
        }).finally(() => loading.close());

    }
}
