import { Component, OnInit } from '@angular/core';
import {MissionService} from '../../../services/api/mission/mission.service';
import {UtilitiesService} from '../../../services/utilities/utilities.service';

@Component({
  selector: 'app-client-missions',
  templateUrl: './client-missions.component.html',
  styleUrls: ['./client-missions.component.scss']
})
export class ClientMissionsComponent implements OnInit {

    changer:boolean = false;
    missions:any = [];
    pagination:any = {
        page: 1,
        last: 2,
        sequence: []
    }

    constructor(public missionService: MissionService,
                public utilities: UtilitiesService) { }

    ngOnInit(): void {

        this.getAllMissions();

    }

    getAllMissions(page:number = 1) {

        let loading:any = this.utilities.loading();

        this.missionService.getAllUserMissions(page).then((data:any) => {

            this.missions = data.data;

            this.pagination.last = data.last_page;

            this.pagination.page = data.current_page;

            this.utilities.generatePagination(this.pagination.page, this.pagination.last).then((data:any) => {

                this.pagination.sequence = data;

            });

        }).catch((err:any) => {console.log(err)}).finally(() => loading.close());
    }

    getMissionClass(mission) {

        if(mission.abandoned_at) return 'mission-abandoned'
        else if(mission.completed_at) return 'mission-completed'
        else return '';

    }
}
