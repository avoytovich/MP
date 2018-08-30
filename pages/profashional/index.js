import React from 'react';
import { bindActionCreators } from 'redux';
import { get } from 'lodash';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';

import { updateSpecData, resetData } from '../../actions/updateData';
import { account, profashionals, ratings } from '../../services/cruds';

import { NON_SCHEDULED } from '../../constants/interview';

import Modal from '../../components/modal';
import ProfashionalIconWithCover from '../../components/profashionalIconWithCover';
import Header from '../../components/header';
import Label from '../../components/label';

import loading from '../../services/decorators/loading';
import withGallery from '../../services/decorators/withGallery/index';
import { Router } from '../../routes';

import InterviewModal from './components/interview/modal';
import TripModal from './components/trip/modal';
import Reviews from './components/reviews';
import Calendar from './components/calendar';
import OpenCalendar from './components/openCalendar';
import GalleryGrid from './components/galleryGrid';
import CustomTypography from '../../components/material-wrap/typography/index';
import {
  amILogined,
  amIProfashional,
  isItMyPage,
} from '../../services/accountService';
import i18n from '../../services/decorators/i18n';

import './profashional.sass';

const mapStateToProps = ({ runtime }) => ({
  profashionalAccount: runtime.profashionalAccountData || {},
  hideInterviewModal: runtime.hideInterviewModal || {},
});

const mapDispatchToProps = (dispatch, props) =>
  bindActionCreators({ updateSpecData, resetData }, dispatch);

@connect(
  mapStateToProps,
  mapDispatchToProps,
)
@withRouter
@withGallery('profashionalProfile', 'galleryPhotos')
@loading(['profashionalProfile', 'profashionalRatings'])
@i18n('common')
export default class Profashional extends React.Component {
  state = {
    interviewModal: false,
    tripTracker: false,
  };

  componentWillMount() {
    if (!this.props.router.query.id) {
      Router.pushRoute('/');
    }
    this.loadAndSaveProfashionalAccount();
    this.loadAndSaveProfashionalProfile();
    this.loadAndSaveRatings();
  }

  componentWillUnmount() {
    this.props.resetData('profashionalAccount');
    this.props.resetData('profashionalProfile');
    this.props.resetData('profashionalRatings');
    this.props.resetData('modifiers');
    this.props.resetData('timeSlots');
  }

  componentWillReceiveProps(nextProps) {
    if (
      get(nextProps.profashionalAccount, 'profashional.interviewStatus') ===
        NON_SCHEDULED &&
      !this.state.interviewModal
    ) {
      this.setState({ interviewModal: true });
    }
  }

