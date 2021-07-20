import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/feature/services/auth.service';
import { UserApiService } from 'src/feature/services/user-api.service';
import { Login } from 'src/feature/view-models/login';
import { UserCreate } from 'src/feature/view-models/user-create';
import { fadeInAnimation } from 'src/shared/animations/fade-in';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [fadeInAnimation]
})
export class LoginComponent implements OnInit {
  registerVisible = false;

  constructor(
    private authService: AuthService,
    private userApi: UserApiService
  ) { }

  ngOnInit(): void {
  }

  login(login: Login): void  {
    // To do: deal w/ errs
    this.authService.login(login);
  }

  createUser(userCreate: UserCreate): void {
    // To do: deal w/ errs
    this.userApi.create(userCreate)
      .subscribe(() => {
        this.registerVisible = false;
      });
  }

  toggleRegisterVisibility(): void  {
    this.registerVisible = !this.registerVisible
  }
}
