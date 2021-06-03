import {Component, Input, OnInit} from '@angular/core';
import {ChartType, RadialChartOptions} from 'chart.js';
import {graphHelper} from '../../../../helpers/graph.helper';

@Component({
  selector: 'app-radar',
  templateUrl: './radar.component.html',
  styleUrls: ['./radar.component.scss']
})
export class RadarComponent implements OnInit {

    @Input('radarChartLabels') radarChartLabels:any = [];
    @Input('radarChartData') radarChartData:any = [];

    radarChartOptions: any = {
        responsive: true,
        scale: {
            ticks: {
                beginAtZero: true
            }
        }
    };
    radarChartType: ChartType = 'radar';

    radarColors:any = graphHelper.radar.colors;

    constructor() { }

    ngOnInit(): void {
    }

}
