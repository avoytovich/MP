import React from 'react';
import { bindActionCreators } from 'redux';
import { get } from 'lodash';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';

import { updateSpecData } from '../../actions/updateData';
import { account, profashionals } from '../../services/cruds';

import { NON_SCHEDULED } from '../../constants/interview';

import Modal from '../../components/modal';
import ProfashionalIconWithCover from '../../components/profashionalIconWithCover';
import Header from '../../components/header';
import Label from '../../components/label';

import loading from '../../services/decorators/loading';
import withGallery from '../../services/decorators/withGallery/index';
import { Router } from '../../routes';

import InterviewModal from './components/interview/modal';
import GalleryGrid from './components/galleryGrid';

import './profashional.sass';
import CustomTypography from '../../components/material-wrap/typography/index';
import i18n from '../../services/decorators/i18n';

const mapStateToProps = ({ runtime }) => ({
  profashionalAccount: runtime.profashionalAccountData || {},
  hideInterviewModal: runtime.hideInterviewModal || {},
});

const mapDispatchToProps = (dispatch, props) =>
  bindActionCreators({ updateSpecData }, dispatch);

@connect(
  mapStateToProps,
  mapDispatchToProps,
)
@withRouter
@withGallery('profashionalProfile', 'galleryPhotos')
@loading(['profashionalProfile'])
@i18n('common')
export default class Profashional extends React.Component {
  state = {
    interviewModal: false,
  };

  componentDidMount() {
    if (!this.props.router.query.id) {
      Router.pushRoute('/');
    }
    this.loadAndSaveProfashionalAccount();
    this.loadAndSaveProfashionalProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (
      get(
        nextProps.profashionalAccount,
        'userExtra.profashional.interviewStatus',
      ) === NON_SCHEDULED &&
      !this.state.interviewModal
    ) {
      this.setState({ interviewModal: true });
    }
  }

  loadAndSaveProfashionalProfile = async () => {
    await this.props.loadData(
      profashionals.getWithId(this.props.router.query.id),
      {
        saveTo: 'profashionalProfile',
      },
    );
  };

  close = () => {
    this.setState({ interviewModal: false });
  };

  onPhotoClick = index => {
    this.props.openGal(index);
  };

  loadAndSaveProfashionalAccount = async () => {
    try {
      const accountResp = await account.get();
      if (!this.props.profashionalAccount.id) {
        this.props.updateSpecData(accountResp.data, 'profashionalAccount');
      }
      if (
        get(
          this.props.profashionalAccount,
          'userExtra.profashional.interviewStatus',
        ) === NON_SCHEDULED
      ) {
        this.setState({ interviewModal: true });
      }
    } catch (e) {
      console.error(e);
    }
  };

  get renderExpertise() {
    const { expersises } = this.props.profashionalProfile;
    if (expersises && expersises.length > 0) {
      return (
        <div className="info-container">
          <CustomTypography variant="subheading" fontSize="16px">
            Expertise:{' '}
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
            Languages:{' '}
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
            City:{' '}
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
            <Label key={key} name={this.props.translate(item)} />
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

  render() {
    if (!this.props.profashionalProfile) return null;
    console.log(this.props.profashionalProfile);
    return (
      <div className="profashional">
        <ProfashionalIconWithCover
          profashionalProfile={this.props.profashionalProfile}>
          <Header />
        </ProfashionalIconWithCover>
        <div className="profashional-grid profashional-block">
          <div className="profashional-info">
            <div className="first-block">
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
            name="profashionalProfile"
            photos={get(this.props, 'profashionalProfile.galleryPhotos')}
          />
        </div>
        <Modal withClose onClose={this.close} open={this.state.interviewModal}>
          <InterviewModal onClose={this.close} />
        </Modal>
      </div>
    );
  }
}
