import React from 'react';
import { withRouter } from 'next/router';

import { Router } from '../routes';

import { activate, account } from '../services/cruds';
import { setLocale } from '../services/serverService';

@withRouter
export default class Activate extends React.Component {
  componentDidMount() {
    this.signIn();
  }

  signIn = async () => {
    try {
      const res = await activate.get({ key: this.props.router.query.code });
      setLocale('id_token', res.data.id_token);
      setLocale('refresh_token', res.data.refresh_token);
      const accoutResp = await account.get();
      if (accoutResp.data.authorities.indexOf('ROLE_SHOPPER') !== -1) {
        Router.pushRoute('/shoper');
      } else {
        Router.pushRoute('/profashional');
      }
    } catch (e) {
      console.error(e);
      Router.pushRoute('/');
    }
  };

  render() {
    return null;
  }
}
