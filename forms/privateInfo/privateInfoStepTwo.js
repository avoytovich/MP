import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withFormik, Form, Field } from 'formik';
import { withRouter } from 'next/router';
import Grid from '@material-ui/core/Grid';

import { Router } from '../../routes';

import Input from '../../components/material-wrap/form/input/index';
import Button from '../../components/material-wrap/button';
import ButtonBases from '../../components/buttonBase/index';

import { updateSpecData } from '../../actions/updateData';
import i18n from '../../services/decorators/i18n';
import { privateInfo } from '../../constants/texts';
import { PrivateInfoSchema } from '../../services/validateSchemas';

import './privateInfo.sass';
import {
  checkPhoto,
  sendPhoto,
  getPhotoById,
} from '../../services/photoService';

const mapDispatchToProps = dispatch =>
  bindActionCreators({ updateSpecData }, dispatch);

@withRouter
@connect(
  null,
  mapDispatchToProps,
)
@withFormik({
  handleSubmit: (values, options) =>
    options.props.handleSubmit(values, options),

  //validationSchema: props => PrivateInfoSchema,
})
@i18n('errors')
export default class PrivateInfo extends React.Component {
  constructor(props) {
    super(props);
    this.front = React.createRef();
    this.back = React.createRef();
  }
  state = {
    front: {},
    back: {},
    frontId: '',
    backId: '',
  };
  openFileDialog = refName => this[refName].current.click();

  fileFrontChange = e => {
    const file = e.target.files[0];
    if (checkPhoto(file)) {
      this.savePhotoToState(sendPhoto(file, 'VERIFICATION_DOCUMENT'), 'front');
    }
  };

  fileBackChange = e => {
    const file = e.target.files[0];
    if (checkPhoto(file)) {
      this.savePhotoToState(sendPhoto(file, 'VERIFICATION_DOCUMENT'), 'back');
    }
  };

  savePhotoToState = async (promise, name) => {
    const res = await promise;
    const photo = await getPhotoById(res.data.id);
    this.setState({ [name]: photo, [`${name}Id`]: res.data.id });
    this.props.updateSpecData(
      {
        frontId: this.state.frontId,
        backId: this.state.backId,
      },
      'privateInfo',
    );
  };

  render() {
    const { inputFieldsForStepTwo } = privateInfo;
    const {
      touched,
      errors,
      translate,
      handleSubmit,
      handleBack,
      setFieldValue,
    } = this.props;
    return (
      <Form onSubmit={handleSubmit} className="private-info-form-wrapper">
        <Grid container justify="space-between">
          {inputFieldsForStepTwo.map((item, index) => {
            const { component, name, options } = item;
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
                  setFieldValue={setFieldValue}
                  options={options}
                  fullWidth
                  error={translate(errors[name])}
                  touched={touched[name]}
                  className="default-input "
                />
              </Grid>
            );
          })}
          <Grid
            className="grid-field-input-gap images-wrapper"
            item
            xs={12}
            sm={6}>
            <div
              className="front pointer"
              style={{
                backgroundImage: `url(${this.state.front})`,
              }}
              onClick={() => this.openFileDialog('front')}
            />
          </Grid>
          <Grid
            className="grid-field-input-gap images-wrapper"
            item
            xs={12}
            sm={6}>
            <div
              className="back pointer"
              style={{
                backgroundImage: `url(${this.state.back})`,
              }}
              onClick={() => this.openFileDialog('back')}
            />
          </Grid>
        </Grid>
        <div className="buttonStepTwo">
          <Button onClick={handleBack}>Back</Button>
          <Button type="submit">Save</Button>
        </div>
        <input
          type="file"
          style={{ display: 'none' }}
          ref={this.front}
          onChange={this.fileFrontChange}
          accept="image/*"
        />
        <input
          type="file"
          style={{ display: 'none' }}
          ref={this.back}
          onChange={this.fileBackChange}
          accept="image/*"
        />
      </Form>
    );
  }
}
