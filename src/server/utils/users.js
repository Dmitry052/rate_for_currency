// @flow
const passwordHash = require('password-hash');
const users = require('../../data/users');

const checkUser = {
  data: (login: string, pass: string): Object => {
    if (
      login !== undefined &&
      users[login] !== undefined &&
      // pass === users[login].pass
      passwordHash.verify(pass, users[login].pass)
    ) {
      return {
        auth: true,
        uuid: users[login].uuid,
        user: login,
        role: users[login].role,
        route: users[login].route,
        email: users[login].adviser_email,
        edit: users[login].edit,
      };
    }
    return { status: false };
  },
};

module.exports = checkUser;
