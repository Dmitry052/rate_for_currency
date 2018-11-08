/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';

export const context = {
  insertCss: (...styles) => {
    const removeCss = styles.map(x => {
      return x._insertCss();
    });
    return () => {
      removeCss.forEach(f => f());
    };
  },
};

class ContextProvider extends React.Component {
  static childContextTypes = {
    insertCss: PropTypes.func,
  };

  getChildContext() {
    return { ...this.props.context };
  }

  render() {
    const { children, ...props } = this.props;
    return React.cloneElement(children, props);
  }
}

export default ContextProvider;
