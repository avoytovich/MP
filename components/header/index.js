import React, { Component } from 'react';
import { withRouter } from 'next/router';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import Reorder from '@material-ui/icons/Reorder';
import Close from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Popover from '@material-ui/core/Popover';
import MenuItem from '@material-ui/core/MenuItem';
import NoSSR from 'react-no-ssr';

import { Router } from '../../routes';

import i18n from '../../services/decorators/i18n';
import { clear, getLocale, changeQuery } from '../../services/serverService';
import {
  isILogined,
  getMyFirstAndLastName,
  getMyPhoto,
  amIProfashional,
  myRoleIs,
} from '../../services/accountService';

import * as constants from '../../constants/landing/menu';
import CustomTypography from '../material-wrap/typography/index';

import './header.sass';
import withConfirmModal from '../../services/decorators/withConfirmModal/index';

@withRouter
@withConfirmModal('wantLogOut', 'no', 'yes', () => {
  clear();
  Router.pushRoute('/');
})
@i18n('menu')
export default class Header extends Component {
  static propTypes = {
    openConfirm: PropTypes.func,
    point: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
    color: PropTypes.bool,
    style: PropTypes.object,
    navStyle: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.target = React.createRef();
  }
  state = {
    opened: false,
    menuOpen: false,
  };

  burgerToggle = () => {
    this.setState({
      opened: !this.state.opened,
    });
  };

  toggleDropDownDesktop = () => {
    this.setState({
      menuOpen: !this.state.menuOpen,
    });
  };

  onClick = href => {
    console.log('newUrl', changeQuery(this.props.router, 'modal', href));
    Router.pushRoute(changeQuery(this.props.router, 'modal', href));
  };

  onMenuClick = name => {
    switch (name) {
      case 'logOut':
        this.props.openConfirm();
        break;
      case 'home':
        Router.pushRoute('/');
        break;
      case 'privateInfo':
        Router.pushRoute(`/profashional/${getLocale('id')}/private-info`);
        break;
      case 'profile':
        Router.pushRoute(`/profashional/${getLocale('id')}`);
        break;
      case 'editProfile':
        Router.pushRoute(`/profashional/${getLocale('id')}/edit-profile`);
        break;
    }

    this.state.menuOpen && this.toggleDropDownDesktop();
  };

  renderPoint = option => {
    const point = this.props.point;
    if (point && ~point.indexOf(option.translateVariable)) {
      return <div className="point" />;
    }
    return null;
  };

  get renderDesktopLinks() {
    if (!isILogined()) {
      return constants.menuProps.map((element, key) => {
        return (
          <Typography
            variant="subheading"
            className="menu-item"
            style={{ color: this.props.color ? 'black' : 'white' }}
            key={key}
            onClick={() => this.onClick(element.href)}>
            {this.props.translate(element.translateVariable)}
          </Typography>
        );
      });
    }
    // IF USER IS LOGINED
    return (
      <div
        className="header-logined-wrapper pointer"
        onClick={this.toggleDropDownDesktop}>
        <div
          className="header-avatar"
          style={{ backgroundImage: `url(${getMyPhoto()})` }}>
          {get(this.props, 'point.length') > 0 && <div className="point" />}
        </div>
        <CustomTypography
          fontSize="18px"
          className={this.props.color ? '' : 'white'}>
          {getMyFirstAndLastName()}
        </CustomTypography>
        <div
          className="header-arrow-down"
          style={{ borderTopColor: this.props.color ? 'black' : 'white' }}
        />
        <Popover
          anchorEl={this.target.current}
          open={this.state.menuOpen}
          onClose={this.toggleDropDownDesktop}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}>
          {constants[`${myRoleIs()}Options`].map((option, index) => (
            <MenuItem
              key={index}
              onClick={() => this.onMenuClick(option.translateVariable)}
              className="header-menu-item">
              {this.props.translate(option.translateVariable)}
              {this.renderPoint(option)}
            </MenuItem>
          ))}
        </Popover>
        <div className="header-hidden-target" ref={this.target} />
      </div>
    );
  }

  get renderMobileLinks() {
    if (!isILogined()) {
      return constants.menuProps.map((element, key) => {
        return (
          <Typography
            onClick={() => this.onClick(element.href)}
            variant="subheading"
            className="menu-item mobile"
            key={key}>
            {this.props.translate(element.translateVariable)}
          </Typography>
        );
      });
    }
    return constants[`${myRoleIs()}Options`].map((element, key) => {
      return (
        <Typography
          onClick={() => this.onMenuClick(element.translateVariable)}
          variant="subheading"
          className="menu-item mobile"
          key={key}>
          {this.props.translate(element.translateVariable)}
        </Typography>
      );
    });
  }

  get stylesForMenu() {
    const opened = this.state.opened;
    return {
      backgroundColor: opened ? 'white' : 'none',
    };
  }

  get renderIcon() {
    const opened = this.state.opened;
    if (!opened) {
      return (
        <Reorder
          color="secondary"
          style={{ color: this.props.color ? '#470b2f' : 'white' }}
          onClick={this.burgerToggle}
        />
      );
    }
    return <Close color="primary" onClick={this.burgerToggle} />;
  }

  get renderLogo() {
    const url = this.props.color ? 'colorLogo' : 'logoWhite';
    return <img src={`/static/svg/${url}.svg`} className="menu-item logo" />;
  }

  render() {
    const opened = this.state.opened;
    return (
      <div className="nav-wrapper" style={this.props.style}>
        <nav style={this.props.navStyle}>
          <div className="navWide">
            {this.renderLogo}
            <div className="wideDiv">
              <NoSSR>{this.renderDesktopLinks}</NoSSR>
            </div>
          </div>
          <div
            className="navNarrow"
            style={{ backgroundColor: opened ? 'white' : 'unset' }}>
            {this.renderLogo}
            <div className="menu-icon-wrapper">
              <IconButton>{this.renderIcon}</IconButton>
            </div>
          </div>
          <div
            className={'narrowLinks' + (opened ? ' active' : '')}
            style={this.stylesForMenu}>
            {this.renderMobileLinks}
          </div>
        </nav>
      </div>
    );
  }
}
