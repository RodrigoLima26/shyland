import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../services/api/user/user.service';
import {UtilitiesService} from '../../../services/utilities/utilities.service';
import {ValidationsService} from '../../../services/validations/validations.service';
import {ActivatedRoute} from '@angular/router';
import {ChartType, RadialChartOptions} from 'chart.js';
import {FriendService} from '../../../services/api/friend/friend.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NotificationService} from '../../../services/api/notification/notification.service';

@Component({
    selector: 'app-admin-profile',
    templateUrl: './admin-profile.component.html',
    styleUrls: ['./admin-profile.component.scss']
})
export class AdminProfileComponent implements OnInit {

    user:any = {player: {status: {}}};
    visit:any = {id: null};
    errors:any = {};
    accepted_extensions:any = ['png', 'jpg', 'jpeg'];
    changer:boolean = false;

    selected_user:any = {};

    constructor(public userService: UserService,
                public validations: ValidationsService,
                private route: ActivatedRoute,
                public notificationService: NotificationService,
                public ngModal: NgbModal,
                public friendService: FriendService,
                public utilities: UtilitiesService) { }

    ngOnInit(): void {
        this.getSelfUser();
    }

    getSelfUser() {
        let loading:any = this.utilities.loading();

        this.userService.getUserByApiToken().then((data:any) => {

            this.userService.setAuthUser(data.user);

            this.user = data.user;

            setTimeout(() => {

                if(this.user.player.birthdate)
                    this.user.player.formatted_birthdate = this.utilities.formatDate(this.user.player.birthdate, 'YYYY-MM-DD', 'DD/MM/YYYY');

            }, 200);
        }).finally(() => loading.close());
    }

    changePassword(user:any) {

        if(user.password != user.confirm_password) {
            this.errors.password = 'Senhas Diferem';
        }
        else {

            let loading:any = this.utilities.loading();

            this.userService.changePassword(user.password).then((data:any) => {

                this.getUserByToken();

                this.utilities.alert('success', 'Senha alterada com sucesso!')

            }).catch((err:any) => {

                this.utilities.alert('error', 'Erro ao alterar senha')

            }).finally(() => loading.close());
        }
    }

    getUserByToken() {
        this.userService.getUserByApiToken().then((data:any) => {
            this.userService.setAuthUser(data.user);
        });
    }

    saveProfile(user) {
        this.validateProfile(user).then((data:any) => {
            let loading:any = this.utilities.loading();

            user.player.birthdate = this.utilities.formatDate(user.player.formatted_birthdate, 'DD/MM/YYYY', 'YYYY-MM-DD');

            this.userService.update(user).then((data:any) => {

                loading.close();

                this.utilities.alert('success', 'Usuário alterado com sucesso!');

                this.changer = !this.changer;

                this.getUserByToken();

            }).catch((err:any) => {

                this.utilities.alert('error', 'Erro ao salvar usuário');
                loading.close()
            });
        }).catch((err:any) => {});
    }

    validateProfile(user) {
        return new Promise((resolve, reject) => {
            this.errors = {};

            if(!user.email) this.errors.email = 'E-mail Inválido';
            if(!user.player.username) this.errors.username = 'Nome de usuário está inválido';

            if(user.email && !this.validations.emailIsValid(user.email)) this.errors.email = 'E-mail Inválido';

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

    getImage() {
        if(!this.user.profile_pic)
            return 'https://www.aisd.net/ousley-junior-high/wp-content/files/sites/40/2018/04/generic-profile-picture.png';
        else
            return this.user.profile_pic;
    }

    onFileChanged(event) {

        if(!this.visit.id) {
            if (event.target.files && event.target.files[0]) {
                let reader = new FileReader();
                let file = "";

                let ext = event.target.files[0].name.split('.').pop();

                let file_size:number = event.target.files[0].size/1024/1024;

                if(this.accepted_extensions.indexOf(ext.toLowerCase()) >= 0) {
                    if (file_size <= 2) {
                        reader.readAsDataURL(event.target.files[0]); // read file as data url

                        reader.onload = (event: any) => { // called once readAsDataURL is completed
                            file = event.target.result;

                            let loading:any = this.utilities.loading();

                            this.userService.photoUpload(file).then((data:any) => {

                                this.user.profile_pic = file;

                                this.changer = !this.changer;

                            }).catch((err) => {
                                this.utilities.alert('error', 'Erro ao salvar foto');
                            }).finally(() => loading.close());
                        };
                    }
                    else
                        this.utilities.alert('warning', 'Arquivo ultrapassa o limite de 2MB');
                }
                else
                    this.utilities.alert('warning', 'Extensão não permitida');
            }
        }
    }
}
