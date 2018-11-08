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
import s from './Footer.scss';
import { Link } from '../Link';

class Footer extends React.Component {
  render() {
    return (
      <footer className={s.container}>
        <Link to="/statistic">footer</Link>
      </footer>
    );
  }
}

export default withStyles(s)(Footer);
