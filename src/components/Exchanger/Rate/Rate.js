// @flow
import React, { Fragment } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './Rate.scss';

import Icon from './../Icon/Icon';
import localFormat from './localFormat';

type Props = {
  empty: boolean,
  value: string,
  from: string,
  to: string,
  data: Object,
  handleChangeRate: (e: Event) => void,
  indexX: number,
};

class Node extends React.Component<Props> {
  getCalc = (data, from, to) => {
    if (data[from.toLocaleLowerCase()] && data[to.toLocaleLowerCase()]) {
      const fromValue = data[from.toLocaleLowerCase()];
      const toValue = data[to.toLocaleLowerCase()];

      return toValue * data.rate - fromValue;
    }
    return '';
  };

  render() {
    const { empty = false, value = '', data = {}, from = '', to = '', handleChangeRate, indexX } = this.props;
    const rate = data.history ? data.history.rate : '';
    const fromValue = `${from}: $${data[from.toLocaleLowerCase()] || ''}`;
    const toValue = `${to}: $${data[to.toLocaleLowerCase()] || ''}`;
    const calc = this.getCalc(data, from, to);

    return (
      <div
        className={cx([
          s.node,
          indexX === 0 ? s.header : '',
          calc > 0 ? s.up : '',
          calc < 0 ? s.down : '',
          calc === 0 ? s.middle : '',
          empty ? s.empty : '',
          value !== '' ? s.labels : '',
        ])}
      >
        {!empty && value === '' ? (
          <div className={s.data}>
            <span>
              {`${from}`} &rarr; {`${to}`}
            </span>

            <div className={s.rate}>
              <sub>Last</sub>
              <span>{rate}</span>
              <sub>Current</sub>
              <input type="number" field={`${from}/${to}`} value={data.rate} onChange={handleChangeRate} />
            </div>

            <div className="dropdown-divider" />

            <div className={s.info}>
              <div className={s.course}>
                <span>Exchange rate</span>

                <div>
                  <span>{fromValue}</span>

                  <span>{toValue}</span>
                </div>
              </div>

              <div className={s.calc}>
                <span>Calculated</span>
                <span>{`$${localFormat.set('ru-RU', calc, 2)}`}</span>
              </div>
            </div>
          </div>
        ) : (
          <Fragment>
            <Icon type={value} /> {value}
          </Fragment>
        )}
      </div>
    );
  }
}

export default withStyles(s)(Node);
