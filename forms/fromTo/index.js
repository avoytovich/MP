import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withFormik, Form, Field } from 'formik';
import { withRouter } from 'next/router';

import { Router } from '../../routes';

import TimePicker from '../../components/material-wrap/form/timePicker';
import Button from '../../components/material-wrap/button';

import { setData } from '../../actions/updateData';
import { fromTo } from '../../services/validateSchemas';
import i18n from '../../services/decorators/i18n';

import './fromTo.sass';

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
  validationSchema: undefined,
})
@i18n('errors')
export default class FromToForm extends React.Component {
  componentDidUpdate(prevProps) {
    if (prevProps.count !== this.props.count && this.props.count === 0)
      this.props.resetForm();
  }

  get renderList() {
    const { errors, touched, setFieldValue } = this.props;
    const fieldsList = [];
    for (let i = 0; i < this.props.count; i++) {
      fieldsList.push(
        <div className="field-container" key={i}>
          <Field
            name={`from${i}`}
            component={TimePicker}
            setFieldValue={setFieldValue}
            error={errors[`from${i}`]}
            touched={touched[`from${i}`]}
            label="From"
          />
          <Field
            name={`to${i}`}
            component={TimePicker}
            setFieldValue={setFieldValue}
            error={errors[`to${i}`]}
            touched={touched[`to${i}`]}
            label="To"
          />
        </div>,
      );
    }
    return fieldsList;
  }

  render() {
    const { handleSubmit, isValid, button } = this.props;
    return (
      <Form className="from-to-form" onSubmit={handleSubmit}>
        {this.renderList}
        {this.props.selectedDays.length > 1 && button}
        {this.props.count > 0 && (
          <div className="from-to-form-button-container">
            <Button
              type="button"
              onClick={this.props.onCancel}
              className="cancel-button">
              cancel
            </Button>
            <Button type="submit">OK</Button>
          </div>
        )}
      </Form>
    );
  }
}
