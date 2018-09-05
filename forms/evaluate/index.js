import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withFormik, Form, Field } from 'formik';
import { withRouter } from 'next/router';
import NoSSR from 'react-no-ssr';

import { Router } from '../../routes';

import { isMobile } from '../../services/windowService';

import Radio from '../../components/material-wrap/form/radio/index';
import Range from '../../components/rangePicker';
import Rate from '../../components/rate';
import TextArea from '../../components/material-wrap/form/textArea/index';

import { setData } from '../../actions/updateData';
import i18n from '../../services/decorators/i18n';
import { RateSchema } from '../../services/validateSchemas';
import CustomTypography from '../../components/material-wrap/typography/index';

import './evaluate.sass';

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
  validationSchema: RateSchema,
})
@i18n('evaluate')
export default class Evaluate extends React.Component {
  get renderScaleFrom() {
    if (!isMobile(750)) {
      return (
        <>
          <div className="scale-from-rate-wrapper">
            {new Array(10)
              .fill(null)
              .map((item, index) => (
                <Field
                  key={index}
                  name="myProfashionalRecomending"
                  component={Radio}
                  onlyClassName="evaluate-grid-radio"
                  id={`${index}`}
                />
              ))}
          </div>
          <div className="recommendation-wrapper">
            <CustomTypography variant="subheading">
              {this.props.translate('notLike')}
            </CustomTypography>
            <CustomTypography variant="subheading">
              {this.props.translate('like')}
            </CustomTypography>
          </div>
        </>
      );
    }
    return (
      <div className="range-evaluate">
        <Field name="myProfashionalRecomending" component={Range} label="Yes" />
      </div>
    );
  }

  render() {
    const {
      handleSubmit,
      errors,
      setFieldValue,
      touched,
      isValid,
      dirty,
      validPhotos,
      translate,
    } = this.props;
    console.log(errors);
    return (
      <Form className="evaluate-grid" onSubmit={handleSubmit}>
        <div className="material-border was-your-trip-success-wrapper with-margin-bottom">
          <CustomTypography
            fontSize="30px"
            variant="subheading"
            className="title">
            {translate('wasSuccess')}
          </CustomTypography>
          <div className="evaluate-grid-radio-wrapper">
            <Field
              name="wasSuccess"
              component={Radio}
              onlyClassName="evaluate-grid-radio"
              id="yes"
              setFieldValue={setFieldValue}
              label="Yes"
            />
            <Field
              name="wasSuccess"
              component={Radio}
              onlyClassName="evaluate-grid-radio"
              setFieldValue={setFieldValue}
              id="no"
              label="No"
            />
          </div>
        </div>
        <div className="material-border how-would-you-rate with-margin-bottom">
          <CustomTypography
            fontSize="30px"
            variant="subheading"
            className="title">
            {translate('howWouldYouRate')}
            $name
            {translate('forTheService')}
          </CustomTypography>
          <div className="evaluate-grid-rate-wrapper">
            <Field
              name="rate"
              component={Rate}
              onlyClassName="evaluate-grid-radio"
              setFieldValue={setFieldValue}
              label="Yes"
            />
          </div>
          <Field
            name="comment"
            error={errors.comment || errors.rate}
            component={TextArea}
            maxSize={150}
            classNameWrapper="text-area-evaluate"
            label="Comment"
          />
        </div>
        <div className="material-border scale-from with-margin-bottom">
          <CustomTypography
            fontSize="30px"
            variant="subheading"
            className="title">
            {translate('scaleFrom')}
          </CustomTypography>
          <NoSSR>{this.renderScaleFrom}</NoSSR>
        </div>
        <div className="evaluate-grid-footer with-margin-bottom">
          <button type="submit">Submit my Rating</button>
          <CustomTypography
            fontSize="24px"
            variant="subheading"
            className="subheading">
            {translate('otherFeedback')}
          </CustomTypography>
          <CustomTypography
            fontSize="30px"
            variant="subheading"
            className="with-margin-bottom contact-us">
            {translate('contactUs')}
          </CustomTypography>
        </div>
      </Form>
    );
  }
}
