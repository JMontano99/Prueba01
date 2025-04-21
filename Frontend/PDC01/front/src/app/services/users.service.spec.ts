import { TestBed } from '@angular/core/testing';
import { ConsumeService } from './consume.service';
import { of } from 'rxjs';
import { UsersService } from './users.service';
import { User } from '../model/http/users.model';

describe('UsersService', () => {
  let service: UsersService;
  let consumeServiceSpy: jasmine.SpyObj<ConsumeService>;
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
  beforeEach(() => {
    consumeServiceSpy = jasmine.createSpyObj('ConsumeService', [
      'httpGet',
      'httpPost',
      'httpPut',
      'httpDelete',
    ]);

    TestBed.configureTestingModule({
      providers: [{ provide: ConsumeService, useValue: consumeServiceSpy }],
    });
    service = TestBed.inject(UsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should getUsers', () => {
    consumeServiceSpy.httpGet.and.returnValue(of(usersData));
    service.getUsers().subscribe((response) => {
      expect(response).toBeDefined();
      expect(response.length).toBe(2);
    });
  });

  it('should getUserById', () => {
    consumeServiceSpy.httpGet.and.returnValue(of(usersData[0]));
    service.getUserById(1).subscribe((response) => {
      expect(response).toBeDefined();
      expect(response.id).toBe(1);
      expect(response.name).toBe('Joe');
      expect(response.age).toBe(25);
    });
  });

  it('should createUser', () => {
    consumeServiceSpy.httpPost.and.returnValue(of(usersData[0]));
    service.createUser(usersData[0]).subscribe((response) => {
      expect(response).toBeDefined();
      expect(response.id).toBe(1);
      expect(response.name).toBe('Joe');
      expect(response.age).toBe(25);
    });
  });

  it('should editUser', () => {
    consumeServiceSpy.httpPut.and.returnValue(of(usersData[0]));
    service.editUser(usersData[0]).subscribe((response) => {
      expect(response).toBeDefined();
      expect(response.id).toBe(1);
      expect(response.name).toBe('Joe');
      expect(response.age).toBe(25);
    });
  });

  it('should delete UserById', () => {
    consumeServiceSpy.httpDelete.and.returnValue(of({}));
    service.deleteUser(1).subscribe((response) => {
      expect(response).toBeDefined();
    });
  });
});
