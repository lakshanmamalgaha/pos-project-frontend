import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {NgbAlert} from '@ng-bootstrap/ng-bootstrap';
import {AuthService} from '../services/auth/auth.service';
import {Credentials} from '../models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.minLength(8), Validators.required])
  });
  errors = '';
  @ViewChild('selfClosingAlert', {static: false}) selfClosingAlert: NgbAlert | undefined;


  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
  }

  login(value: any): void {
    if (this.loginForm.valid) {
      const credentials = {
        email: value.email.toLowerCase(),
        password: value.password
      } as Credentials;

      this.authService.login(credentials).subscribe(next => {
          if (next) {
            this.router.navigateByUrl('/').finally();
          }
        },
        error => {
          console.log(error);
          if (error.status === 401) {
            this.errors = 'Invalid email and/or password!';
          } else if (error.status === 500) {
            this.errors = 'Internal server error!';
          }
        });
    }
  }

}
