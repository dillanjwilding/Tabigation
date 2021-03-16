import React from 'react'
import { render } from 'react-dom'
import Tabigation from '../src/index'

render(<Tabigation tabs={{
  'tab-1': {
    label: 'Tab 1',
    count: 5,
    component: () => <div>Tab 1 Content</div>
  },
  tab_2: {
    label: 'Another',
    component: ({ text }) => <div>{text}</div>,
    data: { text: 'Another Tab Content' }
  }
}} />, document.getElementById('root'))
