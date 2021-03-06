import React, { Component } from 'react';
import { get } from 'lodash';
import { withRouter } from 'next/router';
import Grid from '@material-ui/core/Grid';

import { isILogined, amIProfashional } from '../../../services/accountService';
import { checkPhoto, sendPhoto } from '../../../services/photoService';
import loading from '../../../services/decorators/loading';
import { profashionals } from '../../../services/cruds';
import { setLocale } from '../../../services/serverService';
import { Router } from '../../../routes';

import ModalHeader from '../../../components/modalHeader';
import ProfashionalIconWithCover from '../../../components/profashionalIconWithCover';
import EditProfile from '../../../forms/editProfile';

import withConfirmModal from '../../../services/decorators/withConfirmModal/index';
import withModal from '../../../services/decorators/withModal/index';

@loading(['profashionalProfile'])
@withRouter
@withModal(
  'Thank you for filling the information! Admin will contact you shortly',
  props => Router.pushRoute(`/profashional/${props.router.query.id}`),
)
@withConfirmModal('editProfile', 'no', 'yes', props =>
  Router.pushRoute(`/profashional/${props.router.query.id}`),
)
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
    const oldCompleted = get(this.props, 'profashionalProfile.completed');
    const resp = await this.props.loadData(
      profashionals.put(`${this.props.router.query.id}/profile`, {
        cityId: values.city,
        coverPhotoId:
          this.state.coverUrl.id ||
          get(this.props, 'profashionalProfile.coverPhoto.id'),
        currencyId: values.currency,
        currentRate: Number(values.hourlyRate) * 100,
        description: values.aboutMe,
        expertiseIds: values.expertises,
        firstName: values.firstName,
        iconId:
          this.state.iconUrl.id ||
          get(this.props, 'profashionalProfile.icon.id'),
        languages: values.languages,
        occasionIds: values.occasion,
        slogan: values.slogan,
      }),
      { showSuccess: 'Updated', saveTo: 'profashionalProfile' },
    );
    setLocale('avaUrl', resp.data.icon.path);
    if (get(resp, 'data.completed') && !oldCompleted) {
      this.props.openModal();
    } else {
      Router.pushRoute(`/profashional/${this.props.router.query.id}`);
    }
  };

  get initialValues() {
    const profashionalProfile = get(this.props, 'profashionalProfile') || {};
    const lang = profashionalProfile.languages || [{}];
    const exper = profashionalProfile.expertises || [{}];
    const occas = profashionalProfile.occasions || [{}];
    return {
      firstName:
        profashionalProfile.username || profashionalProfile.firstName || '',
      currency: get(profashionalProfile, 'currency.id') || '',
      hourlyRate: profashionalProfile.currentRate / 100 || '',
      slogan: profashionalProfile.slogan || '',
      aboutMe: profashionalProfile.description || '',
      expertises: exper.map(i => i.id),
      occasion: occas.map(i => i.id),
      city: get(profashionalProfile, 'city.id') || '',
      languages: lang.map(item => item.id),
    };
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
    if (!this.props.profashionalProfile) return null;
    return (
      <div className="edit-profile-wrapper">
        <ModalHeader
          title="Edit Profile"
          onClose={() => this.props.openConfirm()}
        />
        <ProfashionalIconWithCover
          openFileDialog={this.openFileDialog}
          coverUrl={this.state.coverUrl}
          iconUrl={this.state.iconUrl}
          profashionalProfile={this.props.profashionalProfile}
          isEdit
        />
        <Grid container justify="center" direction="column" alignItems="center">
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
    );
  }
}
