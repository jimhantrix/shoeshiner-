import React from 'react';
import { NavLink } from 'react-router-dom';

const mainNavigation = props => (
  <header>

    <div className ="main-navigation_logo">
      <h1> Shoeshiner </h1>
    </div>

    <nav className = 'main-navigation_item'>
    
      <ul>
        <li><NavLink> to="/auth">Aunthenticate</NavLink></li>
        <li><NavLink> to="/events">Events</NavLink></li>
        <li><NavLink> to="/auth">Bookings</NavLink></li>
      </ul>

    </nav>

  </header>
);

export deafault mainNavigation;
