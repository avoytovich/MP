import React from 'react';
import moment from 'moment';
import Rate from '../../../../components/rate';

import i18n from '../../../../services/decorators/i18n';
import CustomTypography from '../../../../components/material-wrap/typography/index';

import './style.sass';

@i18n('reviews')
export default class Reviews extends React.Component {
  get renderCountAndRate() {
    const { pagination } = this.props.profashionalRatings;
    return (
      <div className="count-and-rate">
        <CustomTypography variant="title" fontSize="24px">
          {pagination.total
            ? `${pagination.total} ${this.props.translate('reviews')}`
            : this.props.translate('noReviews')}
        </CustomTypography>
        <Rate initialRating={this.props.profashionalProfile.rating} readonly />
      </div>
    );
  }

  get renderListOfReviews() {
    return this.props.profashionalRatings.data.map((item, index) => (
      <div key={index} className="reviews-item-wrapper">
        <div className="reviews-item-first">
          <CustomTypography fontSize="25.2px" variant="title">
            {item.shopper.firstName}
          </CustomTypography>
          <CustomTypography className="date" fontSize="16px" variant="subheading">
            {moment(item.date).format('DD.MM.YYYY')}
          </CustomTypography>
        </div>
        <div className="reviews-item-second">
          <Rate
            initialRating={this.props.profashionalProfile.rating}
            readonly
          />
        </div>
        <div className="comment-body">
          <CustomTypography fontSize="16px" variant="subheading">
            {item.comment}
          </CustomTypography>
        </div>
      </div>
    ));
  }

  render() {
    return (
      <div className="reviews-wrapper">
        {this.renderCountAndRate}
        {this.renderListOfReviews}
      </div>
    );
  }
}
