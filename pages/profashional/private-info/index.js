import React from 'react';
import Grid from '@material-ui/core/Grid';

import Stepper from '../../../components/stepper/index';
import ModalHeader from '../../../components/modalHeader';
import Typography from '../../../components/material-wrap/typography';
import PrivateInfo from '../../../forms/privateInfo';

import './private-info.sass';
import { updateSpecData } from '../../../actions/updateData';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const mapDispatchToProps = dispatch =>
  bindActionCreators({ updateSpecData }, dispatch);

const mapStateToProps = ({ runtime }) => ({
  privateInfo: runtime,
});
@connect(
  mapStateToProps,
  mapDispatchToProps,
)
export default class PrivateInfoProfashional extends React.Component {
  /* constructor(props) {
    super(props);
    this.state = {
      private-info: true,
    };
  }*/

  handleSubmit = values => {
    this.props.updateSpecData(values, 'privateInfo');
    const stripe = Stripe('pk_test_opVhyp1UCaDDjQ5riDJapXY3');
    const { country, currency, firstName, lastName, bankAccountNumber } = values;
    const information = {
      bank_account: {
        country,
        currency,
        account_holder_name: `${firstName} ${lastName}`,
        account_holder_type: 'individual',
        account_number: bankAccountNumber,
      },
    };
    stripe.createToken('bank_account', {
      country: 'US',
      currency: 'usd',
      routing_number: '110000000',
      account_number: '000123456789',
      account_holder_name: 'Jenny Rosen',
      account_holder_type: 'individual',
    }).then(function(result) {
      console.log('result', result);
      // Handle result.error or result.token
    });
  };

  render() {
    return (
      <div className="private-info">
        <Grid container spacing={0} justify="center">
          <Grid item xs={12} sm={12}>
            <ModalHeader title="Private Info" className="test" />
            <div className="grid-stepper">
              <Grid className="grid" item xs={12} sm={10}>
                <Stepper />
              </Grid>
            </div>
            <div className="grid-header">
              <Grid className="grid-header-title" item xs={12} sm={10}>
                <Typography variant="title" fontSize="20px">
                  Please provide your Private information
                </Typography>
              </Grid>
            </div>
            <div className="grid-field">
              <Grid className="grid-field-input" item xs={12} sm={10}>
                <PrivateInfo handleSubmit={this.handleSubmit} />
              </Grid>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}
