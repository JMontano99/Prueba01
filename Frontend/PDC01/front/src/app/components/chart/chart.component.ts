import { Component, Input, OnInit } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexNonAxisChartSeries,
  ApexTheme,
  NgApexchartsModule,
} from 'ng-apexcharts';
import { ApexChartsDefaultAttributes } from 'src/app/constants/charts';
import { LightThemes } from 'src/app/constants/theme';
import { ApexChartAttributes } from 'src/app/model/chart/chart.model';
import { ThemeSwitcherService } from 'src/app/services/theme-switcher.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  standalone: true,
  imports: [NgApexchartsModule],
})
export class ChartComponent implements OnInit {
  mode: 'light' | 'dark' = 'light';
  color = {
    light: '#373d3f',
    dark: '#f6f7f8',
  };
  theme: ApexTheme = { mode: this.mode, palette: 'palette1' };
  @Input() chart: ApexChart = { type: 'bar', foreColor: this.color[this.mode] };
  @Input() series: ApexAxisChartSeries | ApexNonAxisChartSeries = [];
  @Input() attributes?: ApexChartAttributes;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  attr: Record<string, any> = JSON.parse(
    JSON.stringify(ApexChartsDefaultAttributes)
  );

  constructor(private themeSwitcher: ThemeSwitcherService) {
    this.themeSwitcher.getCurrentTheme().subscribe((resp) => {
      this.mode = LightThemes.includes(resp) ? 'light' : 'dark';
      this.updateThemeMode();
    });
  }

  ngOnInit(): void {
    this.setAttributesValues();
    this.updateThemeMode();
  }

  updateThemeMode() {
    const chart: ApexChart = JSON.parse(JSON.stringify(this.chart));
    chart.foreColor = this.color[this.mode];
    this.chart = chart;
    this.theme = { mode: this.mode, palette: 'palette1' };
  }

  setAttributesValues() {
    if (this.attributes) {
      const keys = Object.keys(this.attributes);
      const values = Object.values(this.attributes);
      keys.forEach((key, index) => {
        this.attr[key] = values[index];
      });
    }
  }
}
