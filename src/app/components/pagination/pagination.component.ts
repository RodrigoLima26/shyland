import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

    @Input('pagination') pagination:any = {
        page: 1,
        last: 2,
        sequence: []
    };
    @Output() callPaginationFunction = new EventEmitter();

    constructor() {

    }

    ngOnInit(): void {}

    ngOnChanges() {}

    emitPaginateFunction(page:number) {
        this.callPaginationFunction.emit(page);
    }
}
