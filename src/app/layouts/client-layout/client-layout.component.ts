import {Component, Input, OnInit} from '@angular/core';
import {faBell, faEnvelope} from '@fortawesome/free-solid-svg-icons';
import {UserService} from '../../../services/api/user/user.service';
import * as _ from 'lodash';
import {Router} from '@angular/router';
import {NotificationService} from '../../../services/api/notification/notification.service';

@Component({
  selector: 'app-client-layout',
  templateUrl: './client-layout.component.html',
  styleUrls: ['./client-layout.component.scss']
})
export class ClientLayoutComponent implements OnInit {

    @Input('changer') changer:boolean = false;

    icons:any = {
        bell: faBell,
        mail: faEnvelope
    };
    sticky:boolean = false;
    progress_bar_type:any = 'rounded';
    user:any = {player: {status: {}}};
    formatted_status:any = [];
    progress_bar_loading:boolean = false;
    notification_count:any = 0;

    constructor(public userService: UserService,
                public notificationService: NotificationService,
                private router: Router) {
        this.user = this.userService.getAuthUser();

        setTimeout(() => this.formatStatus(), 200);
    }

    ngOnInit(): void {
        this.getNotReadNotifications();
    }

    ngOnChanges() {

        this.progress_bar_loading = true;

        this.getNotReadNotifications();

        this.userService.getUserByApiToken().then((data:any) => {
            this.userService.setAuthUser(data.user);

            this.user = data.user;

            setTimeout(() => this.formatStatus(), 200);
        }).finally(() => this.progress_bar_loading = false);
    }

    getNotReadNotifications() {
        this.notificationService.getNotReadCount().then((data:any) => {
            this.notification_count = data.count;
        })
    }

    getImage() {
        if(!this.user.profile_pic)
            return 'https://www.aisd.net/ousley-junior-high/wp-content/files/sites/40/2018/04/generic-profile-picture.png';
        else
            return this.user.profile_pic;
    }

    formatStatus() {
        this.formatted_status = [
            {name: 'Coragem', status: 'courage', value: this.user.player.status.courage, color: '#ff9100'},
            {name: 'Inteligência', status: 'intelligence', value: this.user.player.status.intelligence, color: '#6d1b7b'},
            {name: 'Amizade', status: 'friendship', value: this.user.player.status.friendship, color: '#2979ff'},
            {name: 'Sociabilidade', status: 'sociability', value: this.user.player.status.sociability, color: '#1de9b6'},
            {name: 'Bondade', status: 'kindness', value: this.user.player.status.kindness, color: '#dd33fa'},
            {name: 'Criatividade', status: 'criativity', value: this.user.player.status.criativity, color: '#ffc400'}
        ]
    }

    bestStatus() {

        let aux:any = _.clone(this.formatted_status);

        aux = aux.sort((a, b) => {
            if (a.value < b.value) return 1;
            if (a.value > b.value) return -1;
            return 0;
        });

        return aux[0];
    }

    calcPercent(value, total) {
        if(value == 0 || total == 0) return 0;
        return (value * 100) / total;
    }

    logout() {
        this.userService.logout();

        this.router.navigate(['/'])

    }
}
