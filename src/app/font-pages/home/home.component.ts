import { Component, OnInit } from '@angular/core';
import {ContactService} from '../../../services/api/contact/contact.service';
import {UtilitiesService} from '../../../services/utilities/utilities.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    title = 'shyland';
    contact:any = {};

    public modal_control:boolean = false;

    constructor(public contactService: ContactService,
                public utilities: UtilitiesService) { }

    ngOnInit(): void {
    }

    addContact(contact) {

        let loading:any = this.utilities.loading();

        this.contactService.addContact(contact).then((data:any) => {

            this.contact.name = "";
            this.contact.contact = "";
            this.contact.message = "";

            this.utilities.alert('success', 'Contato Enviado com Sucesso!');

        }).finally(() => loading.close());
    }
}
