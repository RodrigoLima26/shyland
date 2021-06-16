import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../services/api/user/user.service';
import {AdminDashboardService} from '../../../services/api/admin-dashboard/admin-dashboard.service';
import {UtilitiesService} from '../../../services/utilities/utilities.service';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

    dashboard:any = {}
    back_url:string = environment.apiUrl

    status_eqv:any = {
        intelligence: 'Inteligência',
        courage: 'Coragem',
        friendship: "Amizade",
        sociability: 'Sociabilidade',
        kindness: 'Bondade',
        criativity: 'Criatividade'
    }

    newUersGraphOpen:boolean = false;
    qtdMissionsCompletedByRankGraphOpen:boolean = false;
    qtdMissionsCompletedByTypeGraphOpen:boolean = false;
    qtdPrivateNotificationsLastWeekByTypeGraphOpen:boolean = false;

    newUsersGraphData:any = {};
    qtdMissionsCompletedByRankGraphData:any = {};
    qtdMissionsCompletedByTypeGraphData:any = {};
    qtdPrivateNotificationsLastWeekGraphData:any = {};

    constructor(public usersService: UserService,
                public utilities: UtilitiesService,
                public dashboardService: AdminDashboardService) { }

    ngOnInit(): void {

        let loading:any = this.utilities.loading();

        this.dashboardService.get().then((data:any) => {

            this.dashboard = data;

            this.newUersDataProcess(data.graphNewUsersLastSevenDays);
            this.qtdMissionsCompletedByRankProcess(data.qtdMissionsCompletedByRank);
            this.qtdMissionsCompletedByTypeProcess(data.qtdMissionsCompletedByType);
            this.qtdPrivateNotificationsLastWeekDataProcess(data.qtdPrivateNotificationsLastWeek);

        }).finally(() => loading.close());
    }

    newUersDataProcess(new_users:any) {
        this.newUsersGraphData.labels = new_users.map(e => `${e.day}/${e.month}/${e.year}`);

        this.newUsersGraphData.datasets = [];

        for(let item of new_users) {
            this.newUsersGraphData.datasets.push({
                label: `Novos Usuários Última semana`,
                data: item.qtde_users
            })
        }

        setTimeout(() => this.newUersGraphOpen = true, 200)
    }

    qtdPrivateNotificationsLastWeekDataProcess(notifications:any) {
        this.qtdPrivateNotificationsLastWeekGraphData.labels = notifications.map(e => `${e.day}/${e.month}/${e.year}`);

        this.qtdPrivateNotificationsLastWeekGraphData.datasets = [];

        for(let item of notifications) {
            this.qtdPrivateNotificationsLastWeekGraphData.datasets.push({
                label: `Mensagens Privadas Última semana`,
                data: item.qtde_notificacoes
            })
        }

        setTimeout(() => this.qtdPrivateNotificationsLastWeekByTypeGraphOpen = true, 200)
    }

    qtdMissionsCompletedByTypeProcess(missions:any) {
        this.qtdMissionsCompletedByTypeGraphData.labels = missions.map(e => e.status);

        this.qtdMissionsCompletedByTypeGraphData.datasets = [];

        for(let item of missions) {
            this.qtdMissionsCompletedByTypeGraphData.datasets.push({
                label: '',
                data: item.qtde_missoes
            })
        }

        setTimeout(() => this.qtdMissionsCompletedByTypeGraphOpen = true, 200)
    }

    qtdMissionsCompletedByRankProcess(missions:any) {
        this.qtdMissionsCompletedByRankGraphData.labels = missions.map(e => e.rank);

        this.qtdMissionsCompletedByRankGraphData.datasets = [];


        this.qtdMissionsCompletedByRankGraphData.datasets.push({
            label: `Quantidade de Missões por Rank`,
            data: missions.map(e => e.qtde_missoes)
        })

        setTimeout(() => this.qtdMissionsCompletedByRankGraphOpen = true, 200)
    }
}
