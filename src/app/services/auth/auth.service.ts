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
          if (response.accessToken) {
            localStorage.setItem(Tokens.ACCESS_TOKEN, JSON.stringify(response.accessToken));
            this.accessToken = response.accessToken;
            this.currentUser = this.helper.decodeToken(response.accessToken);
            this.getCurrentUser.emit(
              this.helper.decodeToken(response.accessToken)
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
}
