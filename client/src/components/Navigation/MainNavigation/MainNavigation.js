import React from 'react';
import { NavLink } from 'react-router-dom';

import MobileToggle from '../MobileToggle/MobileToggle';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

import './MainNavigation.css';

const mainNavigation = props => (
  <nav className="main-nav">
    <MobileToggle onOpen={props.onOpenMobileNav} />
    <div className="main-nav_logo" style={{display: "flex",  justifyContent:"space-between", flexDirection:"row"}}>
      <NavLink to="/">
        <Logo nmae={props.name}/>
      </NavLink>
    </div>
    <div className="spacer" />
    <ul className="main-nav_items">
      <NavigationItems isAuth={props.isAuth} onLogout={props.onLogout} />
    </ul>
  </nav>
);

export default mainNavigation;
