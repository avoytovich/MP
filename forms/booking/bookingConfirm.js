import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withFormik, Form, Field } from 'formik';
import { withRouter } from 'next/router';
import Grid from '@material-ui/core/Grid';

import { Router } from '../../routes';

import Input from '../../components/material-wrap/form/input/index';
import Button from '../../components/material-wrap/button';

import { setData, updateSpecData } from '../../actions/updateData';
import i18n from '../../services/decorators/i18n';
import { bookingLabels } from '../../constants/bookingLabels';

import './bookingDetails.sass';
import Typography from '../../components/material-wrap/typography';

const mapDispatchToProps = dispatch =>
  bindActionCreators({ setData }, dispatch);

@withRouter
@connect(
  null,
  mapDispatchToProps,
)
@withFormik({
  handleSubmit: (values, options) => {
    options.props.handleSubmit(values, options);
  },
})
@i18n('booking')
export default class Confirm extends React.Component {
  render() {
    const { inputFieldsForConfirm } = bookingLabels;
    const {
      touched,
      handleSubmit,
      handleBack,
      setFieldValue,
      isValid,
      dirty,
    } = this.props;

    return (
      <Form onSubmit={handleSubmit} className="trip-details-form-wrapper">
        <div className="grid-header">
          <Grid className="grid-header-title" item xs={12} sm={12}>
            <Typography variant="title" fontSize="20px">
              {this.props.translate('checkout', 'booking')}
            </Typography>
          </Grid>
        </div>
        <Grid container>
          {inputFieldsForConfirm.map((item, index) => {
            const { component, name, sm, additionalClass } = item;
            return (
              <Grid
                key={index}
                className="grid-field-input-gap"
                item
                xs={12}
                sm={sm || 6}>
                <Field
                  {...item}
                  component={component || Input}
                  dirty
                  setFieldValue={
                    // [...this.initialValues]
                    setFieldValue
                  }
                  touched={touched[name]}
                  className={`default-input ${additionalClass}`}
                  disabled
                />
              </Grid>
            );
          })}
        </Grid>

        <div className="buttons-cnt buttonStepTwo">
          <Button className="buttonsBookingDetails" onClick={handleBack}>
            {this.props.translate('back')}
          </Button>
          <Button
            className="buttonsBookingDetails"
            type="submit"
            // disabled={this.props.privateInfo && !dirty ? false : !isValid}
          >
            {this.props.translate('book')}
          </Button>
        </div>
      </Form>
    );
  }
}
