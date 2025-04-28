import { Component } from '@angular/core';
import { userListData } from '../userData';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';
import { CommonModule } from '@angular/common';
// import Highcharts from 'highcharts';

@Component({
  selector: 'app-dashboard',
  imports: [HighchartsChartModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  chartDataList: any = [];
  Highcharts: typeof Highcharts = Highcharts;
  chartArr: any = [
    {
      type: 'pie',
      content: {}
    },
    {
      type: 'line',
      content: {}
    },
    {
      type: 'bar',
      content: {}
    },
    {
      type: 'spline',
      content: {}
    },
  ]

  constructor() {
    this.chartDataList = userListData.reduce((ac: any, cur: any) => {
      let indexValue = ac.findIndex((el: any) => el.name == cur.event_type);
      indexValue != -1 ? ac[indexValue].y += 1 : ac.push({ name: cur.event_type, y: 1 })
      return ac;
    }, []);
    this.assignChartOptionFunc();
  }


  assignChartOptionFunc() {
    this.chartArr.map((el: any) => {
      let chartOption = {
        chart: {
          type: el.type,
        },
        title: {
          text: (el.type).charAt(0).toUpperCase() + el.type.slice(1, el.type.length) + ' Chart of User Data'
        },
        xAxis: { categories: this.chartDataList.map((el: any) => el.name) },
        credits: {
          enabled: false
        },
        series: [{
          type: el.type,
          data: this.chartDataList,
          dataLabels: {
            enabled: true,
            color: '#FFFFFF',
            style: {
              fontWeight: 'bold',
              textShadow: '0 0 3px rgba(0, 0, 0,)'
            }
          }
        }]
      };
      el.content = chartOption;
    })
  }

}
