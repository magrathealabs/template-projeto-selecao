import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/feature/services/auth.service';
import { UserStoreService } from 'src/feature/state/user-store.service';
import { User } from 'src/feature/view-models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user$: Observable<User> = null;

  constructor(
    private userStore: UserStoreService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.user$ = this.userStore.getUserLogged();
  }

  logout(): void {
    this.authService.logout();
  }
}
