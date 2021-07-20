import { CommonModule } from '@angular/common';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { InputComponent } from './input.component';

export default {
  title: 'Atoms/Input',
  component: InputComponent,
  decorators: [
    moduleMetadata({
      declarations: [InputComponent],
      imports: [CommonModule],
    }),
  ],
  argTypes: {
    value: {
      table: { disable: true },
    },
  },
} as Meta;

const Template: Story<InputComponent> = (args) => ({
  component: InputComponent,
  props: {
    ...args,
  },
  template: `
    <div style="padding: 1rem">
        <app-input
          [label]="label"
          [value]="value"
          [placeholder]="placeholder"
          [width]="width"
        >
        </app-input>
    </div>
    `,
});

export const Input = Template.bind({});
Input.args = {
  placeholder: 'Digite...',
};
