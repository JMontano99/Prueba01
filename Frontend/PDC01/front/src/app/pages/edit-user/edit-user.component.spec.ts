import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { UsersService } from 'src/app/services/users.service';
import { MockUsersFormComponent } from 'src/mocks/components.mocks';
import { EditUserComponent } from './edit-user.component';
import { of, throwError } from 'rxjs';
import { BasicUser } from 'src/app/model/http/users.model';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsersFormComponent } from 'src/app/components/users-form/users-form.component';
describe('EditUserComponent', () => {
  let component: EditUserComponent;
  let fixture: ComponentFixture<EditUserComponent>;
  let usersServiceSpy: jasmine.SpyObj<UsersService>;
  let dataServiceSpy: jasmine.SpyObj<DataService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    usersServiceSpy = jasmine.createSpyObj<UsersService>('UsersService', [
      'getUserById',
      'editUser',
    ]);
    usersServiceSpy.getUserById.and.returnValue(
      of({
        id: 1,
        name: 'Joe',
        age: 25,
        phone: '5522445566',
      })
    );
    usersServiceSpy.editUser.and.returnValue(
      of({
        id: 1,
        name: 'Joe',
        age: 25,
        phone: '5522445566',
      })
    );
    dataServiceSpy = jasmine.createSpyObj<DataService>('DataService', [
      'setGeneralNotificationMessage',
    ]);
    routerSpy = jasmine.createSpyObj<Router>('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [EditUserComponent, BrowserAnimationsModule],
      providers: [
        { provide: UsersService, useValue: usersServiceSpy },
        { provide: DataService, useValue: dataServiceSpy },
        { provide: Router, useValue: routerSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(
              convertToParamMap({
                id: 1,
              })
            ),
          },
        },
      ],
    })
      .overrideComponent(EditUserComponent, {
        remove: { imports: [UsersFormComponent] },
        add: { imports: [MockUsersFormComponent] },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should editUser', () => {
    const user = new BasicUser();
    user.name = 'Joe';
    user.age = 25;
    user.phone = '5522445566';
    component.editUser(user);
    expect(usersServiceSpy.editUser).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['users']);
  });
  it('should getUser with error', () => {
    usersServiceSpy.getUserById.and.returnValue(throwError(() => 'error'));
    component.getUser(1);
    expect(dataServiceSpy.setGeneralNotificationMessage).toHaveBeenCalledWith(
      'error'
    );
  });
  it('should editUser with error', () => {
    usersServiceSpy.editUser.and.returnValue(throwError(() => 'error'));
    component.editUser({
      age: 25,
      name: 'Joe',
      phone: '2222222222',
    });
    expect(dataServiceSpy.setGeneralNotificationMessage).toHaveBeenCalledWith(
      'error'
    );
  });
});
