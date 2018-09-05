import React from 'react';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import qs from 'qs';
import { forIn } from 'lodash';
import 'moment/locale/de';

import { changeQuery } from '../services/serverService';

import Modal from '../components/modal/index';
import SignUpModal from '../components/modals/signUp/modal';
import LoginModal from '../components/modals/login/modal';
import EmailModal from '../components/modals/user/modal';
import VerifyModal from '../components/modals/verify/modal';
import ForgotModal from '../components/modals/forgot/modal';
import ResetModal from '../components/modals/resetPassword/modal';

import { Router } from '../routes';

@withRouter
export default class Localization extends React.Component {
  state = {
    login: false,
    signup: false,
    user: false,
    verify: false,
    forgot: false,
    'reset-password': false,
    modalNames: [
      'login',
      'signup',
      'user',
      'verify',
      'forgot',
      'reset-password',
    ],
  };

  componentDidMount() {
    if (this.props.router.query.modal && !this.props.router.query.key) {
      this.setOpenModal(this.props.router.query.modal);
    }
    if (this.props.router.query.key) {
      this.setOpenModal('reset-password');
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setOpenModal(nextProps.router.query.modal);
  }

  setOpenModal = modalName => {
    this.setState(() => {
      const needToCloseArray = this.state.modalNames.filter(
        name => name !== modalName,
      );
      const newState = { [modalName]: true };
      needToCloseArray.forEach(modal => {
        newState[modal] = false;
      });
      console.log(newState);
      return newState;
    });
  };

  onClose = () => {
    const newUrl = changeQuery(this.props.router, undefined, undefined, true);
    Router.pushRoute(newUrl);
  };

  render() {
    return (
      <React.Fragment>
        {this.props.children}
        <Modal open={this.state.signup} withClose onClose={this.onClose}>
          <SignUpModal />
        </Modal>
        <Modal open={this.state.login} withClose onClose={this.onClose}>
          <LoginModal />
        </Modal>
        <Modal
          open={this.state.user}
          withClose
          withConfirm
          onClose={this.onClose}>
          <EmailModal />
        </Modal>
        <Modal open={this.state.verify} withClose onClose={this.onClose}>
          <VerifyModal onClose={this.onClose} />
        </Modal>
        <Modal open={this.state.forgot} withClose onClose={this.onClose}>
          <ForgotModal />
        </Modal>
        <Modal
          open={this.state['reset-password']}
          withClose
          onClose={this.onClose}>
          <ResetModal />
        </Modal>
      </React.Fragment>
    );
  }
}
