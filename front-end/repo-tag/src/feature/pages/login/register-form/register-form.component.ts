import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserCreate } from 'src/feature/view-models/user-create';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
  @Output()
  onClose = new EventEmitter();

  @Output()
  onSubmit = new EventEmitter<UserCreate>();

  userCreateForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
    // To do: +validations (sync: email, password/confirmPass) (async: github username)
    // To do: validations error messages
    this.userCreateForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      gitHubUsername: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required)
    })
  }

  submitForm(): void {
    const registerFormValue = this.userCreateForm.value;
    const userCreate: UserCreate = {
      name: registerFormValue.name,
      email: registerFormValue.email,
      hostingPlatformUsername: registerFormValue.gitHubUsername,
      password: registerFormValue.password
    }
    this.onSubmit.emit(userCreate);
  }

  close() {
    this.onClose.emit();
  }
}
