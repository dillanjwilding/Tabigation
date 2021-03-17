import * as React from 'react'
import Tabigation, { ITabigationProps } from './index'
import { Story, Meta } from '@storybook/react/types-6-0';

export default {
  title: 'Example/Tabigation',
  component: Tabigation,
  argTypes: {}
} as Meta;
const Template: Story<ITabigationProps> = args => <Tabigation {...args} />;

export const Test = Template.bind({});
Test.args = {
  tabs: {
    'tab-1': {
      label: 'Tab 1',
      count: 5,
      component: () => <div>Tab 1 Content</div>
    },
    tab_2: {
      label: 'Another',
      component: ({ text }: { text: string }) => <div>{text}</div>,
      data: { text: 'Another Tab Content' }
    }
  }
};