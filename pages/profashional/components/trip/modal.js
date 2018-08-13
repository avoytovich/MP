import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'next/router';

import Grid from '@material-ui/core/Grid';

import { Router } from '../../../../routes';

import { bookings } from '../../../../services/cruds';
import i18n from '../../../../services/decorators/i18n';
import { updateSpecData } from '../../../../actions/updateData';

import TripForm from '../../../../forms/tripCode';
import Typography from '../../../../components/material-wrap/typography';

import './trip.sass';
import loading from '../../../../services/decorators/loading';

const mapStateToProps = ({ runtime }) => ({
  profashionalAccount: runtime.profashionalAccountData || {},
});

const mapDispatchToProps = (dispatch, props) =>
  bindActionCreators({ updateSpecData }, dispatch);

@loading()
@withRouter
@i18n('modalHeaders')
@connect(
  mapStateToProps,
  mapDispatchToProps,
)
export default class TripModal extends Component {
  sendTrip = async values => {
    try {
      await this.props.loadData(
        bookings.post(
          {
            code: values.code,
          },
          '/code',
        ),
        {
          showSuccess: this.props.translate('startedTrip', 'popups'),
          showError: true,
        },
      );
      this.props.onClose();
    } catch (e) {
      console.error(e);
    }
  };

  render() {
    return (
      <Grid
        container
        justify="center"
        direction="column"
        alignItems="center"
        className="trip-modal">
        <Typography variant="title" fontSize="24px" className="header">
          {this.props.translate('enterCode')}
        </Typography>
        <TripForm handleSubmit={this.sendTrip} />
      </Grid>
    );
  }
}
