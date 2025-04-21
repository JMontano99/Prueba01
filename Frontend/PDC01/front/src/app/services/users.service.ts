import { Injectable } from '@angular/core';
import { Endpoints } from 'src/environments/endpoints';
import { BasicUser, User } from '../model/http/users.model';
import { ConsumeService } from './consume.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private consumeService: ConsumeService) {}

  getUsers(): Observable<User[]> {
    return this.consumeService.httpGet<User[]>(Endpoints.users.users);
  }
  getUserById(id: number): Observable<User> {
    return this.consumeService.httpGet<User>(`${Endpoints.users.users}/${id}`);
  }
  createUser(user: BasicUser): Observable<User> {
    return this.consumeService.httpPost<User>(`${Endpoints.users.users}`, user);
  }
  editUser(user: User): Observable<User> {
    return this.consumeService.httpPut<User>(
      `${Endpoints.users.users}/${user.id}`,
      user
    );
  }
  deleteUser(id: number): Observable<void> {
    return this.consumeService.httpDelete<void>(
      `${Endpoints.users.users}/${id}`
    );
  }
}
