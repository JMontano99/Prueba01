import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IColor } from 'src/app/model/http/colors.model';
import { ColorsService } from 'src/app/services/colors.service';
import { DataService } from 'src/app/services/data.service';
import { TranslateModule } from '@ngx-translate/core';
import { MatList, MatListItem } from '@angular/material/list';
import { NgIf, NgStyle } from '@angular/common';

@Component({
  selector: 'app-color-detail',
  templateUrl: './color-detail.component.html',
  styleUrls: ['./color-detail.component.scss'],
  standalone: true,
  imports: [NgIf, MatList, MatListItem, NgStyle, TranslateModule],
})
export class ColorDetailComponent {
  color?: IColor;

  constructor(
    private route: ActivatedRoute,
    private colors: ColorsService,
    private data: DataService
  ) {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.colors.getColor(params['id']).subscribe({
          next: (res) => {
            this.color = res.data;
          },
          error: (err) => {
            this.data.setGeneralNotificationMessage(err);
          },
        });
      }
    });
  }
}
