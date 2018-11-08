/* @flow */
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './LoginForm.scss';

type Props = {
  title: string,
  handleInputData: (data: string) => void,
  onSubmit: (e: Event) => void,
  hasError: boolean,
  login: string,
  pass: string,
  loader: boolean,
};

class LoginForm extends React.Component<Props> {
  render() {
    const { handleInputData, onSubmit, hasError, login, pass, title, loader } = this.props;

    return (
      <div className={s.container}>
        <form method="post" action="/auth/login" onSubmit={e => onSubmit(e)}>
          <h1>{title}</h1>
          {hasError && <div className={cx(['alert', 'alert-danger'])}>User login or/and password is incorrect</div>}
          <div className={cx(['form-group'])}>
            <label htmlFor="user">User:</label>
            <input
              id="user"
              type="text"
              name="user"
              className={cx(['form-control'])}
              value={login}
              onChange={handleInputData}
            />
          </div>
          <div className={cx(['form-group'])}>
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              type="password"
              name="password"
              className={cx(['form-control'])}
              value={pass}
              onChange={handleInputData}
            />
          </div>
          <div className={cx(['form-group'])}>
            <button type="submit" className={cx(['btn', 'btn-success', 'btn-lg'])} disabled={loader}>
              {!loader ? 'Enter' : <div className={s.loader} />}
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default withStyles(s)(LoginForm);
