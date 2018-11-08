import React from 'react';
import Layout from '../../components/Layout';
import Exchanger from './Exchanger';

const title = 'Exchanger';
const description = 'Exchanger';

function action() {
  return {
    chunks: ['exchanger'],
    title,
    description,
    component: (
      <Layout footer={false}>
        <Exchanger />
      </Layout>
    ),
  };
}

export default action;
