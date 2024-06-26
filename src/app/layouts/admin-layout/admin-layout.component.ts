import { Component, OnInit } from '@angular/core';
import {faAlignCenter, faBars, faBell, faTachometerAlt, faUsers} from '@fortawesome/free-solid-svg-icons';
import {UserService} from '../../../services/api/user/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {

    icons:any = {
        menu: faBars,
        dashboard: faTachometerAlt,
        users: faUsers,
        missions: faAlignCenter,
        notifications: faBell
    }

    open:boolean = false;
    user:any = {player: {}};

    constructor(public userService: UserService,
                private router: Router) {

        this.user = this.userService.getAuthUser();
    }

    ngOnInit(): void {}

    getImage() {
        if(!this.user.profile_pic)
            return 'https://www.aisd.net/ousley-junior-high/wp-content/files/sites/40/2018/04/generic-profile-picture.png';
        else
            return this.user.profile_pic;
    }

    logout() {
        this.userService.logout();

        this.router.navigate(['/'])

    }

}
