import { Component, OnInit } from '@angular/core';
import {NotificationService} from '../../../services/api/notification/notification.service';
import {UtilitiesService} from '../../../services/utilities/utilities.service';
import {faCheck, faTimes, faReply} from '@fortawesome/free-solid-svg-icons';
import {FriendService} from '../../../services/api/friend/friend.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-client-notifications',
  templateUrl: './client-notifications.component.html',
  styleUrls: ['./client-notifications.component.scss']
})
export class ClientNotificationsComponent implements OnInit {

    changer:boolean = false;
    notifications:any = [];
    selected_notification:any = {};
    icons:any = {
        close: faTimes,
        check: faCheck,
        reply: faReply
    }

    pagination:any = {
        page: 1,
        last: 2,
        sequence: []
    }

    ban_message:string = "";

    notification_message:string = "";
    openMessage:boolean = false;

    constructor(public notificationService: NotificationService,
                public friendService: FriendService,
                public ngModal: NgbModal,
                public utilities: UtilitiesService) { }

    ngOnInit(): void {
        this.getAllNotifications();
    }

    getAllNotifications(page:number = 1) {

        let loading:any = this.utilities.loading();

        this.notificationService.getNotifications(page).then((data:any) => {

            this.notifications = data.data;

            this.pagination.last = data.last_page;

            this.pagination.page = data.current_page;

            this.utilities.generatePagination(this.pagination.page, this.pagination.last).then((data:any) => {

                this.pagination.sequence = data;

            });

        }).catch((err:any) => {console.log(err)}).finally(() => loading.close());
    }

    deleteNotification(notification) {

        this.utilities.alert('warning', 'Deseja remover esta notificação?', '', true).then((data:any) => {

            let loading:any = this.utilities.loading();

            this.notificationService.deleteNotifications(notification.id).then((data:any) => {
                this.getAllNotifications(this.pagination.page);
            }).finally(() => loading.close());

        }).catch(err => console.log(err))

    }

    confirmFriendship(notification) {

        let loading:any = this.utilities.loading();

        this.friendService.confirmFriendship(notification.id).then((data:any) => {

            this.utilities.toast('success', 'Amizade iniciada com sucesso!');

            this.getAllNotifications(this.pagination.page);
        }).finally(() => loading.close());

    }

    openModal(content, notification, reply:boolean = false) {

        this.selected_notification = notification;
        if(reply)
            this.openMessage = true;

        if(!notification.read) {
            this.notificationService.readNotification(notification.id)
            this.changer = !this.changer;
            notification.read = 1;
        }

        this.ngModal.open(content, {ariaLabelledBy: 'modal-basic-title'});
    }

    sendMessage(notification_message, sender_id, mymodal:any) {

        let loading:any = this.utilities.loading('Enviando mensagem');

        this.notificationService.sendUserMessage(sender_id, notification_message, '', this.ban_message ? this.ban_message : '').then((data:any) => {

            mymodal.dismiss();
            this.selected_notification = {};
            this.notification_message = "";

            if(this.ban_message) {
                this.utilities.alert('success', 'Denuncia Realizada com sucesso!', 'Nossa equipe vai analisar as informações para dar continuidade com a denúncia!')
            }
            else
                this.utilities.toast('success', 'Mensagem enviada com sucesso!');

            this.ban_message = '';
        })
            .catch((err:any) => this.utilities.toast('danger', 'Houve um erro ao enviar mensagem'))
            .finally(() => loading.close());

    }

    openBanModal(old_modal, new_modal) {
        old_modal.dismiss();

        setTimeout(() => {
            this.ngModal.open(new_modal, {ariaLabelledBy: 'modal-ban-title'});
        }, 200)
    }
}
