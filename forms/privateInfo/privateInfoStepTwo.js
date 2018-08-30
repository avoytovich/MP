import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withFormik, Form, Field } from 'formik';
import { withRouter } from 'next/router';
import Grid from '@material-ui/core/Grid';

import { Router } from '../../routes';

import Input from '../../components/material-wrap/form/input/index';
import Button from '../../components/material-wrap/button';
import Typography from '../../components/material-wrap/typography';

import { resetData, updateSpecData } from '../../actions/updateData';
import i18n from '../../services/decorators/i18n';
import { privateInfo } from '../../constants/texts';
import { PrivateInfoSchemaStepTwo } from '../../services/validateSchemas';

import './privateInfo.sass';
import {
  checkPhoto,
  sendPhoto,
  getPhotoById,
} from '../../services/photoService';

const mapDispatchToProps = dispatch =>
  bindActionCreators({ updateSpecData }, dispatch);

const mapStateToProps = ({ runtime }) => ({
  privateInfoStepTwo: runtime.privateInfoData,
  //countryList: runtime.countryList,
});

@withRouter
@connect(
  mapStateToProps,
  mapDispatchToProps,
)
@withFormik({
  handleSubmit: (values, options) =>
    options.props.handleSubmit(values, options),

  validationSchema: props => PrivateInfoSchemaStepTwo,
})
@i18n('errors')
export default class PrivateInfo extends React.Component {
  constructor(props) {
    super(props);
    this.front = React.createRef();
    this.back = React.createRef();
  }
  state = {
    front: '',
    back: '',
    frontId: '',
    backId: '',
    infoStepTwo: {
      frontImage: this.props.privateInfoStepTwo.front || '',
      backImage: this.props.privateInfoStepTwo.back || '',
    },
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
    const { frontId, front, backId, back } = this.state;
    const { privateInfoStepTwo } = this.props;
    this.setState({ [name]: photo, [`${name}Id`]: res.data.id });
    const body = {};
    body[`${name}Id`] = this.state[`${name}Id`] || privateInfoStepTwo[`${name}Id`];
    body[name] = this.state[name] || privateInfoStepTwo[name];
    this.props.updateSpecData(body, 'privateInfo');
    /*this.props.updateSpecData(
      {
        frontId: frontId || privateInfoStepTwo.frontId,
        front: front || privateInfoStepTwo.front,
        backId: backId || privateInfoStepTwo.backId,
        back: back || privateInfoStepTwo.back,
      },
      'privateInfo',
    );*/
    /*const body = {};
    this.state.frontId ? (body.frontId = this.state.frontId) : null;
    this.state.front ? (body.front = this.state.front) : null;
    this.state.backId ? (body.backId = this.state.backId) : null;
    this.state.back ? (body.back = this.state.back) : null;
    this.props.updateSpecData(body, 'privateInfo');*/
  };

  get statusEnableOrDisable() {
    const { frontId, backId } = this.state;
    const {
      isValid,
      initialValues: { privateInfoStepTwo },
      gender,
      dob,
    } = this.props;
    return !(
      (frontId && backId && isValid) ||
      (gender && dob && privateInfoStepTwo.backId && privateInfoStepTwo.frontId)
    );
  }

  render() {
    // console.log('this.props', this.props);
    // console.log('this.state', this.state);
    const { inputFieldsForStepTwo } = privateInfo;
    const {
      frontId,
      backId,
      infoStepTwo: { frontImage, backImage },
    } = this.state;
    const {
      touched,
      errors,
      translate,
      handleSubmit,
      handleBack,
      setFieldValue,
      isValid,
      values,
      privateInfoStepTwo: { front, back },
      initialValues: { privateInfoStepTwo },
      gender,
      dob,
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
            <div className="wrapped">
              <div
                className="front pointer"
                style={{
                  backgroundImage:
                    (this.state.front && `url(${this.state.front})`) ||
                    (frontImage && `url(${frontImage})`),
                }}
                onClick={() => this.openFileDialog('front')}>
                {!frontId &&
                  !front &&
                  !frontImage && (
                    <Typography
                      className="card-side"
                      fontSize="18px"
                      variant="title">
                      + Add Front
                    </Typography>
                  )}
              </div>
            </div>
          </Grid>
          <Grid
            className="grid-field-input-gap images-wrapper"
            item
            xs={12}
            sm={6}>
            <div className="wrapped">
              <div
                className="back pointer"
                style={{
                  backgroundImage:
                    (this.state.back && `url(${this.state.back})`) ||
                    (backImage && `url(${backImage})`),
                  //(this.state.back && `url(${this.state.back})`),
                }}
                onClick={() => this.openFileDialog('back')}>
                {!backId &&
                  !back &&
                  !frontImage && (
                    <Typography
                      className="card-side"
                      fontSize="18px"
                      variant="title">
                      + Add Back
                    </Typography>
                  )}
              </div>
            </div>
          </Grid>
        </Grid>
        <div className="buttonStepTwo">
          <Button
            className="buttonsPrivateInfo"
            onClick={() =>
              handleBack({
                gender: values.gender,
                dob: values.birthday || dob,
              })
            }>
            Back
          </Button>
          <Button
            className="buttonsPrivateInfo"
            type="submit"
            disabled={this.statusEnableOrDisable}>
            Save
          </Button>
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
