import {Component, Input, OnInit} from '@angular/core';
import {ChartDataSets, ChartOptions, ChartType, RadialChartOptions} from 'chart.js';

@Component({
  selector: 'app-radar-chart',
  templateUrl: './radar-chart.component.html',
  styleUrls: ['./radar-chart.component.scss']
})
export class RadarChartComponent implements OnInit {

    displayChart:boolean = false;

    radarChartOptions: RadialChartOptions = {
        responsive: true,
    };

    @Input('radarChartLabels') radarChartLabels:any = [];
    @Input('radarChartData') radarChartData:any = [];

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
    ]

  constructor() { }

  ngOnInit(): void {
        setTimeout(() => this.displayChart = true, 500);
  }

}
