import { Component, OnInit } from '@angular/core';
import {ValidationsService} from '../../../services/validations/validations.service';
import {UserService} from '../../../services/api/user/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {faSignInAlt} from '@fortawesome/free-solid-svg-icons';
import {UtilitiesService} from '../../../services/utilities/utilities.service';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss']
})
export class RecoverPasswordComponent implements OnInit {

    icons:any = {
        register: faSignInAlt
    }

    token:string = "";
    user:any = {};
    errors:any = {
        email: [],
        password: []
    };

    constructor(public userService: UserService,
                public validations: ValidationsService,
                public utilities: UtilitiesService,
                private router: Router,
                private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            this.token = params.get("token");
        })
    }

    recoverPassword(user) {
        this.validate(user).then((data:any) => {

            let loading:any = this.utilities.loading();

            this.userService.confirmRecoverPassword(user, this.token).then((data:any) => {

                this.utilities.alert('success', 'Senha resetada com sucesso!', 'Já pode efetuar o seu login');

                this.redirect();

            }).catch((err:any) => {
                loading.close();
                if(err.status == 404) {
                    this.utilities.alert('warning', 'Atenção!', err.error.message);
                    this.errors.email.push(err.error.message);
                }
                else
                    this.utilities.alert('error', 'Atenção!', err.error.message);
            })

        }).catch((err:any) => console.log(err));
    }

    validate(user) {
        return new Promise((resolve, reject) => {
            this.resetErrors();

            if(!user.email) this.errors.email.push('E-mail Inválido');
            if(!user.password) this.errors.password.push('Senha Está Inválida');

            if(user.password && (user.password != user.confirm_password)) this.errors.password.push('Senha difere da confirmação');
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

    resetErrors() {
        this.errors = {
            email: [],
            password: []
        }
    }

    redirect() {
        this.router.navigate(['/'])
    }
}
