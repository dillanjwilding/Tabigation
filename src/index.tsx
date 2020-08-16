// import * as style from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css'
import * as React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter, NavLink } from 'react-router-dom';

type TabigationProps = {
  tabs: any,
  url: string
}

const Tabigation = ({ tabs, url }: TabigationProps) => {
  const [active, setActive] = useState('')
  const [component, setComponent] = useState('')
  const [overlay, setOverlay] = useState()

  const change = (tab: string) => {
    if (active !== tab && tabs.hasOwnProperty(tab)) {
      setActive(tab)
      setComponent(tabs[tab].component.ElementType)
    }
  }

  useEffect(() => {
    change(active || Object.keys(tabs)[0])
  })

  return (
    <BrowserRouter>
      {!overlay && 
      <ul className='nav nav-tabs nav-fill'>
        {tabs && Object.keys(tabs).map((tab, index) =>
        <li className='nav-item' key={index}>
          <NavLink className='nav-link' onClick={() => change(tab)} to={(url ? url : '') + '/' + tab}>
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
        <component {...tabs[active].data} />}
      </div>
    </BrowserRouter>
  )
}
export default Tabigation
