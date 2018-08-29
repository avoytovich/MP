import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withFormik, Form, Field } from 'formik';
import { withRouter } from 'next/router';

import { Router } from '../../routes';

import Input from '../../components/material-wrap/form/input/index';
import TextArea from '../../components/material-wrap/form/textArea/index';
import DropDown from '../../components/material-wrap/form/dropDown/index';
import Button from '../../components/material-wrap/button';

import { setData } from '../../actions/updateData';
import {
  currencies,
  languages,
  cities,
  expertise,
  occasions,
} from '../../services/cruds';
import i18n from '../../services/decorators/i18n';
import { EditProfileSchema } from '../../services/validateSchemas';

import './editProfile.sass';

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
  validationSchema: EditProfileSchema,
})
@i18n('errors')
export default class EditProfile extends React.Component {
  render() {
    const {
      handleSubmit,
      errors,
      touched,
      isValid,
      dirty,
      validPhotos,
      translate,
    } = this.props;
    return (
      <Form className="edit-profile-form" onSubmit={handleSubmit}>
        <div className="row-padding">
          <Field
            name="firstName"
            component={Input}
            fullWidth
            formHelper={30}
            error={translate(errors.firstName)}
            touched={touched.firstName}
            className="default-input"
            label="Username"
          />
        </div>
        <div className="two-inputs-row">
          <div className="input-column">
            <Field
              name="currency"
              component={DropDown}
              fullWidth
              type="currency"
              getFrom={() => currencies.get()}
              error={translate(errors.currency)}
              touched={touched.currency}
              className="default-input"
              label="Currency"
            />
          </div>
          <div className="input-column">
            <Field
              name="hourlyRate"
              component={Input}
              fullWidth
              placeholder="20.50"
              type="hourlyRate"
              infoIcon
              error={translate(errors.hourlyRate)}
              touched={touched.hourlyRate}
              className="default-input"
              label="Hourly Rate"
            />
          </div>
        </div>
        <div className="row-padding">
          <Field
            name="slogan"
            component={Input}
            fullWidth
            formHelper={50}
            error={translate(errors.slogan)}
            touched={touched.slogan}
            className="default-input"
            label="Your fashion slogan"
          />
        </div>
        <div className="row-padding">
          <Field
            name="aboutMe"
            component={TextArea}
            fullWidth
            multiline
            maxSize={350}
            error={translate(errors.aboutMe)}
            touched={touched.aboutMe}
            className="default-input"
            label="About me"
          />
        </div>
        <div className="two-inputs-row">
          <div className="input-column">
            <Field
              name="expertises"
              component={DropDown}
              fullWidth
              multiple
              getFrom={() => expertise.get()}
              error={translate(errors.expertises)}
              touched={touched.expertises}
              className="default-input"
              label="Expertise"
            />
          </div>
          <div className="input-column">
            <Field
              name="occasion"
              component={DropDown}
              fullWidth
              multiple
              getFrom={() => occasions.get()}
              error={translate(errors.occasion)}
              touched={touched.occasion}
              className="default-input"
              label="Occasion"
            />
          </div>
        </div>
        <div className="two-inputs-row">
          <div className="input-column">
            <Field
              name="city"
              component={DropDown}
              fullWidth
              getFrom={() => cities.get()}
              error={translate(errors.city)}
              touched={touched.city}
              className="default-input"
              label="Сity where I’m working"
            />
          </div>
          <div className="input-column">
            <Field
              name="languages"
              component={DropDown}
              fullWidth
              multiple
              getFrom={() => languages.get()}
              error={translate(errors.languages)}
              touched={touched.languages}
              className="default-input"
              label="Languages"
            />
          </div>
        </div>
        <div className="footer">
          <Button
            disabled={validPhotos && !dirty ? false : !(isValid && validPhotos)}
            type="submit">
            Save
          </Button>
        </div>
      </Form>
    );
  }
}
