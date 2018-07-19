import React from 'react';
import { bindActionCreators } from 'redux';
import { get } from 'lodash';
import { connect } from 'react-redux';

import { updateSpecData } from '../../actions/updateData';
import { account } from '../../services/cruds';

import { NON_SCHEDULED } from '../../constants/interview';

import Modal from '../../components/modal';

import InterviewModal from './components/interview/modal';

const mapStateToProps = ({ runtime }) => ({
  profashionalAccount: runtime.profashionalAccountData || {},
});

const mapDispatchToProps = (dispatch, props) =>
  bindActionCreators({ updateSpecData }, dispatch);

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
        this.props.profashionalAccount,
        'userExtra.profashional.interviewStatus',
      ) !==
        get(
          nextProps.profashionalAccount,
          'userExtra.profashional.interviewStatus',
        ) &&
      get(
        nextProps.profashionalAccount,
        'userExtra.profashional.interviewStatus',
      ) === NON_SCHEDULED &&
      !this.state.interviewModal
    ) {
      this.setState({ interviewModal: true });
    }
  }

  render() {
    return (
      <div>
        Profashional
        <Modal withClose open={this.state.interviewModal}>
          <InterviewModal />
        </Modal>
      </div>
    );
  }
}
