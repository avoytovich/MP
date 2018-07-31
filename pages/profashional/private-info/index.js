import React from 'react';
import Grid from '@material-ui/core/Grid';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { find, get } from 'lodash';
import moment from 'moment';

import Stepper from '../../../components/stepper/index';
import ModalHeader from '../../../components/modalHeader';
import Typography from '../../../components/material-wrap/typography';
import PrivateInfoStepOne from '../../../forms/privateInfo/privateInfoStepOne';
import PrivateInfoStepTwo from '../../../forms/privateInfo/privateInfoStepTwo';
import { updateSpecData } from '../../../actions/updateData';
import { Router } from '../../../routes';
import { profashionals } from '../../../services/cruds';
import loading from '../../../services/decorators/loading';

import Button from '../../../components/material-wrap/button';

import './private-info.sass';

const mapDispatchToProps = dispatch =>
  bindActionCreators({ updateSpecData }, dispatch);

const mapStateToProps = ({ runtime }) => ({
  privateInfo: runtime.privateInfoData,
  countryList: runtime.countryList,
  currencyList: runtime.currencyList,
});
@connect(
  mapStateToProps,
  mapDispatchToProps,
)
@loading()
export default class PrivateInfoProfashional extends React.Component {
  constructor(props) {
    super(props);
    this.child = React.createRef();
    this.state = {
      forwardToNextStep: true,
    };
  }

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
        console.log('Error', err);
      });
  };

  handleSubmitForStepTwo = async values => {
    console.log('val', values);
    const { privateInfo } = this.props;
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
    if (
      get(resp, 'data.completed') &&
      !get(this.props, 'profashionalProfile.completed')
    ) {
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

  render() {
    console.log('THIS PROPS', this.props);
    const { forwardToNextStep } = this.state;
    return (
      <div className="private-info private-info-form-wrapper">
        <Grid container spacing={0} justify="center">
          <Grid item xs={12} sm={12}>
            <ModalHeader title="Private Info" className="test" />
            <div className="grid-stepper">
              <Grid className="grid" item xs={12} sm={10}>
                <Stepper ref={this.child} />
              </Grid>
            </div>
            <div className="grid-header">
              <Grid className="grid-header-title" item xs={12} sm={10}>
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
              <Grid className="grid-field-input" item xs={12} sm={10}>
                {forwardToNextStep ? (
                  <PrivateInfoStepOne
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
