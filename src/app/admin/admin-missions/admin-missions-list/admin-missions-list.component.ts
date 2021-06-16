import { Component, OnInit } from '@angular/core';
import {faAlignCenter, faBars, faBell, faPlus, faTachometerAlt, faTimes, faUsers} from '@fortawesome/free-solid-svg-icons';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../../services/api/user/user.service';
import {UtilitiesService} from '../../../../services/utilities/utilities.service';
import {ValidationsService} from '../../../../services/validations/validations.service';
import {NotificationService} from '../../../../services/api/notification/notification.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MissionService} from '../../../../services/api/mission/mission.service';
import {HttpParams} from '@angular/common/http';

@Component({
    selector: 'app-admin-missions-list.component',
    templateUrl: './admin-missions-list.component.html',
    styleUrls: ['./admin-missions-list.component.scss']
})
export class AdminMissionsListComponent implements OnInit {

    q: string = '';
    rank:string = '';
    status:string = '';
    user: any = {player: {status: {}}};
    pagination: any = {
        page: 1,
        last: 2,
        sequence: []
    }
    missions:any = [];

    icons:any = {
        close: faTimes,
        add: faPlus
    }

    status_list:any = [
        {name: 'Coragem', status: 'courage', color: '#ff9100'},
        {name: 'Inteligência', status: 'intelligence', color: '#6d1b7b'},
        {name: 'Amizade', status: 'friendship', color: '#2979ff'},
        {name: 'Sociabilidade', status: 'sociability', color: '#1de9b6'},
        {name: 'Bondade', status: 'kindness', color: '#dd33fa'},
        {name: 'Criatividade', status: 'criativity', color: '#ffc400'}
    ]

    constructor(public userService: UserService,
                public ngModal: NgbModal,
                public router: Router,
                public missionService: MissionService,
                public utilities: UtilitiesService) {
    }

    ngOnInit(): void {
        this.getAllMissions();
    }

    getAllMissions(page:number = 1) {

        let loading:any = this.utilities.loading();

        let body:any = {};

        if(this.rank) body.rank = this.rank;
        if(this.status) body.status = this.status;
        if(this.q) body.q = this.q;

        this.missionService.getAdminMissions(body, page).then((data:any) => {

            this.missions = data.data;

            this.pagination.last = data.last_page;

            this.pagination.page = data.current_page;

            this.utilities.generatePagination(this.pagination.page, this.pagination.last).then((data:any) => {

                this.pagination.sequence = data;

            });

        }).catch((err:any) => {console.log(err)}).finally(() => loading.close());
    }

    deleteMission(mission_id) {
        this.utilities.alert('question', 'Deseja realmente remover esta missão?', '', true).then((data:any) => {

            let loading:any = this.utilities.loading();

            this.missionService.deleteMission(mission_id).then((data:any) => {

                this.utilities.toast('success', 'Missão deletada com sucesso!');
                this.getAllMissions(this.pagination.page);

            }).finally(() => loading.close());

        }).catch((err) => console.log(err));
    }

    missionForm(id) {
        this.router.navigate([`/admin/missoes/cadastro/${id}`]);
    }
}
