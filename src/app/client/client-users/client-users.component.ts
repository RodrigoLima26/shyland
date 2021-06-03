import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../services/api/user/user.service';
import {UtilitiesService} from '../../../services/utilities/utilities.service';
import {Router} from '@angular/router';
import {FriendService} from '../../../services/api/friend/friend.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {faComments} from '@fortawesome/free-solid-svg-icons';
import {NotificationService} from '../../../services/api/notification/notification.service';

@Component({
  selector: 'app-client-users',
  templateUrl: './client-users.component.html',
  styleUrls: ['./client-users.component.scss']
})
export class ClientUsersComponent implements OnInit {

    tab_control:boolean = true;
    friends:any = [];
    users:any = [];
    auth_user:any = {};
    q:string = '';
    selected_user:any = {};
    notification_message:string = "";
    pagination:any = {
        page: 1,
        last: 2,
        sequence: []
    }
    icons:any = {
        comments: faComments
    }

    ban_message:string = '';

    constructor(public userService: UserService,
                public router: Router,
                public ngModal: NgbModal,
                public notificationService: NotificationService,
                public friendService: FriendService,
                public utilities: UtilitiesService) { }

    ngOnInit(): void {

        this.auth_user = this.userService.getAuthUser();

        this.getAllFriends();
    }

    getUserData(friend) {
        if(friend.first_player.user.id != this.auth_user.id)
            return friend.first_player;
        else
            return friend.second_player;
    }

    getAllFriends() {

        this.friends = [];

        let loading:any = this.utilities.loading();

        this.friendService.getAllFriends().then((data:any) => {

            for(let item of data) {
                let friend_aux = this.getUserData(item);
                friend_aux.id = item.id;

                this.friends.push(friend_aux);
            }

        }).finally(() => loading.close())
    }

    changeTab(tab:boolean) {
        if(tab) {
            this.tab_control = tab;

            this.getAllFriends();

        }
        else {
            this.tab_control = tab;
            this.getAllUsers(this.pagination.page);
        }
    }

    getAllUsers(page) {

        let loading:any = this.utilities.loading();

        this.userService.getAllUsers(page, '').then((data:any) => {

            this.users = data.data;

            this.pagination.last = data.last_page;

            this.pagination.page = data.current_page;

            this.utilities.generatePagination(this.pagination.page, this.pagination.last).then((data:any) => {

                this.pagination.sequence = data;

            });
        }).finally(() => loading.close());
    }

    userProfile(id) {
        this.router.navigate([`/jogador/perfil/${id}`]);
    }

    openModal(content, user) {

        this.selected_user = user;

        this.ngModal.open(content, {ariaLabelledBy: 'modal-basic-title'});
    }

    sendMessage(notification_message, selected_user, mymodal:any) {

        let loading:any = this.utilities.loading('Enviando mensagem');

        this.notificationService.sendUserMessage(selected_user.id ? selected_user.id : selected_user.user_id, notification_message).then((data:any) => {
            mymodal.dismiss();
            this.selected_user = {};
            this.notification_message = "";
            if(this.ban_message) {
                this.utilities.alert('success', 'Denuncia Realizada com sucesso!', 'Nossa equipe vai analisar as informações para dar continuidade com a denúncia!')
            }
            else
                this.utilities.toast('success', 'Mensagem enviada com sucesso!');
        })
            .catch((err:any) => this.utilities.toast('danger', 'Houve um erro ao enviar mensagem'))
            .finally(() => loading.close());

    }
}
