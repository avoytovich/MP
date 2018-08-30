import React from 'react';
import Header from '../../components/header/index';
import { Router } from '../../routes';
import Button from '../../components/material-wrap/button';

export default class Shopper extends React.Component {
  render() {
    return (
      <div>
        <Header
          color
          style={{ background: '#f2f5f5' }}
          navStyle={{ paddingBottom: '0px' }}
        />
        <h1>SHOPPER</h1>
        <Button onClick={() => Router.pushRoute('/list-of-profashionals/:id')}>
          Explore
        </Button>
      </div>
    );
  }
}
