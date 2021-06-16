import { Component, OnInit } from '@angular/core';
import {faAlignCenter, faBars, faBell, faPlus, faTachometerAlt, faTimes, faUsers} from '@fortawesome/free-solid-svg-icons';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UserService} from '../../../services/api/user/user.service';
import {ActivatedRoute} from '@angular/router';
import {ValidationsService} from '../../../services/validations/validations.service';
import {UtilitiesService} from '../../../services/utilities/utilities.service';
import {NotificationService} from '../../../services/api/notification/notification.service';
import {ContactService} from '../../../services/api/contact/contact.service';
import * as moment from 'moment';

@Component({
    selector: 'app-admin-notifications.component',
    templateUrl: './admin-notifications.component.html',
    styleUrls: ['./admin-notifications.component.scss']
})
export class AdminNotificationsComponent implements OnInit {

    notifications:any = [];
    contacts:any = [];
    onlyban:boolean = false;

    pagination:any = {
        page: 1,
        last: 2,
        sequence: []
    }
    contact_pagination:any = {
        page: 1,
        last: 2,
        sequence: []
    }

    tab_control:boolean = false;

    selected_notification:any = {};
    respond_contact:any = false;
    respond_message:string;

    constructor(public userService: UserService,
                private route: ActivatedRoute,
                public ngModal: NgbModal,
                public validation: ValidationsService,
                public notificationService: NotificationService,
                public contactService: ContactService,
                public utilities: UtilitiesService) {

        moment.locale('pt-br');
    }

    ngOnInit(): void {
        this.getAllNotifications();
    }

    getAllNotifications(page:number = 1) {

        let loading:any = this.utilities.loading();

        this.notificationService.getSystemNotifications(page).then((data:any) => {

            this.notifications = data.data;

            this.pagination.last = data.last_page;

            this.pagination.page = data.current_page;

            this.utilities.generatePagination(this.pagination.page, this.pagination.last).then((data:any) => {

                this.pagination.sequence = data;

            });

        }).catch((err:any) => {console.log(err)}).finally(() => loading.close());
    }

    getContacts(page:number = 1) {

        let loading:any = this.utilities.loading();

        this.contactService.getContacts(page).then((data:any) => {

            this.contacts = data.data;

            this.contact_pagination.last = data.last_page;

            this.contact_pagination.page = data.current_page;

            this.utilities.generatePagination(this.contact_pagination.page, this.contact_pagination.last).then((data:any) => {

                this.contact_pagination.sequence = data;

            });

        }).catch((err:any) => {console.log(err)}).finally(() => loading.close());
    }

    openNotification(notification, modal) {

        this.notificationService.readNotification(notification.id);
        notification.read = true;

        this.selected_notification = notification;

        this.ngModal.open(modal, {ariaLabelledBy: 'modal-ban-title'});

    }

    openContact(contact, modal) {

        this.contactService.readContact(contact.id);
        contact.read = true;

        this.selected_notification = {
            id: contact.id,
            title: contact.name ? contact.name : 'Novo Contato',
            contact: contact.contact,
            message: contact.message,
            isContact: true,
            player: {}
        };

        this.ngModal.open(modal, {ariaLabelledBy: 'modal-ban-title'});

    }

    changeTab(tab) {

        if(tab) {
            this.getContacts(1);
            this.tab_control = tab;
        }
        else {
            this.getAllNotifications();
            this.tab_control = tab;
        }

    }

    banUser(notification, modal) {
        this.utilities.alert('question', 'Deseja realmente banir este usuário?', '', true).then((data:any) => {

            let loading:any = this.utilities.loading();

            this.userService.banUser(notification.player.user.id).then((data:any) => {

                notification.player.user.ban_date = moment().format('YYYY-MM-DD HH:mm:ss');

                this.utilities.toast('success', 'Usuário banido com sucesso!');

                this.notificationService.sendSystemMessage(notification.sender.user.id, `Olá, seu pedido de banimento do usuário ${notification.player}, foi análisada e foi jungada como válida. O usuário foi banido. Muito obrigado pela paciência.`, 'Solicitação Aprovada');

            }).finally(() => {
                loading.close()
                modal.dismiss();
            });

        }).catch((err:any) => console.log(err));
    }
}
