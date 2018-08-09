import React from 'react';
import Grid from '@material-ui/core/Grid';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { find, get } from 'lodash';
import { withRouter } from 'next/router';
import moment from 'moment';

import Stepper from '../../../components/stepper/index';
import ModalHeader from '../../../components/modalHeader';
import Typography from '../../../components/material-wrap/typography';
import PrivateInfoStepOne from '../../../forms/privateInfo/privateInfoStepOne';
import PrivateInfoStepTwo from '../../../forms/privateInfo/privateInfoStepTwo';
import { updateSpecData, resetData } from '../../../actions/updateData';
import { Router } from '../../../routes';
import { account, profashionals } from '../../../services/cruds';
import loading from '../../../services/decorators/loading';

import Button from '../../../components/material-wrap/button';

import './private-info.sass';
import { amIProfashional, isILogined } from '../../../services/accountService';
import withConfirmModal from '../../../services/decorators/withConfirmModal';
import withModal from '../../../services/decorators/withModal';
import { NON_SCHEDULED } from '../../../constants/interview';

const mapDispatchToProps = dispatch =>
  bindActionCreators({ updateSpecData, resetData }, dispatch);

const mapStateToProps = ({ runtime }) => ({
  privateInfo: runtime.privateInfoData,
  countryList: runtime.countryList,
  currencyList: runtime.currencyList,
  profashionalAccount: runtime.profashionalAccountData,
});
@connect(
  mapStateToProps,
  mapDispatchToProps,
)
@withRouter
@withModal(
  'Thank you for filling the information! Admin will contact you shortly',
  props => Router.pushRoute(`/profashional/${props.router.query.id}`),
)
@withConfirmModal('editPrivateInfo', 'no', 'yes', props =>
  Router.pushRoute(`/profashional/${props.router.query.id}`),
)
@loading(['profashionalProfile'])
export default class PrivateInfoProfashional extends React.Component {
  constructor(props) {
    super(props);
    this.child = React.createRef();
    this.state = {
      forwardToNextStep: true,
    };
  }

  componentWillUnmount() {
    this.props.resetData('privateInfo');
  }

  componentWillMount() {
    if (!this.props.router.query.id) {
      Router.pushRoute('/');
    }
    this.loadAndSaveProfashionalAccount();
  }

  componentDidMount() {
    if (!isILogined() && amIProfashional()) {
      Router.pushRoute('/');
    } else {
      this.loadAndSave();
    }
  }

  loadAndSaveProfashionalAccount = async () => {
    try {
      const accountResp = await account.get();
      this.props.updateSpecData(accountResp.data, 'profashionalAccount');
    } catch (e) {
      console.error(e);
    }
  };

  loadAndSave = async () => {
    await this.props.loadData(
      profashionals.getWithId(this.props.router.query.id, '/profile'),
      {
        saveTo: 'profashionalProfile',
      },
    );
  };

  handleSubmitForStepOne = values => {
    this.props.updateSpecData(values, 'privateInfo');
    const stripe = Stripe('pk_test_opVhyp1UCaDDjQ5riDJapXY3');
    const { firstName, lastName, bankAccountNumber } = values;
    const { privateInfo, countryList, currencyList } = this.props;
    const country = find(countryList[0], { id: privateInfo.country });
    const currency = find(currencyList[0], { id: privateInfo.currency });
    const bankAccount = {
      country: country.code,
      currency: currency.name,
      account_holder_name: `${firstName} ${lastName}`,
      account_holder_type: 'individual',
      account_number: bankAccountNumber,
    };
    stripe
      .createToken('bank_account', bankAccount)
      .then(result => {
        const { id } = result.token;
        this.props.updateSpecData({ bankToken: id }, 'privateInfo');
        this.child.current.handleNext();
        this.setState({
          forwardToNextStep: false,
        });
      })
      .catch(err => {
        console.error('Error', err);
      });
  };

  handleSubmitForStepTwo = async values => {
    const { privateInfo } = this.props;
    const oldCompleted = get(this.props, 'profashionalProfile.completed');
    const resp = await this.props.loadData(
      profashionals.post(
        {
          address: privateInfo.address,
          bankToken: privateInfo.bankToken,
          city: privateInfo.city,
          countryId: privateInfo.country,
          email: privateInfo.email,
          firstName: privateInfo.firstName,
          lastName: privateInfo.lastName,
          phoneNumber: privateInfo.phoneNumber,
          zip: privateInfo.zip,
          gender: values.gender,
          dob: moment(values.birthday).format('YYYY-MM-DD'),
          frontImageId: privateInfo.frontId,
          backImageId: privateInfo.backId,
        },
        `/${this.props.privateInfo.router.query.id}/privateInfo`,
      ),
    );
    if (get(resp, 'data.completed') && !oldCompleted) {
      this.props.openModal();
    } else {
      Router.pushRoute(`/profashional/${this.props.router.query.id}`);
    }
  };

  handleBackForStepTwo = values => {
    this.child.current.handleBack();
    this.setState({
      forwardToNextStep: true,
    });
  };

  get initialValues() {
    return (
      get(this.props, 'privateInfo') ||
      get(this.props, 'profashionalAccount') ||
      {}
    );
  }

  render() {
    const { forwardToNextStep } = this.state;
    return (
      <div className="private-info private-info-form-wrapper">
        <Grid container spacing={0} justify="center">
          <Grid item xs={12} sm={12}>
            <ModalHeader
              title="Private Info"
              className="test"
              onClose={() => this.props.openConfirm()}
            />
            <div className="grid-stepper">
              <Grid className="grid" item xs={12} sm={6}>
                <Stepper ref={this.child} />
              </Grid>
            </div>
            <div className="grid-header">
              <Grid className="grid-header-title" item xs={12} sm={6}>
                {forwardToNextStep ? (
                  <Typography variant="title" fontSize="20px">
                    Please provide your Private information
                  </Typography>
                ) : (
                  <Typography variant="title" fontSize="20px">
                    The folowing data is only visible for admin
                  </Typography>
                )}
              </Grid>
            </div>
            <div className="grid-field">
              <Grid className="grid-field-input" item xs={12} sm={6}>
                {forwardToNextStep ? (
                  <PrivateInfoStepOne
                    {...this.initialValues}
                    privateInfo={this.props.privateInfo}
                    handleSubmit={this.handleSubmitForStepOne}
                  />
                ) : (
                  <PrivateInfoStepTwo
                    handleSubmit={this.handleSubmitForStepTwo}
                    handleBack={this.handleBackForStepTwo}
                  />
                )}
              </Grid>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}
