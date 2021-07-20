import { CommonModule } from '@angular/common';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { AlertComponent } from './alert.component';

export default {
  title: 'Atoms/Alert',
  component: AlertComponent,
  decorators: [
    moduleMetadata({
      declarations: [AlertComponent],
      imports: [CommonModule],
    }),
  ],
} as Meta;

const Template: Story<AlertComponent> = (args) => ({
  component: AlertComponent,
  props: {
    ...args,
  },
  template: `
    <div style="padding: 1rem">
        <app-alert>
        </app-alert>
    </div>
    `,
});

export const Alert = Template.bind({});
Alert.args = {};
