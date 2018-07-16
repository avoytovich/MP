import React from 'react';
// import NoSSR from 'react-no-ssr';
import { withRouter } from 'next/router';

import { Router } from '../../routes';

import Header from '../../components/header/index';
import Modal from '../../components/modal/index';

import SignUpModal from './components/signUp/modal';
import EmailModal from './components/user/modal';
import VerifyModal from './components/verify/modal';

import '../style.scss';

@withRouter
export default class App extends React.Component {
  state = {
    login: false,
    signup: false,
    user: false,
    verify: false,
    modalNames: ['login', 'signup', 'user', 'verify'],
  };

  componentDidMount() {
    if (this.props.router.query.modal) {
      this.setOpenModal(this.props.router.query.modal);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.router.query.modal !== nextProps.router.query.modal) {
      this.setOpenModal(nextProps.router.query.modal);
    }
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
    this.setState({
      login: false,
      signup: false,
      user: false,
      verify: false,
    });
    Router.pushRoute('/');
  };

  render() {
    return (
      <div>
        <div className="landing-wrapper">
          <Header />
          <h1 onClick={this.props.open}>Test</h1>
        </div>
        <Modal open={this.state.signup} withClose onClose={this.onClose}>
          <SignUpModal />
        </Modal>
        <Modal open={this.state.login} withClose onClose={this.onClose}>
          <h1>login</h1>
        </Modal>
        <Modal open={this.state.user} withClose onClose={this.onClose}>
          <EmailModal />
        </Modal>
        <Modal open={this.state.verify} withClose onClose={this.onClose}>
          <VerifyModal />
        </Modal>
      </div>
    );
  }
}
