import React, { Component } from 'react';
import Slider from 'react-slick';
import CustomTypography from '../../../components/material-wrap/typography/index';

export default class GalleryItem extends Component {
  static defaultProps = {
    photos: null,
  };

  state = {
    nav1: React.createRef(),
    nav2: React.createRef(),
    current: null,
  };

  componentDidMount() {
    this.initState();
  }

  initState = () => {
    const index = this.props.index;
    if (index) {
      this.setState({ current: index + 1 });
      this.state.nav1.current.slickGoTo(index);
    }
  };

  setCurrent = index => {
    this.setState({ current: index + 1 });
  };

  get renderBigImages() {
    return this.props.photos.map(item => (
      <div className="photo-wrapper" key={item.id}>
        <div
          className="photo"
          style={{ backgroundImage: `url(${item.path})` }}
        />
      </div>
    ));
  }

  get renderSmallImages() {
    return this.props.photos.map(item => (
      <div className="photo-wrapper" key={item.id}>
        <div
          className="photo"
          style={{ backgroundImage: `url(${item.path})` }}
        />
      </div>
    ));
  }

  onNextArrowClick = () => this.state.nav1.current.slickNext();
  get nextArrow() {
    return (
      <img
        src="/static/svg/next.svg"
        className="arrow next pointer"
        onClick={this.onNextArrowClick}
      />
    );
  }

  onBackArrowClick = () => this.state.nav1.current.slickPrev();
  get backArrow() {
    return (
      <img
        className="arrow back pointer"
        src="/static/svg/back.svg"
        onClick={this.onBackArrowClick}
      />
    );
  }

  render() {
    if (!this.props.photos) return null;
    return (
      <div className="slider-wrapper">
        {this.backArrow}
        {this.nextArrow}
        <Slider
          className="big-slider"
          lazyLoad
          arrows={false}
          speed={400}
          asNavFor={this.state.nav2.current}
          afterChange={this.setCurrent}
          ref={this.state.nav1}>
          {this.renderBigImages}
        </Slider>
        <div className="separator">
          <CustomTypography
            className="text"
            variant="subheading"
            fontSize="20px">
            {this.state.current} / {this.props.photos.length}
          </CustomTypography>
          <img src="/static/svg/delete.svg" className="pointer" />
        </div>
        <Slider
          className="small-slider"
          lazyLoad
          arrows={false}
          speed={400}
          asNavFor={this.state.nav1.current}
          ref={this.state.nav2}
          slidesToShow={4}
          focusOnSelect>
          {this.renderSmallImages}
        </Slider>
      </div>
    );
  }
}
