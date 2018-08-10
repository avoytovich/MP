import React from 'react';
import moment from 'moment';
import { withRouter } from 'next/router';
import InfiniteScroll from 'react-infinite-scroll-component';

import Rate from '../../../../components/rate';

import { ratings } from '../../../../services/cruds';
import i18n from '../../../../services/decorators/i18n';
import loading from '../../../../services/decorators/loading';
import CustomTypography from '../../../../components/material-wrap/typography/index';

import './style.sass';

@i18n('reviews')
@loading()
@withRouter
export default class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      elements: props.profashionalRatings.data,
    };
    this.page = 0;
  }
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
    return this.state.elements.map((item, index) => (
      <div key={index} className="reviews-item-wrapper">
        <div className="reviews-item-first">
          <CustomTypography fontSize="25.2px" variant="title">
            {item.shopper.firstName}
          </CustomTypography>
          <CustomTypography
            className="date"
            fontSize="16px"
            variant="subheading">
            {moment(item.date).format('DD.MM.YYYY')}
          </CustomTypography>
        </div>
        <div className="reviews-item-second">
          <Rate initialRating={item.value} readonly />
        </div>
        <div className="comment-body">
          <CustomTypography fontSize="16px" variant="subheading">
            {item.comment}
          </CustomTypography>
        </div>
      </div>
    ));
  }

  loadAndSaveRatings = async () => {
    const resp = await this.props.loadData(
      ratings.getList({
        params: {
          profashionalId: this.props.router.query.id,
          page: ++this.page,
          size: 10,
        },
      }),
    );
    this.setState({
      elements: this.state.elements.concat(resp.data.data),
    });
  };

  render() {
    const { profashionalRatings } = this.props;
    return (
      <div className="reviews-wrapper">
        {this.renderCountAndRate}
        <InfiniteScroll
          next={this.loadAndSaveRatings}
          dataLength={this.state.elements.length}
          hasMore={
            this.state.elements.length < profashionalRatings.pagination.total
          }>
          {this.renderListOfReviews}
        </InfiniteScroll>
      </div>
    );
  }
}
