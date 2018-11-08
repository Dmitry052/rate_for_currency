/* @flow */
import * as React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import history from '../../history';

type Props = {
  to: string,
  children: React.Node,
  onClick: ?(event: Event) => void,
  classes: Array<string>,
  handled: boolean,
};

// function isLeftClickEvent(event) {
//   return event.button === 0;
// }

// function isModifiedEvent(event) {
//   return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
// }

export class Link extends React.Component<Props> {
  static propTypes = {
    to: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
    classes: PropTypes.arrayOf(PropTypes.string),
    handled: PropTypes.bool,
  };

  static contextTypes = {
    routesPrefix: PropTypes.string,
  };

  static defaultProps = {
    onClick: null,
    classes: [],
    handled: true,
  };

  handleClick = (event: Event) => {
    const { to } = this.props;
    const { routesPrefix } = this.context;

    if (!this.props.handled) {
      return;
    }

    if (this.props.onClick) {
      this.props.onClick(event);
    }

    // if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
    //   return;
    // }

    if (event.defaultPrevented === true) {
      return;
    }

    event.preventDefault();
    history.push(`${routesPrefix}${to}`);
  };

  render() {
    const { routesPrefix } = this.context;
    const { to, children, classes } = this.props;
    return (
      <a href={`${routesPrefix}${to}`} onClick={this.handleClick} className={cx([...classes])}>
        {children}
      </a>
    );
  }
}

export default Link;