  loadAndSaveProfashionalAccount = async () => {
    try {
      if (
        amILogined() &&
        amIProfashional() &&
        isItMyPage(this.props.router.query.id)
      ) {
        const accountResp = await account.get();
        if (!this.props.profashionalAccount.id) {
          this.props.updateSpecData(accountResp.data, 'profashionalAccount');
        }
        if (
          get(
            this.props.profashionalAccount,
            'profashional.interviewStatus',
          ) === NON_SCHEDULED
        ) {
          this.setState({ interviewModal: true });
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  loadAndSaveProfashionalProfile = async () => {
    await this.props.loadData(
      profashionals.getWithId(this.props.router.query.id),
      {
        saveTo: 'profashionalProfile',
        setData: true,
      },
    );
  };

  loadAndSaveRatings = async () => {
    await this.props.loadData(
      ratings.getList({
        params: {
          profashionalId: this.props.router.query.id,
          page: 0,
          size: 10,
        },
      }),
      {
        saveTo: 'profashionalRatings',
        setData: true,
      },
    );
  };

  close = () => {
    this.setState({ interviewModal: false, tripTracker: false });
  };

  onPhotoClick = index => {
    this.props.openGal(index);
  };

  openTrip = () => {
    this.setState({ tripTracker: true });
  };

  get renderCertified() {
    const { certified } = this.props.profashionalProfile;
    if (certified) {
      return (
        <div className="certified-wrapper">
          <img src="/static/svg/certified.svg" />
          <CustomTypography variant="button" fontSize="20px">
            {this.props.translate('certified')}
          </CustomTypography>
        </div>
      );
    }
    return null;
  }

  get renderExpertise() {
    const { expersises } = this.props.profashionalProfile;
    if (expersises && expersises.length > 0) {
      return (
        <div className="info-container">
          <CustomTypography variant="subheading" fontSize="16px">
            {this.props.translate('expertise')}:{' '}
          </CustomTypography>
          <CustomTypography variant="title" fontSize="16px">
            {expersises.map(item => this.props.translate(item)).join(', ')}
          </CustomTypography>
        </div>
      );
    }
    return null;
  }

  get renderLanguages() {
    const { languages } = this.props.profashionalProfile;
    if (languages && languages.length) {
      return (
        <div className="info-container">
          <CustomTypography variant="subheading" fontSize="16px">
            {this.props.translate('languages')}:{' '}
          </CustomTypography>
          <CustomTypography variant="title" fontSize="16px">
            {languages.map(item => item.name).join(', ')}
          </CustomTypography>
        </div>
      );
    }
    return null;
  }

  get renderCities() {
    const { city } = this.props.profashionalProfile;
    if (city) {
      return (
        <div className="info-container">
          <CustomTypography variant="subheading" fontSize="16px">
            {this.props.translate('city')}:{' '}
          </CustomTypography>
          <CustomTypography variant="title" fontSize="16px">
            {city.name}
          </CustomTypography>
        </div>
      );
    }
    return null;
  }

  get renderOccasions() {
    const { occasions } = this.props.profashionalProfile;
    if (occasions) {
      return (
        <div className="occasions-container">
          {occasions.map((item, key) => (
            <Label key={key} name={this.props.translate(item.name)} />
          ))}
        </div>
      );
    }
    return null;
  }

  get renderSlogan() {
    const { slogan } = this.props.profashionalProfile;
    if (slogan) {
      return (
        <CustomTypography className="slogan" variant="button" fontSize="24px">
          {slogan}
        </CustomTypography>
      );
    }
    return null;
  }

  get renderDescription() {
    const { description } = this.props.profashionalProfile;
    if (description) {
      return (
        <CustomTypography
          className="slogan"
          variant="subheading"
          fontSize="16px">
          {description}
        </CustomTypography>
      );
    }
    return null;
  }

  get renderCalendar() {
    if (amIProfashional()) return <Calendar />;
    return <OpenCalendar />;
  }

  get pointArray() {
    const pointArray = [];
    if (!this.props.profashionalProfile.privateInfoCompleted) {
      pointArray.push('privateInfo');
    }
    if (!this.props.profashionalProfile.profileCompleted) {
      pointArray.push('editProfile');
    }
    return pointArray;
  }

  get isItMyProfashionalPage() {
    return !!(amIProfashional() && isItMyPage(this.props.router.query.id));
  }

  render() {
    if (!this.props.profashionalProfile) return null;
    if (!this.props.profashionalRatings) return null;
    return (
      <div className="profashional">
        <ProfashionalIconWithCover
          onTripClick={this.openTrip}
          showEditButtons={this.isItMyProfashionalPage}
          profashionalProfile={this.props.profashionalProfile}
          profashionalRatings={this.props.profashionalRatings}>
          <Header
            point={this.pointArray}
            color={
              !Boolean(get(this.props, 'profashionalProfile.coverPhoto.path'))
            }
          />
        </ProfashionalIconWithCover>
        <div className="profashional-grid profashional-block">
          <div className="profashional-info">
            <div className="first-block">
              {this.renderCertified}
              {this.renderExpertise}
              {this.renderCities}
              {this.renderLanguages}
            </div>
            <div className="second-block">
              {this.renderOccasions}
              {this.renderSlogan}
              {this.renderDescription}
            </div>
          </div>
          <GalleryGrid
            onPhotoClick={this.onPhotoClick}
            showUpload={this.isItMyProfashionalPage}
            name="profashionalProfile"
            photos={get(this.props, 'profashionalProfile.galleryPhotos')}
          />
        </div>
        <div
          className="profashional-grid profashional-block availability"
          id="availability-section">
          <CustomTypography
            variant="button"
            fontSize="24px"
            className="availability-header">
            Availability:
          </CustomTypography>
          {this.renderCalendar}
        </div>
        <div className="profashional-grid profashional-block availability">
          <Reviews
            profashionalRatings={this.props.profashionalRatings}
            profashionalProfile={this.props.profashionalProfile}
          />
        </div>
        <Modal withClose onClose={this.close} open={this.state.interviewModal}>
          <InterviewModal onClose={this.close} />
        </Modal>
        <Modal withClose onClose={this.close} open={this.state.tripTracker}>
          <TripModal onClose={this.close} />
        </Modal>
      </div>
    );
  }
}
