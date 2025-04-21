import { Component } from '@angular/core';
import { IColor } from '../../model/http/colors.model';
import { ColorsService } from '../../services/colors.service';
import { DataService } from 'src/app/services/data.service';
import { TranslateModule } from '@ngx-translate/core';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatIconButton } from '@angular/material/button';
import { NgStyle } from '@angular/common';
import {
  MatTable,
  MatColumnDef,
  MatHeaderCellDef,
  MatHeaderCell,
  MatCellDef,
  MatCell,
  MatHeaderRowDef,
  MatHeaderRow,
  MatRowDef,
  MatRow,
} from '@angular/material/table';

@Component({
  selector: 'app-colors',
  templateUrl: './colors.component.html',
  styleUrls: ['./colors.component.scss'],
  standalone: true,
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCellDef,
    MatHeaderCell,
    MatCellDef,
    MatCell,
    NgStyle,
    MatIconButton,
    RouterLink,
    MatIcon,
    MatHeaderRowDef,
    MatHeaderRow,
    MatRowDef,
    MatRow,
    TranslateModule,
  ],
})
export class ColorsComponent {
  displayedColumns: string[] = [
    'id',
    'name',
    'year',
    'color',
    'color_sample',
    'pantone_value',
    'actions',
  ];
  data: IColor[] = [];

  constructor(private colors: ColorsService, private dataService: DataService) {
    this.colors.getColors().subscribe({
      next: (res) => {
        this.data = res.data;
      },
      error: (err) => {
        this.dataService.setGeneralNotificationMessage(err);
      },
    });
  }
}
