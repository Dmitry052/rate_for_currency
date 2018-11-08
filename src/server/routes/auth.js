// @flow
import type { Router } from 'express';

const express = require('express');
const uuidv4 = require('uuid/v4');
// const axios = require('axios');
const users = require('./../utils/users');

const router: Router = express.Router();

let apiUrl: string;

// Check user
router.post('/login', async (req: $Request, res: $Response) => {
  let status: Object = {};

  if (req.body) {
    const { user, password } = req.body;
    // try {
    //   const response = await axios({
    //     method: 'post',
    //     url: `${apiUrl}/login`,
    //     data: {
    //       user,
    //       password,
    //     },
    //   });
    //   console.log(response);
    // } catch (error) {
    //   console.error(error);
    //   res.redirect('/?status=false');
    // }

    status = users.data(user, password, apiUrl);
  }

  if (status.auth) {
    if (req.session) {
      req.session.uuid = uuidv4();
      req.session.user = {
        uuid: status.uuid,
        login: status.user,
        route: status.route,
        role: status.role,
        // TODO: set from API
      };
      res.redirect('/exchanger');
    }
  } else {
    res.redirect('/?status=false');
  }
});

// Logout
router.get('/logout', (req: $Request, res: $Response) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = (data: { API_SERVER_URL: string }) => {
  const { API_SERVER_URL } = data;
  apiUrl = API_SERVER_URL;
  return router;
};
