import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-bar',
    templateUrl: './bar.component.html',
    styleUrls: ['./bar.component.scss']
})
export class BarComponent implements OnInit {

    @Input('barChartData') barChartData:any = {};
    @Input('chartType') chartType:string = '';

    barChartOptions: any = {
        responsive: true,
        type: '',
        data: {}
    };

    show:boolean = false;

    constructor() { }

    ngOnInit(): void {

        this.barChartOptions.data = this.barChartData;
        this.barChartOptions.type = this.chartType;

        console.log(this.barChartOptions);

        setTimeout(() => this.show = true, 500)

    }

}
