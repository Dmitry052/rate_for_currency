/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Header.scss';

import NavbarBrand from './NavbarBrand';
import MainNav from '../Navigation/MainNav';
import ExtraNav from '../Navigation/ExtraNav';

class Header extends React.Component {
  render() {
    return (
      <header>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark navbar-main" id="navbar-main">
          <div className="container-fluid">
            <NavbarBrand />
            <MainNav />
            <ExtraNav />
          </div>
        </nav>
      </header>
    );
  }
}

export default withStyles(s)(Header);
