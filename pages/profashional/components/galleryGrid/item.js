import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Typography from '../../../../components/material-wrap/typography';

export default class ItemGallery extends Component {
  static propTypes = {
    onLoadClick: PropTypes.func.isRequired,
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
        }}>
        {this.props.index === 0 && (
          <div className="cover pointer" onClick={this.props.onLoadClick}>
            <img src="/static/svg/addPhoto.svg" />
            <Typography className="text" fontSize="18px" variant="title">
              Add some additional photos of your work.
            </Typography>
          </div>
        )}
      </div>
    );
  }
}
