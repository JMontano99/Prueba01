import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BasicUser } from 'src/app/model/http/users.model';

import { UsersFormComponent } from './users-form.component';

describe('UsersFormComponent', () => {
  let component: UsersFormComponent;
  let fixture: ComponentFixture<UsersFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MatInputModule,
        MatFormFieldModule,
        BrowserAnimationsModule,
        MatButtonModule,
        UsersFormComponent,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should onSubmit', () => {
    spyOn(component.submitEmitter, 'emit');
    const data = new BasicUser();
    data.name = 'Joe Doe';
    data.age = 25;
    data.phone = '5599221122';
    component.formGroup.get('name')?.setValue(data.name);
    component.formGroup.get('age')?.setValue(data.age);
    component.formGroup.get('phone')?.setValue(data.phone);
    component.onSubmit();
    expect(component.submitEmitter.emit).toHaveBeenCalledWith(data);
  });
});
