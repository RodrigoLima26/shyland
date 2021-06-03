import { Component, OnInit } from '@angular/core';
import {faSignInAlt} from '@fortawesome/free-solid-svg-icons';
import {ValidationsService} from '../../../services/validations/validations.service';
import {AdminService} from '../../../services/api/admin/admin.service';
import {UtilitiesService} from '../../../services/utilities/utilities.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {

    user:any = {};
    errors:any = {
        email: [],
        password: []
    };

    icons:any = {
        register: faSignInAlt
    }

    constructor(public validations: ValidationsService,
                public adminService: AdminService,
                private router: Router,
                public utilities: UtilitiesService) { }

    ngOnInit(): void {

    }

    login(user) {

        this.validateLogin(user).then((data:any) => {

            let loading:any = this.utilities.loading();

            this.adminService.login(user).then((data:any) => {

                loading.close();

                this.redirect('/admin/dashboard')

            }).catch((err:any) => {

                if(err.status == 404) {
                    this.utilities.alert('warning', 'Atenção!', err.error.message);
                    this.errors.email.push(err.error.message);
                }
                else
                    this.utilities.alert('error', 'Atenção!', err.error.message);

                loading.close();
            });

        }).catch((err) => console.log(err));

    }

    validateLogin(user) {
        return new Promise((resolve, reject) => {

            this.errors = {
                email: [],
                password: []
            };

            if(!user.email) this.errors.email.push('E-mail Inválido');
            if(!user.password) this.errors.password.push('Senha Está Inválida');
            if(user.email && !this.validations.emailIsValid(user.email)) this.errors.email.push('E-mail Inválido');

            setTimeout(() => {
                let total = 0;
                Object.entries(this.errors).forEach(([key, value]) => {
                    total = total + (this.errors[key].length > 0 ? 1 : 0);
                });

                if(total > 0) reject(this.errors);
                else resolve(user);

            }, 200)
        });
    }

    redirect(type) {
        this.router.navigate([type])
    }

}
