import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { ButtonComponent } from 'src/shared/components/button/button.component';
import { InputComponent } from 'src/shared/components/input/input.component';
import { LoginFormComponent } from './login-form.component';

export default {
  title: 'Molecules/Forms/Login',
  component: LoginFormComponent,
  decorators: [
    moduleMetadata({
      declarations: [ButtonComponent, InputComponent, LoginFormComponent],
      imports: [CommonModule, ReactiveFormsModule, FormsModule],
    }),
  ],
} as Meta;

const Template: Story<LoginFormComponent> = (args) => ({
  component: LoginFormComponent,
  props: {
    ...args,
  },
  template: `
    <div style="padding: 1rem">
        <app-login-form>
        </app-login-form>
    </div>
    `,
});

export const Login = Template.bind({});
Login.args = {};
