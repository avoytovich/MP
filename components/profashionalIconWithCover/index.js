import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import { withRouter } from 'next/router';
import { get } from 'lodash';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import IconOurButton from '../material-wrap/buttonWithIcon';
import CustomTypography from '../material-wrap/typography/index';
import Rate from '../rate';
import i18n from '../../services/decorators/i18n';
import { createNotification } from '../../services/notification';

import { Router } from '../../routes';

import './style.sass';

@i18n('common')
@withRouter
export default class ProfashionalCoverPhoto extends React.Component {
  get coverPhotoStyle() {
    const coverUrl = get(this.props, 'coverUrl.path');
    const coverUrlFromServer = get(
      this.props,
      'profashionalProfile.coverPhoto.path',
    );
    return {
      border: coverUrl || coverUrlFromServer ? '' : 'dashed 1px #000000',
      backgroundImage:
        (coverUrl && `url(${coverUrl})`) ||
        (coverUrlFromServer &&
          `url(${coverUrlFromServer}), linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(255, 255, 255, 0))`) ||
        '',
    };
  }

  edit = () => {
    Router.pushRoute(
      `/profashional/${this.props.router.query.id}/edit-profile`,
    );
  };

  get renderIconPhoto() {
    return (
      get(this.props, 'iconUrl.path') ||
      get(this.props, 'profashionalProfile.icon.path') ||
      '/static/svg/placeholder.svg'
    );
  }

  get renderAddinationalInfoDesctop() {
    const {
			username,
      firstName,
      currentRate,
      currency,
      rating,
      numberOfTrips,
    } = this.props.profashionalProfile;
    return (
      <div className="addinational-wrapper desctop">
        <div className="name-container">
          <div className="name-currency near-icon">
            <CustomTypography
              className="flex-with-margin"
              variant="button"
              fontSize="24px">
              {username || firstName}
            </CustomTypography>
            {currentRate && (
              <CustomTypography
                className="currency"
                fontSize="18px"
                variant="subheading">
                {currentRate / 100}
                {` ${get(currency, 'name')}`} / {this.props.translate('hour')}
              </CustomTypography>
            )}
          </div>
          <CopyToClipboard
            onCopy={() =>
              createNotification('info', this.props.translate('copied'))
            }
            text={`http://demo.myprofashional.com${this.props.router.asPath}`}>
            <div className="copy-link pointer">
              <img src="/static/svg/copyLink.svg" />
              <CustomTypography fontSize="14px" variant="button">
                {this.props.translate('copyLink')}
              </CustomTypography>
            </div>
          </CopyToClipboard>
        </div>
        {numberOfTrips && (
          <div className="near-icon">
            <CustomTypography
              className="flex-with-margin"
              variant="subheading"
              fontSize="20px">
              {numberOfTrips}
              {` ${this.props.translate('meetings')}`}
            </CustomTypography>
          </div>
        )}
        {rating && (
          <div className="near-icon">
            <Rate
              className="flex-with-margin"
              initialRating={rating}
              readonly
            />
          </div>
        )}
      </div>
    );
  }

  get renderAddinationalInfoMobile() {
    const {
      firstName,
      currentRate,
      currency,
      rating,
      numberOfTrips,
    } = this.props.profashionalProfile;
    return (
      <div className="addinational-wrapper mobile">
        <div className="name-container">
          <div className="name-currency near-icon">
            <CustomTypography
              className="flex-with-margin"
              variant="button"
              fontSize="24px">
              {firstName}
            </CustomTypography>
          </div>
        </div>
        {numberOfTrips && (
          <div className="near-icon">
            <CustomTypography
              className="flex-with-margin meetings-mobile"
              variant="subheading"
              fontSize="20px">
              {numberOfTrips}
              {` ${this.props.translate('meetings')}`}
            </CustomTypography>
          </div>
        )}
        <div className="name-container currency">
          <div className="name-currency">
            {currentRate && (
              <div className="near-icon">
                <CustomTypography
                  className="flex-with-margin"
                  fontSize="18px"
                  variant="subheading">
                  {currentRate / 100}
                  {` ${get(currency, 'name')}`} / {this.props.translate('hour')}
                </CustomTypography>
              </div>
            )}
            {rating && (
              <div>
                <Rate
                  className="flex-with-margin rate-wrapper"
                  initialRating={rating}
                  readonly
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { isEdit } = this.props;
    return (
      <div className="profashional-cover">
        <div className={'cover-wrapper ' + (!isEdit ? 'no-edit' : '')}>
          {isEdit && (
            <IconButton
              aria-label="Edit"
              onClick={() => this.props.openFileDialog('coverInput')}
              className="edit-button edit-cover icon-edit">
              <EditIcon />
            </IconButton>
          )}
          <div className="cover-body" style={this.coverPhotoStyle}>
            {this.props.children}
            {!isEdit && (
              <div className="buttons-wrapper">
                <IconOurButton
                  className="edit-profile-button"
                  onClick={this.edit}
                  icon={<EditIcon />}>
                  Edit profile
                </IconOurButton>
              </div>
            )}
          </div>
          <div className={'icon-wrapper ' + (!isEdit ? 'no-edit' : '')}>
            <div
              style={{
                backgroundImage: `url(${this.renderIconPhoto})`,
              }}
              className="icon-image"
            />
            {isEdit && (
              <IconButton
                aria-label="Edit"
                onClick={() => this.props.openFileDialog('iconInput')}
                className="edit-button edit-icon icon-edit">
                <EditIcon />
              </IconButton>
            )}
          </div>
          {!isEdit && this.renderAddinationalInfoDesctop}
          {!isEdit && this.renderAddinationalInfoMobile}
        </div>
      </div>
    );
  }
}
