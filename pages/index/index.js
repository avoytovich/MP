import React from 'react';
// import NoSSR from 'react-no-ssr';
import { withRouter } from 'next/router';

import { Router } from '../../routes';

import Header from '../../components/header/index';
import Modal from '../../components/modal/index';

import SignUpModal from './components/signUp/modal';
import LoginModal from './components/login/modal';
import EmailModal from './components/user/modal';
import VerifyModal from './components/verify/modal';
import ForgotModal from './components/forgot/modal';
import ResetModal from './components/resetPassword/modal';

import '../style.scss';

@withRouter
export default class App extends React.Component {
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
    // TODO implemet 404 logic
    if (this.props.router.query.modal) {
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
      return newState;
    });
  };

  onClose = () => {
    this.setState(() => {
      const newState = {};
      this.state.modalNames.forEach(modal => {
        newState[modal] = false;
      });
      return newState;
    });
    Router.pushRoute('/');
  };

  render() {
    return (
      <div>
        <div className="landing-wrapper">
          <Header />
        </div>
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
          <VerifyModal />
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
      </div>
    );
  }
}
