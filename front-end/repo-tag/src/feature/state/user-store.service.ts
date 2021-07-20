import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../view-models/user';

export interface State {
  userLogged: User;
}

const initialState: State = {
  userLogged: null,
};

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {
  private subject = new BehaviorSubject<State>(initialState);
  private store = this.subject.asObservable();

  constructor() { }

  get value() {
    return this.subject.value;
  }

  setUserLogged(user: User) {
    this.subject.next({
      ...this.value,
      userLogged: user,
    });
  }

  clear() {
    this.subject.next(initialState);
  }

  public getUserLogged(): Observable<User> {
    return this.store.pipe(map((store) => store.userLogged));
  }
}
