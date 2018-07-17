import React from 'react';
// import NoSSR from 'react-no-ssr';
import { withRouter } from 'next/router';

import { Router } from '../routes';

import { activate } from '../services/cruds';
import { setLocale } from '../services/serverService';

@withRouter
export default class Activate extends React.Component {
  componentDidMount() {
    this.signIn();
  }

  signIn = async () => {
    try {
      const res = await activate.get({ key: this.props.router.query.code });
      Router.pushRoute('/');
    } catch (e) {
      console.error(e);
    }
  };

  render() {
    return <div>lol</div>;
  }
}
