import * as React from 'react';
import { NavLink } from 'react-router-dom';
import * as style from 'bootstrap';

export default class Tabigation extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }
  componentWillMount() {
    this.change(this.props.active || Object.keys(this.props.tabs)[0]);
  }
  private change(tab: string) {
    if (this.state.active !== tab && this.props.tabs.hasOwnProperty(tab)) {
      this.setState((state: any, props: any) => ({
        active: tab,
        component: props.tabs[tab].component
      }));
    }
  }
  public render() {
    return (
      <React.Fragment>
        {!this.state.overlay && 
        <ul> {/* className={`${style.nav} ${style['nav-pills']}`} */}
          {this.props.tabs && Object.keys(this.props.tabs).map((tab, index) =>
          <li key={index}> {/* className={style['nav-item']} */}
            <NavLink onClick={() => this.change(tab)} to={(this.props.url ? this.props.url : '') + '/' + tab}>
              {this.props.tabs[tab].label}
              {this.props.tabs[tab].count && this.props.tabs[tab].count > 0 &&
              <span className={``}>
                {this.props.tabs[tab].count}
              </span>}
            </NavLink>
          </li>)}
        </ul>}
        <div id='tabigation-container'>
          {typeof this.state.component === 'function' &&
          <this.state.component data={this.props.tabs[this.state.active].data} />}
        </div>
      </React.Fragment>
    );
  }
}
