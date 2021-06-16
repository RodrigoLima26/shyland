import {Component, ContentChild, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild} from '@angular/core';
import * as $ from 'jquery';
import {NgbModule, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UserService} from '../../../services/api/user/user.service';
import {faSignInAlt} from '@fortawesome/free-solid-svg-icons';
import {ValidationsService} from '../../../services/validations/validations.service';
import {UtilitiesService} from '../../../services/utilities/utilities.service';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import * as moment from 'moment';

@Component({
    selector: 'app-home-layout',
    templateUrl: './home-layout.component.html',
    styleUrls: ['./home-layout.component.scss']
})
export class HomeLayoutComponent implements OnInit {

    @ViewChild('stickyMenu') menuElement: ElementRef;
    @ViewChild('registerModal') registerModal: ElementRef;

    @Input('modal_control') modal_control:boolean = false;

    icons:any = {
        register: faSignInAlt
    }

    socialUrl:string = environment.socialUrl

    recover:boolean = false;
    menuPosition: any;
    sticky:boolean = false;
    register:any = false;
    login_errors:any = {
        email: [],
        password: []
    }
    register_errors:any = {
        username: [],
        email: [],
        password: [],
        player: {
            birthdate: []
        }
    }
    user:any = {
        player: {
        }
    }
    user_recover:any = {
        email: ""
    }
    recover_errors:any = {
        email: [],
    }

    constructor(public ngModal: NgbModal,
                public validations: ValidationsService,
                private router: Router,
                private route: ActivatedRoute,
                public utilities: UtilitiesService,
                public userService: UserService) {

    }

    ngOnInit(): void {

    }

    ngOnChanges() {
        setTimeout(() => {
            if(this.modal_control)
                this.registerModal.nativeElement.click();
        }, 200)
    }

    ngAfterViewInit(){
        this.menuPosition = this.menuElement.nativeElement.offsetTop
    }

    @HostListener('window:scroll', ['$event'])
    handleScroll(){
        const windowScroll = window.pageYOffset;
        this.sticky = windowScroll >= 50;
    }

    openModal(content, flag:boolean = false) {
        this.register = flag;
        this.recover = false;
        this.ngModal.open(content, {ariaLabelledBy: 'modal-basic-title'});
    }

    login(user) {

        this.validateLogin(user).then((data:any) => {

            let loading:any = this.utilities.loading();

            this.userService.login(user).then((data:any) => {

                loading.close();

                this.ngModal.dismissAll();

                this.redirect('/jogador')

            }).catch((err:any) => {

                if(err.status == 404) {
                    this.utilities.alert('warning', 'Atenção!', err.error.message);
                    this.login_errors.email.push(err.error.message);
                }
                else
                    this.utilities.alert('error', 'Atenção!', err.error.message);

                loading.close();
            });

        }).catch((err) => console.log(err));

    }

    validateLogin(user) {
        return new Promise((resolve, reject) => {

            this.login_errors = {
                email: [],
                password: []
            };

            if(!user.email) this.login_errors.email.push('E-mail Inválido');
            if(!user.password) this.login_errors.password.push('Senha Está Inválida');
            if(user.email && !this.validations.emailIsValid(user.email)) this.login_errors.email.push('E-mail Inválido');

            setTimeout(() => {
                let total = 0;
                Object.entries(this.login_errors).forEach(([key, value]) => {
                    total = total + (this.login_errors[key].length > 0 ? 1 : 0);
                });

                if(total > 0) reject(this.login_errors);
                else resolve(user);

            }, 200)
        });
    }

    registerUser(user) {
        this.validateUserRegister(user).then((data:any) => {
            let loading:any = this.utilities.loading();

            user.player.birthdate = this.utilities.formatDate(user.player.aux_birthdate, 'DD/MM/YYYY', 'YYYY-MM-DD');

            this.userService.register(user).then((data:any) => {

                loading.close();

                this.login(user);

            }).catch((err:any) => {

                console.log(err);

                if(err.status == 503)
                    this.register_errors = err.error;
                else
                    this.utilities.alert('error', 'Atenção!', err.error.message);

                loading.close();
            }).finally(() => loading.close());
        }).catch((err:any) => {});
    }

    validateUserRegister(user) {
        return new Promise((resolve, reject) => {
            this.resetErrors();

            if(!user.email) this.register_errors.email.push('E-mail Inválido');
            if(!user.username) this.register_errors.username.push('Nome de usuário está inválido');
            if(!user.password) this.register_errors.password.push('Senha Está Inválida');
            if(!user.player.aux_birthdate) this.register_errors.player.birthdate.push('Data de Nascimento está inválida');

            if(user.password && (user.password != user.confirm_password)) this.register_errors.password.push('Senha difere da confirmação');
            if(user.email && !this.validations.emailIsValid(user.email)) this.register_errors.email.push('E-mail Inválido');

            setTimeout(() => {
                let total = 0;
                Object.entries(this.register_errors).forEach(([key, value]) => {
                    if(key == 'player')
                        total = total + (this.register_errors[key].birthdate.length > 0 ? 1 : 0);
                    else
                        total = total + (this.register_errors[key].length > 0 ? 1 : 0);
                });

                if(total > 0) reject(this.register_errors);
                else resolve(user);

            }, 200)
        });
    }

    resetErrors() {
        this.register_errors = {
            username: [],
            email: [],
            password: [],
            player: {
                birthdate: []
            }
        }
    }

    recoverPassword() {
        this.register = false;
        this.recover = true;
    }

    redirect(type) {
        this.router.navigate([type])
    }

    activeRouteIsHome() {
        return this.route.snapshot.routeConfig.path != "recuperar-senha";
    }

    recoverPasswordForm(user_recover) {

        this.recover_errors.email = [];

        if(!user_recover.email) this.recover_errors.email.push(['E-mail inválido'])
        if(user_recover.email && !this.validations.emailIsValid(user_recover.email)) this.recover_errors.email.push(['E-mail inválido'])

        setTimeout(() => {
            if(this.recover_errors.email.length == 0) {
                let loading:any = this.utilities.loading();

                this.userService.recoverPassword(user_recover).then((data:any) => {
                    loading.close();
                    this.recover = false;
                    this.ngModal.dismissAll();
                    this.utilities.alert('success', 'Sucesso!', `E-mail de recuperação foi enviado para o e-mail ${user_recover.email}`);
                }).catch((err:any) => {
                    loading.close();
                    if(err.status == 404) {
                        this.utilities.alert('warning', 'Atenção!', err.error.message);
                        this.login_errors.email.push(err.error.message);
                    }
                    else
                        this.utilities.alert('error', 'Atenção!', err.error.message);
                })
            }
        }, 100)

    }
}
