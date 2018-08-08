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

import './private-info.sass';
import { amIProfashional, isILogined } from '../../../services/accountService';
import withConfirmModal from '../../../services/decorators/withConfirmModal';
import withModal from '../../../services/decorators/withModal';

const mapDispatchToProps = dispatch =>
  bindActionCreators({ updateSpecData, resetData }, dispatch);

const mapStateToProps = ({ runtime }) => ({
  privateInfo: runtime.privateInfoData,
  countryList: runtime.countryList,
  currencyList: runtime.currencyList,
  profashionalAccount: runtime.profashionalAccountData,
  profashionalPrivateInfo: runtime.profashionalPrivateInfoData,
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
    this.loadAndSaveProfashionalPrivateInfo();
    if (!isILogined() && amIProfashional()) {
      Router.pushRoute('/');
    } else {
      this.loadAndSave();
    }
  }

  /* componentDidMount() {
    if (!isILogined() && amIProfashional()) {
      Router.pushRoute('/');
    } else {
      this.loadAndSave();
    }
  }*/

  loadAndSaveProfashionalAccount = async () => {
    try {
      const accountResp = await account.get();
      this.props.updateSpecData(accountResp.data, 'profashionalAccount');
    } catch (e) {
      console.error(e);
    }
  };

  loadAndSaveProfashionalPrivateInfo = async () => {
    await this.props.loadData(
      profashionals.getWithId(this.props.router.query.id, '/privateInfo'),
      {
        saveTo: 'profashionalPrivateInfo',
      },
    );
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

  handleSubmitForStepOneEdit = async values => {
    this.props.updateSpecData(values, 'privateInfo');
    const stripe = Stripe('pk_test_opVhyp1UCaDDjQ5riDJapXY3');
    const { firstName, lastName, bankAccountNumber } = values;
    const {
      privateInfo,
      profashionalPrivateInfo,
      countryList,
      currencyList,
    } = this.props;
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
        this.props.loadData(
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
              gender: profashionalPrivateInfo.gender,
              dob: moment(profashionalPrivateInfo.dob).format('YYYY-MM-DD'),
              frontImageId: profashionalPrivateInfo.frontImage.id,
              backImageId: profashionalPrivateInfo.backImage.id,
            },
            `/${this.props.router.query.id}/privateInfo`,
          ),
        );
        Router.pushRoute(`/profashional/${this.props.router.query.id}`);
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
      get(this.props, 'profashionalPrivateInfo') ||
      get(this.props, 'profashionalAccount') ||
      {}
    );
  }

  render() {
    console.log('THIS PROPS', this.props);
    //console.log('THIS State', this.state);
    const {
      profashionalPrivateInfo,
      profashionalProfile,
      profashionalAccount,
    } = this.props;
    const { isConfirmed } = profashionalAccount.userExtra.profashional;
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
            {profashionalAccount &&
              !isConfirmed && (
                <div className="grid-stepper">
                  <Grid className="grid" item xs={12} sm={6}>
                    <Stepper ref={this.child} />
                  </Grid>
                </div>
              )}
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
                    completed={isConfirmed}
                    handleSubmit={
                      (profashionalAccount &&
                        !isConfirmed &&
                        this.handleSubmitForStepOne) ||
                      this.handleSubmitForStepOneEdit
                    }
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
