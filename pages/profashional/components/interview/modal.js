import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { get } from 'lodash';
import { withRouter } from 'next/router';

import Grid from '@material-ui/core/Grid';

import { Router } from '../../../../routes';

import { interview, account } from '../../../../services/cruds';
import i18n from '../../../../services/decorators/i18n';
import { updateSpecData } from '../../../../actions/updateData';

import InterviewForm from '../../../../forms/interview';
import Typography from '../../../../components/material-wrap/typography';

import './interview.scss';

const mapStateToProps = ({ runtime }) => ({
  profashionalAccount: runtime.profashionalAccountData || {},
});

const mapDispatchToProps = (dispatch, props) =>
  bindActionCreators({ updateSpecData }, dispatch);

@withRouter
@i18n()
@connect(
  mapStateToProps,
  mapDispatchToProps,
)
export default class InterviewModal extends Component {
  sendInterview = async values => {
    try {
      await interview.post({
        description: values.description,
        profashionalId: get(
          this.props.profashionalAccount,
          'userExtra.profashional.id',
        ),
      });
      const accountResp = await account.get();
      this.props.updateSpecData(accountResp.data, 'profashionalAccount');
      Router.pushRoute('/profashional');
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
        className="interview-modal">
        <Typography variant="title" fontSize="24px" className="header">
          Thank you for having entered your personal data!
        </Typography>
        <InterviewForm handleSubmit={this.sendInterview} />
      </Grid>
    );
  }
}
