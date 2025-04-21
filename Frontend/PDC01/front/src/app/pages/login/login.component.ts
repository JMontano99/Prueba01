import { Component, ViewEncapsulation } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { SecurityService } from 'src/app/services/security.service';
import { ILoginReq } from 'src/app/model/http/security.model';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MatButton } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatError } from '@angular/material/form-field';
import {
  MatCard,
  MatCardHeader,
  MatCardContent,
  MatCardActions,
} from '@angular/material/card';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatError,
    NgIf,
    MatCardActions,
    MatButton,
    TranslateModule,
  ],
})
export class LoginComponent {
  formLogin: FormGroup;

  constructor(
    private fb: FormBuilder,
    private securityService: SecurityService,
    private dataService: DataService,
    private router: Router
  ) {
    this.formLogin = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    // TEST ONLY
    this.formLogin.patchValue({
      username: 'eve.holt@reqres.in',
    });
  }

  login(): void {
    const data = {
      email: this.formLogin.controls['username'].value,
      password: this.formLogin.controls['password'].value,
    } as ILoginReq;

    this.securityService.login(data).subscribe({
      next: (res) => {
        this.dataService.setToken(res.token);
        this.router.navigate(['home']);
      },
      error: (err) => {
        this.dataService.setGeneralNotificationMessage(err);
      },
    });
  }
}
