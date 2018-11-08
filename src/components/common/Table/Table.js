// @flow
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Table.scss';

type Props = {
  indexRow: boolean,
  head: Array<string>,
  body: Array<Array<string>>,
  classes: string,
};

const Table = ({ indexRow = false, head = [], body = [], classes = '' }: Props) => (
  <table className={`table ${classes}`}>
    <thead>
      <tr>
        {indexRow ? <th scope="col">#</th> : null}

        {head.map((item, i) => {
          const index = i;
          return (
            <th key={`${item}-${index}`} scope="col">
              {item}
            </th>
          );
        })}
      </tr>
    </thead>
    <tbody>
      {body.map((item, i) => {
        const indexTR = i;
        const style = 'default';
        return (
          <tr key={`tr-${indexTR}`} className={`table-${style}`}>
            {indexRow ? <th scope="row">{indexTR + 1}</th> : null}

            {item.map((value, j) => {
              const indexTD = j;
              return <td key={`td-${indexTR}-${indexTD}`}>{value}</td>;
            })}
          </tr>
        );
      })}
    </tbody>
  </table>
);

export default withStyles(s)(Table);
