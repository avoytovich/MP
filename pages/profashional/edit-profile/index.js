import React, { Component } from 'react';
import { get } from 'lodash';
import { withRouter } from 'next/router';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';

import { isILogined, amIProfashional } from '../../../services/accountService';
import { checkPhoto, sendPhoto } from '../../../services/photoService';
import loading from '../../../services/decorators/loading';
import { profashionals } from '../../../services/cruds';
import { Router } from '../../../routes';

import ModalHeader from '../../../components/modalHeader';
import EditProfile from '../../../forms/editProfile';

import './style.sass';
import withConfirmModal from '../../../services/decorators/withConfirmModal/index';

@loading(['profashionalProfile'])
@withRouter
@withConfirmModal('editProfile', 'cancel', 'ok')
export default class EditProfileProfashional extends Component {
  constructor(props) {
    super(props);
    this.coverInput = React.createRef();
    this.iconInput = React.createRef();
  }

  state = {
    coverUrl: {},
    iconUrl: {},
    isValidPhotos: false,
  };

  async componentWillMount() {
    if (!isILogined() && amIProfashional()) {
      Router.pushRoute('/');
    } else {
      await this.loadAndSave();
    }
  }

  loadAndSave = async () => {
    await this.props.loadData(
      profashionals.getWithId(this.props.router.query.id, '/profile'),
      {
        saveTo: 'profashionalProfile',
      },
    );
  };

  openFileDialog = refName => this[refName].current.click();

  fileCoverChange = e => {
    const file = e.target.files[0];
    if (checkPhoto(file)) {
      this.savePhotoToState(sendPhoto(file), 'coverUrl');
    }
  };

  fileIconChange = e => {
    const file = e.target.files[0];
    if (checkPhoto(file)) {
      this.savePhotoToState(sendPhoto(file), 'iconUrl');
    }
  };

  savePhotoToState = async (promise, name) => {
    const res = await promise;
    this.setState({ [name]: res.data });
  };

  handleSubmit = async values => {
    await this.props.loadData(
      profashionals.put(`${this.props.router.query.id}/profile`, {
        cityId: values.city,
        coverPhotoId:
          this.state.coverUrl.id ||
          get(this.props, 'profashionalProfile.coverPhoto.id'),
        currencyId: values.currency,
        currentRate: Number(values.hourlyRate) * 100,
        description: values.aboutMe,
        expersises: values.expersises,
        firstName: values.firstName,
        iconId:
          this.state.iconUrl.id ||
          get(this.props, 'profashionalProfile.icon.id'),
        languages: values.languages,
        occasions: values.occasion,
        slogan: values.slogan,
      }),
      { showSuccess: true },
    );
    Router.pushRoute(`/profashional/${this.props.router.query.id}`);
  };

  get initialValues() {
    const profashionalProfile = get(this.props, 'profashionalProfile') || {};
    const lang = profashionalProfile.languages || [{}];
    return {
      firstName:
        profashionalProfile.username || profashionalProfile.firstName || '',
      currency: get(profashionalProfile, 'currency.id') || '',
      hourlyRate: profashionalProfile.currentRate / 100 || '',
      slogan: profashionalProfile.slogan || '',
      aboutMe: profashionalProfile.description || '',
      expersises: profashionalProfile.expersises || '',
      occasion: profashionalProfile.occasions || '',
      city: get(profashionalProfile, 'city.id') || '',
      languages: lang.map(item => item.id),
    };
  }

  get coverPhotoStyle() {
    const coverUrl = this.state.coverUrl.path;
    const coverUrlFromServer = get(
      this.props,
      'profashionalProfile.coverPhoto.path',
    );
    return {
      border: coverUrl || coverUrlFromServer ? '' : 'dashed 1px #000000',
      backgroundImage:
        (coverUrl && `url(${coverUrl})`) ||
        (coverUrlFromServer && `url(${coverUrlFromServer})`) ||
        '',
    };
  }

  get renderIconPhoto() {
    return (
      this.state.iconUrl.path ||
      get(this.props, 'profashionalProfile.icon.path') ||
      '/static/svg/placeholder.svg'
    );
  }

  get getPhotoStatus() {
    const profile = this.props.profashionalProfile;
    const isCoverValid = Boolean(
      profile.coverPhoto || this.state.coverUrl.path,
    );
    const isIconValid = Boolean(profile.icon || this.state.iconUrl.path);
    return isCoverValid && isIconValid;
  }

  render() {
    return (
      (this.props.profashionalProfile || null) && (
        <div className="edit-profile-wrapper">
          <ModalHeader
            title="Edit Profile"
            onClose={() => this.props.openConfirm()}
          />
          <div className="cover-wrapper">
            <IconButton
              aria-label="Edit"
              onClick={() => this.openFileDialog('coverInput')}
              className="edit-button edit-cover icon-edit">
              <EditIcon />
            </IconButton>
            <div className="cover-body" style={this.coverPhotoStyle} />
            <div className="icon-wrapper">
              <div
                style={{
                  backgroundImage: `url(${this.renderIconPhoto})`,
                }}
                className="icon-image"
              />
              <IconButton
                aria-label="Edit"
                onClick={() => this.openFileDialog('iconInput')}
                className="edit-button edit-icon icon-edit">
                <EditIcon />
              </IconButton>
            </div>
          </div>
          <Grid
            container
            justify="center"
            direction="column"
            alignItems="center">
            <EditProfile
              {...this.initialValues}
              handleSubmit={this.handleSubmit}
              validPhotos={this.getPhotoStatus}
            />
          </Grid>
          <input
            type="file"
            style={{ display: 'none' }}
            ref={this.coverInput}
            onChange={this.fileCoverChange}
            accept="image/*"
          />
          <input
            type="file"
            style={{ display: 'none' }}
            ref={this.iconInput}
            onChange={this.fileIconChange}
            accept="image/*"
          />
        </div>
      )
    );
  }
}
