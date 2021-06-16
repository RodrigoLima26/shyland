import { Component, OnInit } from '@angular/core';
import {faSignInAlt} from '@fortawesome/free-solid-svg-icons';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../../services/api/user/user.service';
import {UtilitiesService} from '../../../../services/utilities/utilities.service';
import {ValidationsService} from '../../../../services/validations/validations.service';
import {NotificationService} from '../../../../services/api/notification/notification.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MissionService} from '../../../../services/api/mission/mission.service';

@Component({
    selector: 'app-admin-users-form',
    templateUrl: './admin-users-form.component.html',
    styleUrls: ['./admin-users-form.component.scss']
})
export class AdminUsersFormComponent implements OnInit {

    q: string = '';
    user: any = {player: {status: {}}};
    pagination: any = {
        page: 1,
        last: 2,
        sequence: []
    }
    notification_message:string = '';
    notification_title:string = '';
    tab_control:boolean = true;
    missions:any = {};

    constructor(public userService: UserService,
                private route: ActivatedRoute,
                public ngModal: NgbModal,
                public missionService: MissionService,
                public validation: ValidationsService,
                public notificationService: NotificationService,
                public utilities: UtilitiesService) {
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            if(params.get("id")) {

                this.getUser(params.get("id"));

            }
        });
    }

    getUser(user_id) {
        let loading: any = this.utilities.loading();

        this.userService.getUserById(user_id).then((data: any) => {

            this.user = data.user;

        }).finally(() => loading.close());
    }

    getImage() {
        if(!this.user.profile_pic)
            return 'https://www.aisd.net/ousley-junior-high/wp-content/files/sites/40/2018/04/generic-profile-picture.png';
        else
            return this.user.profile_pic;
    }

    ban(user_id) {
        this.utilities.alert('question', 'Deseja Realmente Banir este usuário?', '', true).then((data:any) => {

            let loading:any = this.utilities.loading();

            this.userService.banUser(user_id).then((data:any) => {

                this.user.ban_date = data.ban_date;

                this.utilities.toast('success', 'Usuário banido com sucesso!');

            }).finally(() => loading.close());

        }).catch((e) => console.log(e));
    }

    unban(user_id) {
        this.utilities.alert('question', 'Deseja Realmente Desbanir este usuário?', '', true).then((data:any) => {

            let loading:any = this.utilities.loading();

            this.userService.unbanUser(user_id).then((data:any) => {

                this.user.ban_date = null;

                this.utilities.toast('success', 'Usuário desbanido com sucesso!');

            }).finally(() => loading.close());

        }).catch((e) => console.log(e));
    }

    sendMessage(notification_message, user, modal, notification_title:string = 'Nova Mensagem do Sistema') {

        let loading:any = this.utilities.loading();

        this.notificationService.sendSystemMessage(user.player.id, notification_message, notification_title)
            .then((data:any) => {

            this.utilities.toast('success', 'Mensagem enviada com sucesso!');

        }).finally(() => {

            this.notification_message = '';
            this.notification_title = '';

            loading.close();
            modal.dismiss();
        })

    }

    openModal(modal) {
        this.ngModal.open(modal, {ariaLabelledBy: 'modal-basic-title'});
    }

    changeTab(tab:boolean) {
        if(tab) {
            this.tab_control = tab;

            this.getUser(this.user.id);

        }
        else {
            this.tab_control = tab;
            this.getAllMissions();
        }
    }

    getAllMissions(page:number = 1) {

        let loading:any = this.utilities.loading();

        this.missionService.getAllUserMissionsById(this.user.player.id, page).then((data:any) => {

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
