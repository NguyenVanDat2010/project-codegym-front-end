import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
<<<<<<< HEAD
import { Observable, throwError } from 'rxjs';
import { LocalStorageService } from 'ngx-webstorage';
import { LoginRequestPayload } from '../login/login-request.payload';
import { LoginResponse } from '../login/login-response';
=======
import { SignupRequestPayload } from '../../model/auth/signup.payload';
import { Observable, throwError } from 'rxjs';
import { LocalStorageService } from 'ngx-webstorage';
import { LoginRequestPayload } from '../../model/auth/login-request.payload';
import { LoginResponse } from '../../model/auth/login-response.payload';
>>>>>>> origin/dev
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  @Output() username: EventEmitter<string> = new EventEmitter();

  refreshTokenPayload = {
    refreshToken: this.getRefreshToken(),
    username: this.getUserName(),
  };

  constructor(
    private httpClient: HttpClient,
    private localStorage: LocalStorageService
  ) {}
<<<<<<< HEAD

  // signup(signupRequestPayload: SignupRequestPayload): Observable<any> {
  //   return this.httpClient.post(
  //     'http://localhost:8080/api/auth/signup',
  //     signupRequestPayload,
  //     { responseType: 'text' }
  //   );
  // }
=======
  signup(signupRequestPayload: SignupRequestPayload): Observable<any> {
    return this.httpClient.post(
      environment.URL + 'api/auth/signup',
      signupRequestPayload,
      {
        responseType: 'text',
      }
    );
  }
>>>>>>> origin/dev

  login(loginRequestPayload: LoginRequestPayload): Observable<boolean> {
    return this.httpClient
      .post<LoginResponse>(
        'http://localhost:8080/api/auth/login',
        loginRequestPayload
      )
      .pipe(
        map((data) => {
          this.localStorage.store(
            'authenticationToken',
            data.authenticationToken
          );
          this.localStorage.store('username', data.username);
          this.localStorage.store('refreshToken', data.refreshToken);
          this.localStorage.store('expiresAt', data.expiresAt);
<<<<<<< HEAD

=======
>>>>>>> origin/dev
          this.loggedIn.emit(true);
          this.username.emit(data.username);
          return true;
        })
      );
  }

  getJwtToken() {
    return this.localStorage.retrieve('authenticationToken');
  }

  refreshToken() {
<<<<<<< HEAD
    console.log('refresh token is called');
    console.log(this.refreshTokenPayload);
=======
>>>>>>> origin/dev
    return this.httpClient
      .post<LoginResponse>(
        'http://localhost:8080/api/auth/refresh/token',
        this.refreshTokenPayload
      )
      .pipe(
        tap((response) => {
<<<<<<< HEAD
          console.log('this is the response');
          console.log(response);
=======
>>>>>>> origin/dev
          this.localStorage.clear('authenticationToken');
          this.localStorage.clear('expiresAt');

          this.localStorage.store(
            'authenticationToken',
            response.authenticationToken
          );
          this.localStorage.store('expiresAt', response.expiresAt);
        })
      );
  }

  logout() {
    this.httpClient
      .post('http://localhost:8080/api/auth/logout', this.refreshTokenPayload, {
        responseType: 'text',
      })
      .subscribe(
        (data) => {
          console.log(data);
        },
        (error) => {
          throwError(error);
        }
      );
    this.localStorage.clear('authenticationToken');
    this.localStorage.clear('username');
    this.localStorage.clear('refreshToken');
    this.localStorage.clear('expiresAt');
  }

  getUserName() {
    return this.localStorage.retrieve('username');
  }
  getRefreshToken() {
    return this.localStorage.retrieve('refreshToken');
  }

  isLoggedIn(): boolean {
    return this.getJwtToken() != null;
  }
}
