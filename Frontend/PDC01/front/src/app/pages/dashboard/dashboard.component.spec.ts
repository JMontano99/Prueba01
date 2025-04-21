import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockChartComponent } from 'src/mocks/components.mocks';

import { DashboardComponent } from './dashboard.component';
import { ChartComponent } from 'src/app/components/chart/chart.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
    })
      .overrideComponent(DashboardComponent, {
        remove: { imports: [ChartComponent] },
        add: { imports: [MockChartComponent] },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
