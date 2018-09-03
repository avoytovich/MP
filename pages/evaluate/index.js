import React, { Component } from 'react';

import Header from '../../components/header';
import EvaluateForm from '../../forms/evaluate';
import CustomTypography from '../../components/material-wrap/typography/index';
import i18n from '../../services/decorators/i18n';

import './style.sass';

@i18n('evaluate')
export default class Evaluate extends Component {
  state = {
    value: 5,
  };
  render() {
    return (
      <div className="evaluate">
        <Header
          color
          style={{ background: '#f2f5f5' }}
          navStyle={{ paddingBottom: '0px' }}
        />
        <div className="evaluate-header">
          <CustomTypography variant="title" className="title" fontSize="36px">
            {this.props.translate('shoppingExperience')}
          </CustomTypography>
        </div>
        <EvaluateForm handleSubmit={val => console.log('values', val)} />

      </div>
    );
  }
}
