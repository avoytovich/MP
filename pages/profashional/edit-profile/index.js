import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

import { isILogined } from '../../../services/accountService';
import { Router } from '../../../routes';

import ModalHeader from '../../../components/modalHeader';

import './style.sass';

export default class EditProfileProfashional extends Component {
  componentDidMount() {
    if (!isILogined()) {
      Router.pushRoute('/');
    }
  }

  render() {
    return (
      <div className="edit-profile-wrapper">
        <ModalHeader title="Edit Profile" />
        <div className="cover-wrapper">
          <IconButton aria-label="Edit" className="edit-button edit-cover">
            <EditIcon />
          </IconButton>
          <div className="cover-body" />
          <div className="icon-wrapper">
            <div
              style={{
                backgroundImage: 'url(/static/svg/placeholder.svg)',
              }}
              className="icon-image"
            />
          </div>
        </div>
      </div>
    );
  }
}
