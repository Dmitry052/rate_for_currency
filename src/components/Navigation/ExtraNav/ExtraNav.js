/* @flow */
import React from 'react';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ExtraNav.scss';
import { Link } from '../../Link';

type Props = {
  classes: Array<string>,
  showMenu: boolean,
  handleUserMenu: (status: boolean) => {},
};

class ExtraNav extends React.Component<Props> {
  static defaultProps = {
    classes: ['ml-auto'],
  };

  componentWillUnmount() {
    localStorage.clear();
  }

  handleShowUserMenu = () => {
    this.props.handleUserMenu(!this.props.showMenu);
  };

  render() {
    const classes = [['navbar-nav', 'extra-nav'], ...this.props.classes];

    return (
      <ul className={cx(classes)}>
        <li className="nav-item">
          <Link to="/auth/logout" classes={['nav-link']} handled={false}>
            Log Out
          </Link>
        </li>
      </ul>
    );
  }
}

export default withStyles(s)(ExtraNav);
