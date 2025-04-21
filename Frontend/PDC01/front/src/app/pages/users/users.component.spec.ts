import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import {
  TranslateFakeLoader,
  TranslateLoader,
  TranslateModule,
} from '@ngx-translate/core';
import { UsersService } from 'src/app/services/users.service';
import { of, throwError } from 'rxjs';
import { UsersComponent } from './users.component';
import { DataService } from 'src/app/services/data.service';
import { User } from 'src/app/model/http/users.model';
import { RouterModule } from '@angular/router';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let usersServiceSpy: jasmine.SpyObj<UsersService>;
  let dataServiceSpy: jasmine.SpyObj<DataService>;
  const usersData: User[] = [
    {
      id: 1,
      name: 'Joe',
      age: 25,
      phone: '5522445566',
    },
    {
      id: 2,
      name: 'Jhon',
      age: 40,
      phone: '0987654321',
    },
  ];
  beforeEach(async () => {
    usersServiceSpy = jasmine.createSpyObj<UsersService>('UsersService', [
      'getUsers',
      'deleteUser',
    ]);
    dataServiceSpy = jasmine.createSpyObj<DataService>('DataService', [
      'setGeneralNotificationMessage',
    ]);
    usersServiceSpy.getUsers.and.returnValue(of(usersData));
    usersServiceSpy.deleteUser.and.returnValue(of());
    await TestBed.configureTestingModule({
      imports: [
        MatTableModule,
        MatButtonModule,
        RouterModule.forRoot([]),
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader },
        }),
        UsersComponent,
      ],
      providers: [
        { provide: UsersService, useValue: usersServiceSpy },
        { provide: DataService, useValue: dataServiceSpy },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should deleteUser', () => {
    component.data = usersData;
    usersServiceSpy.deleteUser.and.callFake(() => {
      return of(void 0);
    });
    component.deleteUser(2);
    expect(component.data.length).toBe(1);
  });
  it('should deleteUser with error', () => {
    component.data = usersData;
    usersServiceSpy.deleteUser.and.returnValue(throwError(() => 'error'));
    component.deleteUser(1);
    expect(dataServiceSpy.setGeneralNotificationMessage).toHaveBeenCalledWith(
      'error'
    );
  });

  it('should getUsers with error', () => {
    usersServiceSpy.getUsers.and.returnValue(throwError(() => 'error'));
    component.getUser();
    expect(dataServiceSpy.setGeneralNotificationMessage).toHaveBeenCalledWith(
      'error'
    );
  });
});
