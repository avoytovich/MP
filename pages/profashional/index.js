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
import Button from '../../components/material-wrap/button';

import loading from '../../services/decorators/loading';
import withGallery from '../../services/decorators/withGallery/index';
import { Router } from '../../routes';

import InterviewModal from './components/interview/modal';
import GalleryGrid from './components/galleryGrid';

import './profashional.sass';

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

  loadAndSaveProfashionalProfile = async () => {
    await this.props.loadData(
      profashionals.getWithId(this.props.router.query.id),
      {
        saveTo: 'profashionalProfile',
      },
    );
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

  close = () => {
    this.setState({ interviewModal: false });
  };

  handleClick = () => {
    Router.pushRoute(
      `/profashional/${this.props.router.query.id}/private-info`,
    );
  };

  onPhotoClick = index => {
    this.props.openGal(index);
  };

  render() {
    if (!this.props.profashionalProfile) return null;
    return (
      <div className="profashional">
        <ProfashionalIconWithCover
          profashionalProfile={this.props.profashionalProfile}>
          <Header />
        </ProfashionalIconWithCover>
        Profashional
        <Modal withClose onClose={this.close} open={this.state.interviewModal}>
          <InterviewModal onClose={this.close} />
        </Modal>
        <Button onClick={this.handleClick}>Private Info</Button>
        <GalleryGrid
          onPhotoClick={this.onPhotoClick}
          name="profashionalProfile"
          photos={get(this.props, 'profashionalProfile.galleryPhotos')}
        />
      </div>
    );
  }
}
