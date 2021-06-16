import { Component, OnInit } from '@angular/core';
import {faSignInAlt} from '@fortawesome/free-solid-svg-icons';
import {Router} from '@angular/router';
import {UserService} from '../../../../services/api/user/user.service';
import {UtilitiesService} from '../../../../services/utilities/utilities.service';
import {ValidationsService} from '../../../../services/validations/validations.service';

@Component({
    selector: 'app-admin-users-list',
    templateUrl: './admin-users-list.component.html',
    styleUrls: ['./admin-users-list.component.scss']
})
export class AdminUsersListComponent implements OnInit {

    q:string = '';
    users:any = [];
    birthdate:string = '';
    order:any = '';
    pagination:any = {
        page: 1,
        last: 2,
        sequence: []
    }
    onlyban:boolean = false;

    constructor(public userService: UserService,
                public router: Router,
                public validation: ValidationsService,
                public utilities: UtilitiesService) {
    }

    ngOnInit(): void {

        this.getUsers();

    }

    getUsers(page:any = 1) {

        let loading:any = this.utilities.loading();

        let formatted_birthdate = '';

        if(this.birthdate && this.validation.dateIsValid(this.birthdate, 'DD/MM/YYYY'))
            formatted_birthdate = this.utilities.formatDate(this.birthdate, 'DD/MM/YYYY', 'YYYY-MM-DD')

        this.userService.getAllUsers(page, {q: this.q, birthdate: formatted_birthdate, order: this.order, onlyban: this.onlyban}, true).then((data:any) => {

            this.users = data.data;

            this.pagination.last = data.last_page;

            this.pagination.page = data.current_page;

            this.utilities.generatePagination(this.pagination.page, this.pagination.last)
                .then((data:any) => this.pagination.sequence = data);

        }).finally(() => loading.close());
    }

    userProfile(id) {
        this.router.navigate([`/admin/usuarios/cadastro/${id}`]);
    }
}
