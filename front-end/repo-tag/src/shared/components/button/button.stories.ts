import { CommonModule } from '@angular/common';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { ButtonComponent } from './button.component';

export default {
  title: 'Atoms/Button',
  component: ButtonComponent,
  decorators: [
    moduleMetadata({
      declarations: [ButtonComponent],
      imports: [CommonModule],
    }),
  ],
} as Meta;

const Template: Story<ButtonComponent> = (args) => ({
  component: ButtonComponent,
  props: {
    ...args,
  },
  template: `
    <div style="padding: 1rem">
        <app-button>
            Registrar
        </app-button>
    </div>
    `,
});

export const Button = Template.bind({});
Button.args = {};
