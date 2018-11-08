// @flow
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Dropdown.scss';

type Props = {
  data: Array<string>,
  title: string,
  value: string,
  onChangeData: () => void,
};
const Dropdown = ({ title = '', data = [], value = '', onChangeData }: Props) => (
  <div className={s.dropdownBlock}>
    <span>{title}</span>
    <select className="form-control" onChange={onChangeData} value={value}>
      {data.map(
        (item: string): React$Element<string> => (
          <option key={`filter-${item}`} value={item}>
            {item}
          </option>
        ),
      )}
    </select>
  </div>
);

export default withStyles(s)(Dropdown);
