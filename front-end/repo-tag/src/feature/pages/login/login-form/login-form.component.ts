import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Login } from '../../../view-models/login';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  @Output()
  onLogin = new EventEmitter<Login>();

  loginForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
    // To do: validations error messages
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    })
  }

  login() {
    this.onLogin.emit({
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value
    })
  }

}
