import React from 'react';
import { bindActionCreators } from 'redux';
import { get } from 'lodash';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';

import Button from '@material-ui/core/Button';

import { updateSpecData } from '../../actions/updateData';
import { account } from '../../services/cruds';

import { NON_SCHEDULED } from '../../constants/interview';

import Modal from '../../components/modal';
import Button from '../../components/material-wrap/button';

import { Router } from '../../routes';

import InterviewModal from './components/interview/modal';

const mapStateToProps = ({ runtime }) => ({
  profashionalAccount: runtime.profashionalAccountData || {},
  hideInterviewModal: runtime.hideInterviewModal || {},
});

const mapDispatchToProps = (dispatch, props) =>
  bindActionCreators({ updateSpecData }, dispatch);

@withRouter
@connect(
  mapStateToProps,
  mapDispatchToProps,
)
export default class Profashional extends React.Component {
  state = {
    interviewModal: false,
  };

  componentDidMount() {
    this.loadAndSaveProfashionalAccount();
  }

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
    if (nextProps.hideInterviewModal && this.state.interviewModal) {
      this.setState({ interviewModal: false });
    }
  }

  close = () => {
    this.setState({ interviewModal: false });
  };

  edit = () => {
    Router.pushRoute('/profashional/edit-profile');
  };

  handleClick = () => {
    Router.pushRoute('/private-info/:id');
  };

  render() {
    return (
      <div>
        Profashional
        <Button onClick={this.edit}>Edit profile</Button>
        <Modal withClose onClose={this.close} open={this.state.interviewModal}>
          <InterviewModal />
        </Modal>
        <Button
          onClick={this.handleClick}
        >
          Private Info
        </Button>
      </div>
    );
  }
}
