import {EventEmitter, Injectable, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Credentials, JwtToken, User} from '../../models';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';
import {Tokens} from '../../enums';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  accessToken: string | undefined;
  returnUrl = '';
  helper = new JwtHelperService();
  currentUser = new User();
  @Output() getCurrentUser: EventEmitter<any> = new EventEmitter();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
  ) {
  }

  login(credentials: Credentials): Observable<JwtToken> {
    return this.http.post<JwtToken>(
      `${environment.apiURL}users/login`, credentials
    ).pipe(
      map(response => {
        if (response) {
          if (response.token) {
            localStorage.setItem(Tokens.ACCESS_TOKEN, JSON.stringify(response.token));
            this.accessToken = response.token;
            this.currentUser = this.helper.decodeToken(response.token);
            this.getCurrentUser.emit(
              this.helper.decodeToken(response.token)
            );
          }
        }
        return response;
      })
    );
  }

  getLoggedInUser(): User {
    return this.helper.decodeToken(this.getAccessToken());
  }

  public getAccessToken(): string {
    return JSON.parse(localStorage.getItem(Tokens.ACCESS_TOKEN) as string);
  }

  logout(): void {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/login';
    this.currentUser = new User();
    this.accessToken = '';
    localStorage.clear();
    this.getCurrentUser.emit();
    this.router.navigate([this.returnUrl]).finally(() => {
      console.log('_____Logging out_______');
    });
  }

}
