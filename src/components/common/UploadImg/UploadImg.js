// @flow
import React from 'react';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './UploadImg.scss';

type Props = {
  handleUploadFile: (e: Event) => {},
};

const UploadImg = ({ handleUploadFile }: Props) => (
  <div className={cx(['input-group-append', s.avatarBlock])}>
    <span>Avatar</span>
    <label className={s.logoBlock} htmlFor="uploadImg">
      <img src="/img/logo.svg" alt="user logo" />
      <input hidden type="file" accept="image/*,image/jpeg" id="uploadImg" onChange={handleUploadFile} />
    </label>
  </div>
);

export default withStyles(s)(UploadImg);
