import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { ButtonComponent } from 'src/shared/components/button/button.component';
import { InputComponent } from 'src/shared/components/input/input.component';
import { RegisterFormComponent } from './register-form.component';

export default {
  title: 'Molecules/Forms/Register',
  component: RegisterFormComponent,
  decorators: [
    moduleMetadata({
      declarations: [ButtonComponent, InputComponent, RegisterFormComponent],
      imports: [CommonModule, ReactiveFormsModule, FormsModule],
    }),
  ],
} as Meta;

const Template: Story<RegisterFormComponent> = (args) => ({
  component: RegisterFormComponent,
  props: {
    ...args,
  },
  template: `
    <div style="padding: 1rem">
        <app-register-form>
        </app-register-form>
    </div>
    `,
});

export const Register = Template.bind({});
Register.args = {};
