import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { BasicUser, User } from 'src/app/model/http/users.model';
import { MatButton } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';

@Component({
    selector: 'app-users-form',
    templateUrl: './users-form.component.html',
    styleUrls: ['./users-form.component.scss'],
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        MatInput,
        NgIf,
        MatError,
        MatButton,
    ],
})
export class UsersFormComponent implements OnInit {
  @Input() user = new User();
  @Output() submitEmitter = new EventEmitter<BasicUser>();
  formGroup: FormGroup;
  constructor(private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(30),
        ],
      ],
      age: [0, [Validators.required, Validators.min(18), Validators.max(110)]],
      phone: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]+$'),
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
    });
  }

  ngOnInit(): void {
    this.formGroup.get('name')?.setValue(this.user.name);
    this.formGroup.get('age')?.setValue(this.user.age);
    this.formGroup.get('phone')?.setValue(this.user.phone);
  }

  onSubmit(): void {
    const data = new BasicUser();
    data.name = this.formGroup.get('name')?.value;
    data.age = this.formGroup.get('age')?.value;
    data.phone = this.formGroup.get('phone')?.value;
    this.submitEmitter.emit(data);
  }
}
