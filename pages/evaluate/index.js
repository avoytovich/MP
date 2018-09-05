import React, { Component } from 'react';
import { withRouter } from 'next/router';

import Header from '../../components/header';
import CustomTypography from '../../components/material-wrap/typography/index';
import { saveToStorage } from '../../services/saveUserAndRedirectToProfile';

import EvaluateForm from '../../forms/evaluate';

import i18n from '../../services/decorators/i18n';
import { profashionals, authenticate, ratings } from '../../services/cruds';
import loading from '../../services/decorators/loading';

import './style.sass';

@i18n('evaluate')
@loading(['evaluateProfashional', 'myAccount'])
@withRouter
export default class Evaluate extends Component {
  state = {
    value: 5,
  };

  componentDidMount() {
    this.loadInfoForRating();
  }

  loadInfoForRating = async () => {
    this.props.loadData(
      profashionals.getWithId(this.props.router.query.profashionalId),
      {
        saveTo: 'evaluateProfashional',
        setData: true,
      },
    );
    this.props.loadData(
      saveToStorage(
        await authenticate.post(
          this.props.router.query.refreshToken,
          '/refresh',
        ),
        false,
      ),
      {
        saveTo: 'myAccount',
      },
    );
  };

  handleSubmit = value => {
    this.props.loadData(
      ratings.post({
        value: value.rate,
        comment: value.comment,
        platformRecommendationValue: value.myProfashionalRecomending,
        isBookingSuccessful: Boolean(value.wasSuccess === 'yes'),
        bookingId: this.props.router.query.bookingId,
      }),
    );
  };

  get initialValues() {
    return {
      wasSuccess: 'yes',
      myProfashionalRecomending: 6,
    };
  }

  render() {
    if (!this.props.myAccount || !this.props.evaluateProfashional) return null;
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
        <EvaluateForm {...this.initialValues} handleSubmit={this.handleSubmit} />
      </div>
    );
  }
}
