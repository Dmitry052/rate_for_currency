// @flow
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './Checkbox.scss';

type Props = {
  data: string,
  name: string,
  checked: boolean,
  onChange: () => void,
  reverse: boolean,
};

const Input = ({ name = '', data = '', checked = false, reverse = false, onChange }: Props) => (
  <div className={s.checkbox}>
    {!reverse ? <span className={s.default}>{name}</span> : null}
    <label htmlFor={`checkInp${data}`} className={s.switch}>
      <input
        id={`checkInp${data}`}
        name={data}
        type="checkbox"
        data-toggle="collapse"
        checked={checked}
        onChange={onChange}
      />
      <span className={cx([s.slider, s.round])} />
    </label>
    {reverse ? <span className={s.reverse}>{name}</span> : null}
  </div>
);

export default withStyles(s)(Input);
