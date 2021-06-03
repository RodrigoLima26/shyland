import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UtilitiesService} from '../../../services/utilities/utilities.service';
import {UserService} from '../../../services/api/user/user.service';

@Component({
  selector: 'app-o-auth-login',
  templateUrl: './o-auth-login.component.html',
  styleUrls: ['./o-auth-login.component.scss']
})
export class OAuthLoginComponent implements OnInit {

    constructor(private activeRoute: ActivatedRoute,
                public utilities: UtilitiesService,
                public userService: UserService,
                private router : Router) { }

    ngOnInit(): void {
        this.activeRoute.paramMap.subscribe(params => {
            let api_token = params.get("api_token");

            if(api_token) {

                let loading: any = this.utilities.loading();

                this.userService.loginWithToken(api_token).then((data:any) => {

                    loading.close();

                    this.userService.setAuthUser(data.user);

                    this.router.navigate(['/jogador'])

                }).catch((err:any) => {
                    loading.close();
                    this.router.navigate(['/404']);
                })
            }
            else
                this.router.navigate(['/404']);

        })
    }


}
