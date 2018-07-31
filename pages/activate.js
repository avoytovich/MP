import React from 'react';
import { withRouter } from 'next/router';

import { Router } from '../routes';

import { activate, account } from '../services/cruds';
import { saveToStorage } from '../services/saveUserAndRedirectToProfile';
import { setLocale } from '../services/serverService';
import loading from '../services/decorators/loading';

@withRouter
@loading()
export default class Activate extends React.Component {
  componentDidMount() {
    this.signIn();
  }

  signIn = async () => {
    try {
      const res = await this.props.loadData(
        activate.get({ key: this.props.router.query.code }),
      );
      this.props.loadData(saveToStorage(res));
    } catch (e) {
      console.error(e);
      Router.pushRoute('/');
    }
  };

  render() {
    return null;
  }
}
