import { Component, OnInit } from '@angular/core';
import {faAlignCenter, faBars, faBell, faPlus, faTachometerAlt, faTimes, faUsers} from '@fortawesome/free-solid-svg-icons';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../../services/api/user/user.service';
import {UtilitiesService} from '../../../../services/utilities/utilities.service';
import {ValidationsService} from '../../../../services/validations/validations.service';
import {NotificationService} from '../../../../services/api/notification/notification.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MissionService} from '../../../../services/api/mission/mission.service';

@Component({
    selector: 'app-admin-missions-form.component',
    templateUrl: './admin-missions-form.component.html',
    styleUrls: ['./admin-missions-form.component.scss']
})
export class AdminMissionsFormComponent implements OnInit {

    mission:any = {
        rank: '',
        status: '',
        confidence: 0,
        exp_status: 0
    };
    errors:any = {}

    status_list:any = [
        {name: 'Coragem', status: 'courage', color: '#ff9100'},
        {name: 'Inteligência', status: 'intelligence', color: '#6d1b7b'},
        {name: 'Amizade', status: 'friendship', color: '#2979ff'},
        {name: 'Sociabilidade', status: 'sociability', color: '#1de9b6'},
        {name: 'Bondade', status: 'kindness', color: '#dd33fa'},
        {name: 'Criatividade', status: 'criativity', color: '#ffc400'}
    ]

    constructor(public userService: UserService,
                private route: ActivatedRoute,
                public ngModal: NgbModal,
                public missionService: MissionService,
                public validation: ValidationsService,
                public utilities: UtilitiesService) {
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            if(params.get("id")) {

                let loading:any = this.utilities.loading();

                this.missionService.getMission(params.get("id")).then((data:any) => {
                    this.mission = data;
                }).catch((err:any) => this.utilities.alert('error', 'Missão não encontrada'))
                    .finally(() => loading.close());

            }
        });
    }

    save(mission) {
        this.validate(mission).then((data:any) => {

            let loading:any = this.utilities.loading();

            this.missionService.newMission(mission).then((data:any) => {

                this.utilities.toast('success', 'Missão registrada com sucesso!');

                this.mission = data;

            }).finally(() => loading.close());

        }).catch((err:any) => console.log(err));
    }

    validate(mission) {
        return new Promise((resolve, reject) => {
            this.errors = {
                rank: [],
                status: [],
                title: [],
                description: [],
                confidence: [],
                exp_status: []
            };

            if(!mission.rank) this.errors.rank.push('Rank Inválido');
            if(!mission.status) this.errors.status.push('Status Inválido');
            if(!mission.title) this.errors.title.push('Título Inválido');
            if(!mission.description) this.errors.description.push('Descrição Inválida');
            if(!mission.confidence) this.errors.confidence.push('Confiança Inválida');
            if(!mission.exp_status) this.errors.exp_status.push('Status Inválido');

            setTimeout(() => {
                let total = 0;
                Object.entries(this.errors).forEach(([key, value]) => {
                    total = total + (this.errors[key].length > 0 ? 1 : 0);
                });

                if(total > 0) reject(this.errors);
                else resolve(mission);

            }, 200)
        })
    }
}
