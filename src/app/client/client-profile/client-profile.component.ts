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
    selector: 'app-client-profile',
    templateUrl: './client-profile.component.html',
    styleUrls: ['./client-profile.component.scss']
})
export class ClientProfileComponent implements OnInit {

    changer:boolean = false;
    user:any = {player: {status: {}}};
    visit:any = {id: null};
    errors:any = {};
    chart_loaded:boolean = false;
    friend:any = {};
    notification:any = {};
    accepted_extensions:any = ['png', 'jpg', 'jpeg'];

    radarChartLabels:any = [];

    radarChartData:any = [];

    radarChartOptions: any = {
        responsive: true,
        scale: {
            ticks: {
                beginAtZero: true
            }
        }
    };
    radarChartType: ChartType = 'radar';

    radarColors:any = [
        {
            backgroundColor: 'rgba(61, 153, 112, 0.2)',
            borderColor: '#3d9970',
            pointBackgroundColor: '#3d9970',
            pointBorderColor: '#3d9970',
            pointHoverBackgroundColor: 'rgba(61, 153, 112, 0.2)',
            pointHoverBorderColor: 'rgba(61, 153, 112, 0.2)'
        },
        {
            backgroundColor: 'rgba(220, 53, 69, 0.2)',
            borderColor: '#dc3545',
            pointBackgroundColor: '#dc3545',
            pointBorderColor: '#dc3545',
            pointHoverBackgroundColor: 'rgba(220, 53, 69, 0.2)',
            pointHoverBorderColor: 'rgba(220, 53, 69, 0.2)'
        }
    ];

    selected_user:any = {};
    ban_message:string = '';

    constructor(public userService: UserService,
                public validations: ValidationsService,
                private route: ActivatedRoute,
                public notificationService: NotificationService,
                public ngModal: NgbModal,
                public friendService: FriendService,
                public utilities: UtilitiesService) { }

    ngOnInit(): void {

        this.route.paramMap.subscribe(params => {

            this.radarChartLabels = [
                'Coragem', 'Inteligência', 'Amizade', 'Sociabilidade', 'Bondade', 'Criatividade'
            ];

            if(params.get("id")) {

                let loading:any = this.utilities.loading();

                this.userService.getUserById(params.get("id")).then((data:any) => {

                    this.user = data.user;

                    this.formatStatus(this.user);

                    this.getSelfUser(true);

                    this.getUserFriendship(this.user.id);


                }).catch((err:any) => {
                    if(err.status == 404)
                        this.utilities.alert('danger', 'Usuário não encontrado');
                    else
                        this.utilities.alert('danger', 'Erro ao buscar usuário');

                }).finally(() => loading.close())
            }
            else
                this.getSelfUser();

        })
    }

    getSelfUser(visit:boolean = false) {
        let loading:any = this.utilities.loading();

        this.userService.getUserByApiToken().then((data:any) => {
            this.userService.setAuthUser(data.user);

            if(visit)
                this.visit = data.user;
            else
                this.user = data.user;

            setTimeout(() => {

                this.formatStatus(visit ? this.visit : this.user).then((data) => this.chart_loaded = true);

                if(visit) {
                    if(this.visit.player.birthdate)
                        this.visit.player.formatted_birthdate = this.utilities.formatDate(this.visit.player.birthdate, 'YYYY-MM-DD', 'DD/MM/YYYY');
                }
                else {
                    if(this.user.player.birthdate)
                        this.user.player.formatted_birthdate = this.utilities.formatDate(this.user.player.birthdate, 'YYYY-MM-DD', 'DD/MM/YYYY');
                }

            }, 200);
        }).finally(() => loading.close());
    }

    formatStatus(user:any) {

        return new Promise((resolve, reject) => {

            this.radarChartData.push({
                data: [
                    user.player.status.courage,
                    user.player.status.intelligence,
                    user.player.status.friendship,
                    user.player.status.sociability,
                    user.player.status.kindness,
                    user.player.status.criativity
                ],
                label: user.player.username
            });

            setTimeout(() => resolve(user), 500);
        });
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
            if(user.player.formatted_birthdate && this.validations.dateIsValid(user.player.formatted_birthdate, 'DD/MM/YYYY')) this.errors.player.birthdate = 'Data de Nascimento está inválida';

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

    getUserFriendship(user_id) {

        this.friend = {};
        this.notification = {};

        let loading:any = this.utilities.loading();

        this.userService.getUserFriendships(user_id).then((data:any) => {
            if(data.friend) this.friend = data.friend;
            if(data.notification) this.notification = data.notification;
        }).finally(() => loading.close());
    }

    sendFriendshipRequest(user_id) {

        let loading:any = this.utilities.loading();

        this.friendService.sendFriendship(user_id)
            .then((data:any) => this.getUserFriendship(user_id))
            .finally(() => loading.close());
    }

    deleteFriendshipRequest(notification_id) {

        this.utilities.alert('question', 'Deseja retirar o pedido de amizade?', '', true).then((data) => {
            let loading:any = this.utilities.loading();

            this.userService.cancelFriendshipNotiication(notification_id)
                .then((data:any) => this.getUserFriendship(this.user.id))
                .finally(() => loading.close());
        }).catch(() => {})
    }

    cancelFriendship(friend_id) {
        this.utilities.alert('question', 'Deseja desfazer a amizade com este jogador?', '', true).then((data) => {
            let loading:any = this.utilities.loading();

            this.friendService.deleteFriendship(friend_id)
                .then((data:any) => this.getUserFriendship(this.user.id))
                .finally(() => loading.close());
        }).catch(() => {})
    }

    sendMessage(notification_message, sender_id, mymodal:any) {

        let loading:any = this.utilities.loading('Enviando mensagem');

        this.notificationService.sendUserMessage(sender_id, notification_message, '', this.ban_message ? this.ban_message : '').then((data:any) => {

            mymodal.dismiss();
            this.selected_user = {};

            this.utilities.alert('success', 'Denuncia Realizada com sucesso!', 'Nossa equipe vai analisar as informações para dar continuidade com a denúncia!')

            this.ban_message = '';
        })
            .catch((err:any) => this.utilities.toast('danger', 'Houve um erro ao enviar mensagem'))
            .finally(() => loading.close());

    }

    openBanModal(new_modal) {

        this.selected_user = this.user;

        this.ngModal.open(new_modal, {ariaLabelledBy: 'modal-ban-title'});
    }
}
