/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */
//  @flow

import React from 'react';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
// import { Link } from '../../Link';
import s from './MainNav.scss';

class MainNav extends React.Component {
  render() {
    return (
      <ul className={cx(['navbar-nav', 'main-nav', 'mr-auto'])}>
        {/* <li className={cx(['nav-item'])}>
          <Link to="/account/trade" classes={['nav-link', 'active']}>
            Trade
          </Link>
        </li> */}
      </ul>
    );
  }
}

export default withStyles(s)(MainNav);
