import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { withRouter } from 'next/router';

import { isMobile } from '../../../../services/windowService';
import { profashionals } from '../../../../services/cruds';
import loading from '../../../../services/decorators/loading';
import { checkPhoto, sendPhoto } from '../../../../services/photoService';

import Item from './item';

import './style.sass';

@withRouter
@loading()
export default class GalleryGrid extends Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
  }

  static propTypes = {
    photos: PropTypes.array.isRequired,
    onPhotoClick: PropTypes.func.isRequired,
  };

  static defaultProps = {
    photos: [],
  };

  onLoadClick = () => this.fileInput.current.click();

  fileChange = e => {
    const file = e.target.files[0];
    if (checkPhoto(file)) {
      this.savePhotoToState(sendPhoto(file));
    }
  };

  savePhotoToState = async promise => {
    console.log(this.props.name);
    const res = await promise;
    const newPhotosArray = [...this.props.photos, res.data];
    this.props.loadData(
      profashionals.patch(`${this.props.router.query.id}/galleryPhotos`, {
        galleryPhotos: newPhotosArray.map(element => element.id),
      }),
      {
        saveTo: this.props.name,
        setData: true,
      },
    );
  };

  get renderItems() {
    return new Array(isMobile() ? 6 : 8)
      .fill(null)
      .map((item, i) => (
        <Item
          key={i}
          photo={get(this.props, `photos[${i}]`)}
          index={i}
          onPhotoClick={this.props.onPhotoClick}
          onLoadClick={this.onLoadClick}
        />
      ));
  }

  render() {
    return (
      <div className="gallery-wrapper">
        {this.renderItems}
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
