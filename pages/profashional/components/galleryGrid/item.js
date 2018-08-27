import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Typography from '../../../../components/material-wrap/typography';
import i18n from '../../../../services/decorators/i18n';

@i18n('common')
export default class ItemGallery extends Component {
  static propTypes = {
    onLoadClick: PropTypes.func.isRequired,
    onPhotoClick: PropTypes.func.isRequired,
  };

  get itemStyle() {
    const photo = this.props.photo || {};
    return 'item ' + (photo.path ? 'pointer' : '');
  }

  render() {
    const photo = this.props.photo || {};
    return (
      <div
        className={this.itemStyle}
        style={{
          border: !photo.path ? 'dashed 1px #979797' : 'none',
          backgroundImage: `url(${photo.path})`,
        }}
        onClick={() => photo.path && this.props.onPhotoClick(this.props.index)}>
        {this.props.index === 0 &&
          this.props.showUpload && (
            <div
              className="cover pointer"
              onClick={e => {
                e.stopPropagation();
                this.props.onLoadClick(e);
              }}
              style={{
                backgroundColor: photo.path ? 'rgba(0,0,0,0.5)' : '',
              }}>
              {photo.path ? (
                <img src="/static/svg/whiteAddPhoto.svg" />
              ) : (
                <img src="/static/svg/addPhoto.svg" />
              )}
              <Typography
                className={'text ' + (photo.path ? 'with-path' : '')}
                fontSize="18px"
                variant="title">
                {this.props.translate('addSomePhoto')}
              </Typography>
            </div>
          )}
        {this.props.index === 7 &&
          this.props.size > 8 && (
            <div
              className="cover pointer"
              style={{
                backgroundColor: photo.path ? 'rgba(0,0,0,0.5)' : '',
              }}>
              <Typography
                className="text with-path"
                fontSize="24px"
                variant="title">
                {`+ ${this.props.size - 8}`}
              </Typography>
            </div>
          )}
      </div>
    );
  }
}
