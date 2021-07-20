import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from '../view-models/login';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { User } from '../view-models/user';
import { UserCreate } from '../view-models/user-create';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  constructor(private http: HttpClient) { }

  login(login: Login): Observable<{ token: string, user: User }> {
    return this.http.post<{ token: string, user: User }>(
      `${environment.apiUrl}/user/login`,
      login
    );
  }

  auth(): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/user/auth`);
  }

  create(userCreate: UserCreate) {
    return this.http.post<User>(
      `${environment.apiUrl}/user`,
      userCreate
    );
  }
}
