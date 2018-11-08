/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */
/* @flow */

import * as React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// external-global styles must be imported in your JS.
import bootstrap from 'bootstrap/dist/css/bootstrap.min.css';
import nouislider from 'nouislider/distribute/nouislider.min.css';

import common from '../Styles/common.scss';
import s from './Layout.scss';
import Header from '../Header';
// import Footer from '../Footer';

type Props = {
  children: React.Node,
  header: boolean,
  // footer: boolean,
};

class Layout extends React.Component<Props> {
  static defaultProps = {
    header: true,
    footer: true,
  };

  render() {
    return (
      <div>
        {this.props.header ? <Header /> : null}
        {this.props.children}
        {/* {this.props.footer ? <Footer /> : null} */}
      </div>
    );
  }
}

export default withStyles(nouislider, bootstrap, common, s)(Layout);
