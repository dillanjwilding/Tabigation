// import * as style from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css'
import * as React from 'react';
import { BrowserRouter, NavLink } from 'react-router-dom';

export default class Tabigation extends React.Component<any, any> {
  constructor (props: any) {
    super(props);
    this.state = {}
  }
  public componentWillMount () {
    this.change(this.props.active || Object.keys(this.props.tabs)[0]);
  }
  public render () {
    const { tabs, url } = this.props
    const { active, component, overlay } = this.state
    return (
      <BrowserRouter>
        {!overlay && 
        <ul className='nav nav-tabs nav-fill'>
          {tabs && Object.keys(tabs).map((tab, index) =>
          <li className='nav-item' key={index}>
            <NavLink className='nav-link' onClick={() => this.change(tab)} to={(url ? url : '') + '/' + tab}>
              <span style={{ marginRight: '5px' }}>{tabs[tab].label}</span>
              {tabs[tab].count && tabs[tab].count > 0 &&
              <span className='badge badge-pill badge-danger'>
                {tabs[tab].count}
              </span>}
            </NavLink>
          </li>)}
        </ul>}
        <div id='tabigation-container'>
          {typeof component === 'function' &&
          <this.state.component {...tabs[active].data} />}
        </div>
      </BrowserRouter>
    );
  }
  private change (tab: string) {
    if (this.state.active !== tab && this.props.tabs.hasOwnProperty(tab)) {
      this.setState((state: any, props: any) => ({
        active: tab, component: props.tabs[tab].component
      }));
    }
  }
}
