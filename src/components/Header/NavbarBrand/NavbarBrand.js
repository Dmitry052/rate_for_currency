import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './NavbarBrand.scss';

import { Link } from '../../Link';

class NavbarBrand extends React.Component {
  render() {
    return (
      <Link classes={['navbar-brand']} to="/exchanger">
        Exchanger
      </Link>
    );
  }
}

export default withStyles(s)(NavbarBrand);
