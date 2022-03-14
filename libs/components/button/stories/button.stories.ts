import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { ButtonModule } from '../src';

export default {
  title: 'Components/Button',
  decorators: [
    moduleMetadata({
      imports: [ButtonModule]
    }),
  ],
  argTypes: {
    onClick: { action: 'clicked' },
  },
} as Meta;

const template: Story = (args) => ({
  template: `<sarcel-mavis-button [loading]='loading' [disabled]='disabled'>{{content}}</sarcel-mavis-button>`,
  props: args,
});

export const Default = template.bind({});
Default.args = {
  content: 'Button'
};

export const Loading = template.bind({});
Loading.args = {
  content: 'Button',
  loading: true
};

export const Disabled = template.bind({});
Disabled.args = {
  content: 'Disabled Button',
  disabled: true
};
