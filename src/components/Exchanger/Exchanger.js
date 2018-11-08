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
  constructor() {
    super();

    this.state = {
      part: [''],
    };
  }
  componentDidMount() {
    if (typeof document !== 'undefined') {
      const element = document.getElementById('loader');
      if (element) {
        element.remove();
      }
    }

    this.updateRender();
    window.addEventListener('resize', this.updateRender);

    const { currency } = this.props;
    // TODO: request to API
    const cross = this.getCrossing(currency);
    this.props.setCross(cross);
  }

  getCrossing = (currency: Array<string>) => {
    const cross: Array<Array<string>> = [];
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

  getResultRow = (
    item: Array<string>,
    cross: Array<Array<string>>,
    i: number,
    result: Array<Component>,
    rate: Object<{}>,
    startIndex: number = 0,
    rowLen: number,
  ) => {
    let j = 0;

    while (j <= item.length && j <= startIndex + rowLen) {
      if (j === 1) {
        j += startIndex;
      }

      const from = cross[i][0];
      const to = cross[0][j];

      if (from && to) {
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
      }
      j += 1;
    }
  };

  // Set index rate
  handleChangeRate = (e: Event) => {
    if (e.target) {
      const field = e.target.getAttribute('field');
      const { value } = e.target;

      this.props.setPairRate(field, value);
    }
  };

  updateRender = e => {
    let innerWidth = 0;
    if (e && e.target) {
      innerWidth = e.target.innerWidth;
    } else {
      innerWidth = window.innerWidth;
    }

    if (innerWidth >= 992 && innerWidth <= 1200) {
      this.setState({
        part: ['', ''],
      });
    } else if (innerWidth >= 767 && innerWidth < 992) {
      this.setState({
        part: ['', '', ''],
      });
    } else if (innerWidth >= 541 && innerWidth < 767) {
      this.setState({
        part: ['', '', '', ''],
      });
    } else if (innerWidth >= 320 && innerWidth < 541) {
      this.setState({
        part: ['', '', '', '', ''],
      });
    } else if (innerWidth > 993) {
      this.setState({
        part: [''],
      });
    }
  };

  render() {
    const { cross, rate, currency } = this.props;
    let startIndex = 0;
    return (
      <div className="container">
        {this.state.part.map((value, index) => {
          // Length current row
          const rowLen = currency.length - this.state.part.length + 1;

          // Index start column
          if (index !== 0) {
            startIndex += rowLen;
          }

          return (
            <div className={s.cross}>
              {cross.map((item, i) => {
                const result = [];
                this.getResultRow(item, cross, i, result, rate, startIndex, rowLen);

                return result.length > 1 ? <div className={s.row}>{result}</div> : null;
              })}
            </div>
          );
        })}
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
