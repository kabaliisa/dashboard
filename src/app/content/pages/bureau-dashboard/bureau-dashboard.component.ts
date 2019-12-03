import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { ThemeConfig } from 'src/app/config';
declare let Chart: any;

@Component({
  selector: 'app-bureau-dashboard',
  templateUrl: './bureau-dashboard.component.html',
  styleUrls: ['./bureau-dashboard.component.css']
})
export class BureauDashboardComponent implements OnInit {
   colors: any;

  doughnutChart;
  public lineChart;
 
  public barChart;
  public chartActiveTimePeriod: string = 'this_week';
  public chartTimePeriodData: any;

  constructor() { }

  ngOnInit() {
    const colors = ThemeConfig.colors;
    // var colors = ThemeConfig.colors;
    var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var MONTHS_S = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var DAYS = ["Sunday", "Munday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var DAYS_S = ["S", "M", "T", "W", "T", "F", "S"];
    var DAYS_SS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    var color = Chart.helpers.color;

    this.chartTimePeriodData = {
        this_week: {
            labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            data: {
                sessions: [20, 18, 40, 50, 35, 24, 40],
                page_views: [64, 54, 60, 65, 52, 85, 48],
            }
        },
        last_week: {
            labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            data: {
                sessions: [65, 59, 80, 81, 56, 55, 40],
                page_views: [28, 48, 40, 19, 86, 27, 90],
            }
        },
        year: {
            labels: MONTHS_S,
            data: {
                sessions: [85, 60, 59, 35, 80, 81, 56, 55, 40, 20, 75, 55],
                page_views: [28, 32, 48, 40, 19, 42, 86, 27, 90, 30, 35, 70],
            }
        }
    }

    this.doughnutChart = {
      type: 'doughnut',
      data: [350,100],
      labels: ['Download Sales', 'Mail-Order Sales'],
      colors: [{ backgroundColor: [colors.primary, colors.danger] }],
      legend: true,
      options: {
          maintainAspectRatio: false,
          legend: {
            position: 'right',
            align: 'end'
          },
          cutoutPercentage: 70,
          layout: {
            padding: {
                left: 2,
            }
          }
      }
  };

      /*
         * Line Chart Data
         */
        this.lineChart = {
          type: 'line',
          data: [
              {data: [30, 50, 35, 70, 58, 88, 70], label: 'Dataset'},
          ],
          labels: DAYS_S,
          legend: true,
          colors: [
              {
                  borderColor: colors.primary,
                  backgroundColor: color(colors.primary).alpha(0.5).rgbString(),
                  fill: false,
                  borderWidth: 4,
                  pointHitRadius: 30,
                  pointBackgroundColor: '#fff',
                  pointBorderColor: colors.primary,
                  pointHoverBorderColor: '#fff',
                  pointHoverBackgroundColor: colors.primary,
                  pointRadius: 5,
                  pointBorderWidth: 2,
                  pointHoverRadius: 7,
              },
          ],
          options: {
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                  yAxes: [{
                      ticks: {
                          beginAtZero: true,
                      }
                  }]
              },
          },
      };

  }


}
