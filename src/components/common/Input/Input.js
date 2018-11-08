// @flow
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Input.scss';

type Props = {
  name: string,
  title: string,
  type: string,
  value: string,
  disabled: boolean,
  editIcon: boolean,
  afterValue: string,
  handleEdit: () => void,
  onChange: () => void,
};

const Input = ({
  name = '',
  title = '',
  type = '',
  disabled = false,
  editIcon = false,
  afterValue = '',
  onChange,
  handleEdit,
  value = '',
}: Props) => (
  <div className={s.input}>
    <span>{title}</span>

    {editIcon ? (
      <button type="button" className={s.editIcon} data={name} onClick={handleEdit}>
        &#9998;
      </button>
    ) : null}

    <input
      type={type}
      name={name}
      className="form-control"
      placeholder={`Enter ${title.toLocaleLowerCase()}`}
      disabled={disabled}
      onChange={onChange}
      value={value}
    />

    {afterValue !== '' ? <span className={s.afterTitle}>{afterValue}</span> : null}
  </div>
);

export default withStyles(s)(Input);
