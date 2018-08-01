import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withFormik, Form, Field } from 'formik';
import { withRouter } from 'next/router';
import Grid from '@material-ui/core/Grid';

import { Router } from '../../routes';

import Input from '../../components/material-wrap/form/input/index';
import Button from '../../components/material-wrap/button';

import { setData } from '../../actions/updateData';
import i18n from '../../services/decorators/i18n';
import { privateInfo } from '../../constants/texts';
import { PrivateInfoSchema } from '../../services/validateSchemas';

import './privateInfo.sass';

const mapDispatchToProps = dispatch =>
  bindActionCreators({ setData }, dispatch);

@withRouter
@connect(
  null,
  mapDispatchToProps,
)
@withFormik({
  handleSubmit: (values, options) =>
    options.props.handleSubmit(values, options),

  validationSchema: props => PrivateInfoSchema,
})
@i18n('errors')
export default class PrivateInfo extends React.Component {
  render() {
    const { inputFieldsForStepOne } = privateInfo;
    const {
      touched,
      errors,
      translate,
      handleSubmit,
      setFieldValue,
      isValid,
    } = this.props;
    return (
      <Form onSubmit={handleSubmit} className="private-info-form-wrapper">
        <Grid container>
          {inputFieldsForStepOne.map((item, index) => {
            const { component, name } = item;
            return (
              <Grid
                key={index}
                className="grid-field-input-gap"
                item
                xs={12}
                sm={6}>
                <Field
                  {...item}
                  component={component || Input}
                  fullWidth
                  setFieldValue={
                    /* ...this.initialValues ||*/
                    setFieldValue
                  }
                  error={translate(errors[name])}
                  touched={touched[name]}
                  className="default-input "
                />
              </Grid>
            );
          })}
        </Grid>
        <div className="buttonStepOne">
          {
            <Button type="submit" disabled={!isValid}>
              Continue
            </Button>
          }
        </div>
      </Form>
    );
  }
}
