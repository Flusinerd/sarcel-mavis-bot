import { InputComponent } from '../src/lib/input/input.component';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { InputModule } from '../src';

export default {
  title: 'Components/Input/BaseInput',
  component: InputComponent,
  decorators: [
    moduleMetadata({
      imports: [InputModule]
    }),
  ],
  argTypes: {
    onChange: { action: 'changed' },
    onTouched: { action: 'touched' },
  }
} as Meta;

const template: Story = (args) => ({
  props: args,
});

export const Default = template.bind({});
Default.args = {
  label: 'Label',
  placeholder: 'Placeholder',
  type: 'text',
  value: '',
}

export const Disabled = template.bind({});
Disabled.args = {
  label: 'Label',
  placeholder: 'Placeholder',
  type: 'text',
  value: '',
  _disabled: true,
}

export const WithError = template.bind({});
WithError.args = {
  label: 'Label',
  placeholder: 'Placeholder',
  type: 'text',
  value: '',
  hasError: true,
}
