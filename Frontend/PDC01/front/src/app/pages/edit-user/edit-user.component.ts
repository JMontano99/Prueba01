import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BasicUser, User } from 'src/app/model/http/users.model';
import { DataService } from 'src/app/services/data.service';
import { UsersService } from 'src/app/services/users.service';
import { UsersFormComponent } from '../../components/users-form/users-form.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
  standalone: true,
  imports: [NgIf, UsersFormComponent],
})
export class EditUserComponent implements OnInit {
  editedUser = new User();
  displayForm = false;
  constructor(
    private usersService: UsersService,
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.getUser(Number(id));
    });
  }

  getUser(id: number): void {
    this.usersService.getUserById(id).subscribe({
      next: (res) => {
        if (res?.id) {
          this.editedUser = res;
          this.displayForm = true;
        }
      },
      error: (err) => {
        this.dataService.setGeneralNotificationMessage(err);
      },
    });
  }
  editUser(user: BasicUser): void {
    const newUser = { ...this.editedUser };
    newUser.name = user.name;
    newUser.phone = user.phone;
    newUser.age = user.age;
    this.usersService.editUser(newUser).subscribe({
      next: () => {
        this.router.navigate(['users']);
      },
      error: (error) => this.dataService.setGeneralNotificationMessage(error),
    });
  }
}
