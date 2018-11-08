// @flow
import React from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Rate from './Rate/Rate';
import s from './Exchanger.scss';

import { setCross, setPairData, setPairRate } from './../../actions/exchanger';

type Props = {
  rate: Object,
  cross: Array<Array<string>>,
  currency: Array<string>,
  setCross: (Array<Array<string>>) => void,
  setPairData: (pair: string, data: Object) => void,
  setPairRate: (pair: string, data: string) => void,
};

class Exchanger extends React.Component<Props> {
  componentDidMount() {
    if (typeof document !== 'undefined') {
      const element = document.getElementById('loader');
      if (element) {
        element.remove();
      }
    }

    const { currency } = this.props;
    // TODO: request to API
    const cross = this.getCrossing(currency);
    this.props.setCross(cross);
  }

  getCrossing = (currency: Array<string>) => {
    const cross = [];
    let index = 0;

    // X
    while (index <= currency.length) {
      if (index === 0 && cross.length === 0) {
        const row = ['From/To', ...currency];
        cross.push(row);
      } else {
        const row = [];
        let j = 0;
        // Y
        // 'currency' can be any array of currency
        while (j <= currency.length) {
          if (j === 0) {
            row.push(currency[index - 1]);
          } else {
            const from = row[0];
            const to = cross[0][j];

            // ###############################
            // Creacte object from redux store
            if (from !== to) {
              const dataFromAPI = {};
              this.props.setPairData(`${from}/${to}`, dataFromAPI);
            }
            // ###############################
            row.push('');
          }
          j += 1;
        }
        cross.push(row);
      }
      index += 1;
    }

    return cross;
  };

  handleChangeRate = (e: Event) => {
    if (e.target) {
      const field = e.target.getAttribute('field');
      const { value } = e.target;

      this.props.setPairRate(field, value);
    }
  };

  render() {
    const { cross, rate } = this.props;

    return (
      <div className="container">
        <div className="row">
          <div className={s.cross}>
            {cross.map((item, i) => {
              const result = [];
              item.forEach((item2, j) => {
                const from = cross[i][0];
                const to = cross[0][j];

                if (i > 0 && from === to) {
                  result.push(<Rate key={`node-${from}-${to}`} empty value={cross[i][j]} />);
                } else {
                  result.push(
                    <Rate
                      key={`node-${from}-${to}`}
                      indexX={i}
                      from={from}
                      to={to}
                      data={rate[`${from}/${to}`]}
                      value={cross[i][j]}
                      handleChangeRate={this.handleChangeRate}
                    />,
                  );
                }
              });
              return result;
            })}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currency: state.exchanger.currency,
  cross: state.exchanger.cross,
  rate: state.exchanger.rate,
});

export default connect(
  mapStateToProps,
  { setCross, setPairData, setPairRate },
)(withStyles(s)(Exchanger));
