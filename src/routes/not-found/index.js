/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Layout from '../../components/Layout';
import NotFound from './NotFound';

const title = 'Page Not Found';

function action(context) {
  const { user } = context.store.getState();

  let showHeader = false;
  let showFooter = false;

  if (user) {
    showHeader = true;
    showFooter = true;
  }

  return {
    chunks: ['not-found'],
    title,
    component: (
      <Layout header={showHeader} footer={showFooter}>
        <NotFound title={title} />
      </Layout>
    ),
    status: 404,
  };
}

export default action;
