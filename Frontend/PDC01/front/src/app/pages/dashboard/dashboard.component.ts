import { Component } from '@angular/core';
import { ApexChartComponent } from 'src/app/model/chart/chart.model';
import { ChartComponent } from '../../components/chart/chart.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [ChartComponent],
})
export class DashboardComponent {
  sales: ApexChartComponent = {
    chart: {
      type: 'area',
      background: 'transparent',
    },
    series: [
      {
        name: 'Sales',
        data: [
          62, 46, 47, 37, 31, 39, 19, 45, 35, 38, 65, 54, 61, 35, 93, 51, 24,
          53, 27, 56, 54, 41, 43, 27,
        ],
      },
    ],
    attributes: {
      title: {
        text: '$424,652',
      },
      subtitle: {
        text: 'Sales',
      },
      labels: [...Array(24).keys()].map((n) => `2018-09-0${n + 1}`),
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        type: 'datetime',
      },
      yaxis: {
        show: false,
      },
    },
  };

  expenses: ApexChartComponent = {
    chart: {
      type: 'area',
      background: 'transparent',
    },
    series: [
      {
        name: 'Expenses',
        data: [
          37, 56, 27, 27, 39, 45, 38, 43, 53, 54, 35, 61, 24, 62, 65, 93, 51,
          54, 19, 35, 46, 31, 41, 47,
        ],
      },
    ],
    attributes: {
      title: {
        text: '$235,312',
      },
      subtitle: {
        text: 'Expenses',
      },
      labels: [...Array(24).keys()].map((n) => `2018-09-0${n + 1}`),
      xaxis: {
        type: 'datetime',
      },
      yaxis: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
    },
  };

  profits: ApexChartComponent = {
    chart: {
      type: 'area',
      background: 'transparent',
    },
    series: [
      {
        name: 'Profits',
        data: [
          54, 19, 56, 65, 37, 43, 54, 38, 53, 93, 61, 39, 62, 27, 35, 27, 24,
          35, 46, 41, 45, 31, 47, 51,
        ],
      },
    ],
    attributes: {
      title: {
        text: '$135,965',
      },
      subtitle: {
        text: 'Profits',
      },
      labels: [...Array(24).keys()].map((n) => `2018-09-0${n + 1}`),
      xaxis: {
        type: 'datetime',
      },
      yaxis: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
    },
  };

  monthSales: ApexChartComponent = {
    chart: {
      type: 'bar',
      stacked: true,
      background: 'transparent',
    },
    series: [
      {
        name: 'Clothing',
        data: [42, 52, 16, 55, 59, 51, 45, 32, 26, 33, 44, 51, 42, 56],
      },
      {
        name: 'Food Products',
        data: [6, 12, 4, 7, 5, 3, 6, 4, 3, 3, 5, 6, 7, 4],
      },
    ],
    attributes: {
      labels: [
        '10',
        '11',
        '12',
        '13',
        '14',
        '15',
        '16',
        '17',
        '18',
        '19',
        '20',
        '21',
        '22',
        '23',
      ],
      title: {
        text: 'Monthly Sales',
      },
      xaxis: {
        labels: {
          show: false,
        },
      },
      yaxis: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
    },
  };

  dailySales: ApexChartComponent = {
    chart: {
      type: 'area',
      background: 'transparent',
    },
    series: [
      {
        name: 'Sales',
        data: [
          62, 46, 47, 37, 31, 39, 19, 45, 35, 38, 65, 54, 61, 35, 93, 51, 24,
          53, 27, 56, 54, 41, 43, 27,
        ],
      },
      {
        name: 'Expenses',
        data: [
          37, 56, 27, 27, 39, 45, 38, 43, 53, 54, 35, 61, 24, 62, 65, 93, 51,
          54, 19, 35, 46, 31, 41, 47,
        ],
      },
      {
        name: 'Profits',
        data: [
          54, 19, 56, 65, 37, 43, 54, 38, 53, 93, 61, 39, 62, 27, 35, 27, 24,
          35, 46, 41, 45, 31, 47, 51,
        ],
      },
    ],
    attributes: {
      title: {
        text: 'Daily Sales',
      },
      labels: [...Array(24).keys()].map((n) => `2018-09-0${n + 1}`),
      xaxis: {
        type: 'datetime',
      },
      dataLabels: {
        enabled: false,
      },
    },
  };

  departmentSales: ApexChartComponent = {
    series: [21, 23, 19, 14, 6],
    chart: {
      type: 'donut',
      background: 'transparent',
    },
    attributes: {
      title: {
        text: 'Department Sales',
      },
      labels: [
        'Clothing',
        'Food Products',
        'Electronics',
        'Kitchen Utility',
        'Gardening',
      ],
      dataLabels: {
        enabled: false,
      },
    },
  };

  customers: ApexChartComponent = {
    chart: {
      type: 'line',
      background: 'transparent',
    },
    series: [
      {
        name: 'Day Time',
        data: [
          40, 42.099958338541356, 44.39933366658732, 46.8966287948416,
          49.58935464636049, 52.47403959254523, 55.546242479936076,
          58.80056930437632, 62.230693476938406, 65.82937961400214,
          69.58851077208406, 73.49911903647451, 77.55141936148084,
          81.73484654913705, 86.03809524265534, 90.44916280070001,
          94.95539490878473, 99.54353377476994, 104.19976874658941,
          108.9097891819962, 113.65883939231587, 118.43177547494872,
          123.21312384270317, 127.98714125198396, 132.73787612642684,
          137.44923096777933, 142.10502564169403, 146.6890613226396,
          151.18518487935376, 155.57735348018014, 159.84969919624325,
          163.98659337974013, 167.97271059465632, 171.79309187795866,
          175.43320711076788, 178.87901628117558, 182.11702942323004,
          185.1343650201722, 187.91880666424348, 190.4588577703018,
          192.74379414605454, 194.76371422793676, 196.50958679850538,
          197.9732960086708, 199.14768353612396, 200.02658771991292,
          200.60487952025824, 200.8784951623394, 200.8444653329105,
          200.50094080918137, 199.84721441039565, 198.88373917392454,
        ],
      },
      {
        name: 'Night Time',
        data: [
          54, 56.07405714014775, 58.29602540921948, 60.66529577105972,
          63.180854557842174, 65.84128555604508, 68.64477292147346,
          71.58910491799622, 74.67167847315814, 77.88950454233074,
          81.23921427158422, 84.71706594799781, 88.31895272468054,
          92.04041110634972, 95.87663017991692, 99.82246157315598,
          103.87243012318636, 108.02074523519107, 112.26131291051054,
          116.58774842201089, 120.99338961342048, 125.47131079816288,
          130.01433723209362, 134.61506013346744, 139.2658522224317,
          143.95888375135635, 148.68613899637472, 153.43943317962643,
          158.21042979086064, 162.99065827628195, 167.7715320617974,
          172.54436687716012, 177.30039934689572, 182.03080581335158,
          186.72672135671917, 191.3792589764551, 195.9795288981585,
          200.51865796966294, 204.98780910985832, 209.3782007735854,
          213.68112639583103, 217.88797377840612, 221.99024438230458,
          225.97957248902247, 229.84774419426245, 233.5867161976589,
          237.18863435243168, 240.64585193921704, 243.95094762872037,
          247.09674309830376, 250.07632026814366, 252.88303812318028,
        ],
      },
    ],
    attributes: {
      title: {
        text: 'Customers',
      },
      subtitle: {
        text: '168,215',
        align: 'center',
      },
      xaxis: {
        labels: {
          show: false,
        },
      },
      yaxis: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
    },
  };

  performance: ApexChartComponent = {
    chart: {
      type: 'radar',
      background: 'transparent',
    },
    series: [
      {
        name: 'Income',
        data: [80, 50, 30, 40, 100, 20],
      },
      {
        name: 'Net Worth',
        data: [20, 30, 40, 80, 20, 80],
      },
    ],
    attributes: {
      title: {
        text: 'Performance',
      },
      xaxis: {
        categories: ['Jan', 'Fab', 'Mar', 'Apr', 'May', 'Jun'],
      },
      yaxis: {
        show: false,
      },
      stroke: {
        width: 2,
      },
      fill: {
        opacity: 0.3,
      },
      markers: {
        size: 2,
        hover: {
          size: 5,
        },
      },
      dataLabels: {
        enabled: false,
      },
    },
  };

  timeline: ApexChartComponent = {
    chart: {
      type: 'rangeBar',
      background: 'transparent',
    },
    series: [
      {
        name: 'Bob',
        data: [
          {
            x: 'Design',
            y: [
              new Date('2019-03-05').getTime(),
              new Date('2019-03-08').getTime(),
            ],
          },
          {
            x: 'Code',
            y: [
              new Date('2019-03-08').getTime(),
              new Date('2019-03-11').getTime(),
            ],
          },
          {
            x: 'Test',
            y: [
              new Date('2019-03-11').getTime(),
              new Date('2019-03-16').getTime(),
            ],
          },
        ],
      },
      {
        name: 'Joe',
        data: [
          {
            x: 'Design',
            y: [
              new Date('2019-03-02').getTime(),
              new Date('2019-03-05').getTime(),
            ],
          },
          {
            x: 'Code',
            y: [
              new Date('2019-03-06').getTime(),
              new Date('2019-03-09').getTime(),
            ],
          },
          {
            x: 'Test',
            y: [
              new Date('2019-03-10').getTime(),
              new Date('2019-03-19').getTime(),
            ],
          },
        ],
      },
    ],
    attributes: {
      title: {
        text: 'Timeline',
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      xaxis: {
        type: 'datetime',
      },
      legend: {
        position: 'top',
      },
      dataLabels: {
        enabled: false,
      },
    },
  };
}
