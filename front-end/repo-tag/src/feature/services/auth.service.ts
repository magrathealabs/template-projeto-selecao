import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserStoreService } from '../state/user-store.service';
import { Login } from '../view-models/login';
import { User } from '../view-models/user';
import { UserApiService } from './user-api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  TOKEN_STORAGE_KEY = 'token';
  loggedUser: User = null;

  constructor(
    private userApi: UserApiService,
    private router: Router,
    private userStore: UserStoreService
  ) { }

  login(login: Login): void {
    this.userApi.login(login).subscribe(
      ({ token, user }) => {
        this.setLoggedUser(user);
        this.storeToken(token);
        this.router.navigate(['/home'])
      },
      ({ error, status }) => {
        if (status === 404 && error.errorMessage) {
          console.log(error.errorMessage)
        }
      }
    );
  }

  logout(): void {
    this.signout();
  }

  isLogged(): boolean {
    if (this.token) {
      if (!this.loggedUser) {
        return this.auth();
      }
      return true;
    }
    return false;
  }

  get token(): string {
    return localStorage.getItem(this.TOKEN_STORAGE_KEY);
  }

  signout(): void {
    this.userStore.clear();
    this.loggedUser = null;
    localStorage.removeItem(this.TOKEN_STORAGE_KEY);
    this.router.navigate(['/login']);
  }

  private auth() {
    let error = false;
    this.userApi.auth().subscribe(
      (user: User) => this.setLoggedUser(user),
      () => error = true
    );
    return !error;
  }

  private setLoggedUser(user: User) {
    this.loggedUser = user;
    this.userStore.setUserLogged(user);
  }

  private storeToken(token: string): void {
    localStorage.setItem(this.TOKEN_STORAGE_KEY, token);
  }
}
