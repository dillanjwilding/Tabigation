// @todo: Remove bootstrap
// import * as style from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import * as React from 'react';
import { BrowserRouter, NavLink } from 'react-router-dom';

export interface ITab {
  /**
   * Text displayed within a Tab.
   */
  label: string;
  /**
   * Notification count displayed in a bubble in the Tab's upper corner.
   */
  count?: number;
  /**
   * 
   */
  component: any;
  /**
   * Data to be passed into the Tab's component to display the content.
   */
  data?: any;
}
interface ITabList {
  [key: string]: ITab;
}
export interface ITabigationProps {
  /**
   * Array/list of Tabs that are displayed. Each have type ITab.
   */
  tabs: ITabList;
  /**
   * 
   */
  url?: string;
  /**
   * Which Tab is active active by default during initialization; determines which one out of the list is highlighted and contents displayed.
   */
  active?: string;
}
interface ITabigationState {
  /**
   * Which Tab is active; determines which one out of the list is highlighted and contents displayed.
   */
  active?: any;
  /**
   * Component to display Tab's content.
   */
  component?: any;
  /**
   * 
   */
  overlay?: any;
}
/**
 * Primary UI component for Tabigation. It orchestrates displaying Tabs, the UI/UX of selecting a Tab and displaying a Tab's content.
 */
export default class Tabigation extends React.Component<ITabigationProps, ITabigationState> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }
  public componentWillMount() {
    this.change(this.props.active || Object.keys(this.props.tabs)[0]);
  }
  public render() {
    const { tabs, url } = this.props;
    const { active, component, overlay } = this.state;
    return (
      <BrowserRouter>
        {!overlay && (
          <ul className="nav nav-tabs nav-fill">
            {tabs && Object.keys(tabs).map((tab: string, index) => {
              return (
                <li className="nav-item" key={index}>
                  <NavLink className="nav-link" onClick={() => this.change(tab)} to={(url ? url : '') + '/' + tab}>
                    <span style={{ marginRight: '5px' }}>{tabs[tab].label}</span>
                    {tabs[tab]?.count || 0 > 0 && (
                      <span className="badge badge-pill badge-danger">{tabs[tab].count}</span>
                    )}
                  </NavLink>
                </li>
              )})}
          </ul>
        )}
        <div id="tabigation-container">
          {typeof component === 'function' && <this.state.component {...tabs[active].data} />}
        </div>
      </BrowserRouter>
    );
  }
  private change(tab: string) {
    if (this.state.active !== tab && this.props.tabs.hasOwnProperty(tab)) {
      this.setState((state: any, props: any) => ({
        ...state,
        active: tab,
        component: props.tabs[tab].component,
      }));
    }
  }
}
