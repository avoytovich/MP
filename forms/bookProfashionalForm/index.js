import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withFormik, Form, Field } from 'formik';
import moment from 'moment';
import { withRouter } from 'next/router';

import { Router } from '../../routes';

import Button from '../../components/material-wrap/button';
import CheckboxRadio from '../../components/material-wrap/form/checkboxRadio';

import { setData } from '../../actions/updateData';
import FromTo from '../fromTo';
import i18n from '../../services/decorators/i18n';
import { checkAvailability } from '../../services/validateSchemas';

import './bookProfashional.sass';

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
  validationSchema: checkAvailability,
})
@i18n('errors')
export default class BookProfashionalForm extends React.Component {
  state = {
    showSuggestForm: false,
  };

  componentDidUpdate(prevProps) {
    if (
      prevProps.selectedDay &&
      +prevProps.selectedDay !== +this.props.selectedDay
    )
      this.props.resetForm();
  }

  get renderList() {
    return this.props.slot.timeSlots.map((timeSlot, i) => {
      const arrDate = this.props.slot.date.split('-');
      arrDate[1] = Number(arrDate[1]) - 1;
      return (
        <div className="time-slot-item" key={i}>
          <Field
            name="time"
            component={CheckboxRadio}
            id={i}
            className="checkbox-wrapper"
            checkboxStyle="checkbox-item"
            setFieldValue={this.props.setFieldValue}
            label={`${moment(
              arrDate.concat([
                Math.floor(timeSlot.startTime / 60),
                timeSlot.startTime % 60,
              ]),
            ).format('HH:mm')} -
                ${moment(
                  arrDate.concat([
                    Math.floor(timeSlot.endTime / 60),
                    timeSlot.endTime % 60,
                  ]),
                ).format('HH:mm')}`}
          />
        </div>
      );
    });
  }

  onSuggest = () => {
    this.setState({ showSuggestForm: !this.state.showSuggestForm });
  };

  render() {
    const { handleSubmit, isValid, button } = this.props;
    return (
      <Form
        className="book-profashional"
        onSubmit={!this.state.showSuggestForm && handleSubmit}>
        {this.renderList}
        {!this.state.showSuggestForm && (
          <div className="book-profashional-button-container">
            <Button
              type="button"
              onClick={this.onSuggest}
              buttonFontSize="12px"
              className="suggest-button">
              suggest time
            </Button>
            {this.props.slot.timeSlots.length > 0 && (
              <Button disabled={!isValid} type="submit">
                Book
              </Button>
            )}
          </div>
        )}
        {this.state.showSuggestForm && (
          <FromTo
            handleSubmit={this.props.fromToSubmit}
            className="selected-days"
            count={1}
            onCancel={this.onSuggest}
            selectedDays={[]}
          />
        )}
      </Form>
    );
  }
}
