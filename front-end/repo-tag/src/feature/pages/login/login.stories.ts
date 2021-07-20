import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { ButtonComponent } from 'src/shared/components/button/button.component';
import { InputComponent } from 'src/shared/components/input/input.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { LoginComponent } from './login.component';
import { RegisterFormComponent } from './register-form/register-form.component';

export default {
  title: 'Templates/Login',
  component: LoginComponent,
  decorators: [
    moduleMetadata({
      declarations: [
        ButtonComponent,
        InputComponent,
        LoginFormComponent,
        RegisterFormComponent,
        LoginComponent
      ],
      imports: [CommonModule, BrowserAnimationsModule, ReactiveFormsModule, FormsModule],
    }),
  ],
} as Meta;

const Template: Story<LoginComponent> = (args) => ({
  component: LoginComponent,
  props: {
    ...args,
  }
});

export const Login = Template.bind({});
Login.args = {};
