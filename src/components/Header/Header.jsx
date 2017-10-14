import React from 'react';
import { Link, IndexLink } from 'react-router';

import './header.scss';

const Header = () => { 

  return (
    <header className="header clearfix">
      <div className="container clearfix">
        <IndexLink to={'/'} className="header__logo">
          <h1>Invoice App</h1>
        </IndexLink>
        <ul className="header__nav">
          <li className="header__nav-item">
            <IndexLink to={'/'} activeClassName="header__nav-link--active" className="header__nav-link">Customers</IndexLink>
          </li>
          <li className="header__nav-item">
            <Link to={'/products'} activeClassName="header__nav-link--active" className="header__nav-link">Products</Link>
          </li>
          <li className="header__nav-item">
            <Link to={'/Invoices'} activeClassName="header__nav-link--active" className="header__nav-link">invoices</Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
