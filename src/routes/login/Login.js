// @flow
import React from 'react';

import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import qs from 'qs';
import history from './../../history';
import s from './Login.scss';
import LoginForm from '../../components/LoginForm';

type Props = {
  title: String,
};

type State = {
  isSignInError: boolean,
  login: string,
  pass: string,
  loader: boolean,
};

class Login extends React.Component<Props, State> {
  static contextTypes = {
    routesPrefix: PropTypes.string,
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      isSignInError: false,
      login: '',
      pass: '',
      loader: false,
    };
  }

  componentWillMount() {
    if (history) {
      const signin = qs.parse(history.location.search.split('?')[1]);

      if (signin.status === 'false') {
        // TODO: alert about error
      }
    }
  }

  componentDidMount() {
    if (typeof document !== 'undefined') {
      const element = document.getElementById('loader');
      if (element) {
        element.remove();
      }
    }
  }

  handleInputData = (e: SyntheticEvent<HTMLInputElement>) => {
    if (e.target) {
      const { target } = e;
      if (target.type === 'text') {
        this.setState({
          login: target.value,
        });
      } else if (target.type === 'password') {
        this.setState({
          pass: target.value,
        });
      }
    }
  };

  handleSignIn = e => {
    const login: Array<string> = this.state.login.match(/[0-9a-zA-Z]{5,}/g);
    const pass: Array<string> = this.state.pass.match(/[0-9a-zA-Z!@#$%^&*]{6,}/g);

    this.setState({
      loader: true,
    });

    if (!login || !pass) {
      e.preventDefault();
      this.setState({
        isSignInError: true,
        loader: false,
      });
    }

    if (login && pass && typeof document !== 'undefined') {
      localStorage.setItem('user', login ? login[0] : null);
    }
  };

  render() {
    return (
      <div className={s.container}>
        <LoginForm
          handleInputData={this.handleInputData}
          onSubmit={this.handleSignIn}
          hasError={this.state.isSignInError}
          login={this.state.login}
          pass={this.state.pass}
          title={this.props.title}
          loader={this.state.loader}
        />
      </div>
    );
  }
}

export default withStyles(s)(Login);
