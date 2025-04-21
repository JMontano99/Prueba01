import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/http/users.model';
import { DataService } from 'src/app/services/data.service';
import { UsersService } from 'src/app/services/users.service';
import { TranslateModule } from '@ngx-translate/core';
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
import { RouterLink } from '@angular/router';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  standalone: true,
  imports: [
    MatButton,
    RouterLink,
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
    TranslateModule,
  ],
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'age', 'phone', 'actions'];
  data: User[] = [];
  constructor(
    private usersService: UsersService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.usersService.getUsers().subscribe({
      next: (users) => {
        this.data = users;
      },
      error: (err) => {
        this.dataService.setGeneralNotificationMessage(err);
      },
    });
  }

  deleteUser(id: number): void {
    this.usersService.deleteUser(id).subscribe({
      next: () => {
        this.data = this.data.filter((user) => user.id !== id);
      },
      error: (err) => {
        this.dataService.setGeneralNotificationMessage(err);
      },
    });
  }
}
