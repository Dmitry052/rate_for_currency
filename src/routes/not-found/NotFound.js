/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */
/* @flow */
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './NotFound.scss';

type Props = {
  title: string,
};

class NotFound extends React.Component<Props> {
  render() {
    return (
      <div className={s.container}>
        <h1>{this.props.title}</h1>
        <p>Sorry, the page you were trying to view does not exist.</p>
      </div>
    );
  }
}

export default withStyles(s)(NotFound);
