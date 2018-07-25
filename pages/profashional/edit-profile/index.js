import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';

import { isILogined } from '../../../services/accountService';
import { checkPhoto, sendPhoto } from '../../../services/photoService';
import { Router } from '../../../routes';

import ModalHeader from '../../../components/modalHeader';
import EditProfile from '../../../forms/editProfile';

import './style.sass';

export default class EditProfileProfashional extends Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
  }

  componentDidMount() {
    if (!isILogined()) {
      Router.pushRoute('/');
    }
  }

  openFileDialog = () => this.fileInput.current.click();

  fileChange = e => {
    const file = e.target.files[0];
    if (checkPhoto(file)) {
      sendPhoto(file);
    }
  };

  handleSubmit = values => {
    console.log(values);
  };

  render() {
    return (
      <div className="edit-profile-wrapper">
        <ModalHeader title="Edit Profile" />
        <div className="cover-wrapper">
          <IconButton
            aria-label="Edit"
            onClick={this.openFileDialog}
            className="edit-button edit-cover icon-edit">
            <EditIcon />
          </IconButton>
          <div
            className="cover-body"
            style={{
              border: 'dashed 1px #000000',
            }}
          />
          <div className="icon-wrapper">
            <div
              style={{
                backgroundImage: 'url(/static/svg/placeholder.svg)',
              }}
              className="icon-image"
            />
            <IconButton
              aria-label="Edit"
              className="edit-button edit-icon icon-edit">
              <EditIcon />
            </IconButton>
          </div>
        </div>
        <Grid container justify="center" direction="column" alignItems="center">
          <EditProfile handleSubmit={this.handleSubmit} />
        </Grid>
        <input
          type="file"
          style={{ display: 'none' }}
          ref={this.fileInput}
          onChange={this.fileChange}
          accept="image/*"
        />
      </div>
    );
  }
}
