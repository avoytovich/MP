import React, { Component } from 'react';
import { withRouter } from 'next/router';

import Reorder from '@material-ui/icons/Reorder';
import Close from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Popover from '@material-ui/core/Popover';
import MenuItem from '@material-ui/core/MenuItem';
import NoSSR from 'react-no-ssr';

import { Router } from '../../routes';

import i18n from '../../services/decorators/i18n';
import { clear, getLocale } from '../../services/serverService';
import {
  isILogined,
  getMyFirstAndLastName,
  getMyPhoto,
  amIProfashional,
} from '../../services/accountService';

import { menuProps, profashionalOptions } from '../../constants/landing/menu';
import CustomTypography from '../material-wrap/typography/index';

import './header.sass';

@i18n('menu')
@withRouter
export default class Header extends Component {
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
    Router.pushRoute(href);
  };

  onMenuClick = name => {
    switch (name) {
      case 'logOut':
        clear();
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
    this.toggleDropDownDesktop();
  };

  get renderDesktopLinks() {
    if (!isILogined()) {
      return menuProps.map((element, key) => {
        return (
          <Typography
            variant="subheading"
            className="menu-item"
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
          style={{ backgroundImage: `url(${getMyPhoto()})` }}
        />
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
          {amIProfashional()
            ? profashionalOptions.map((option, index) => (
                <MenuItem
                  key={index}
                  onClick={() => this.onMenuClick(option.translateVariable)}
                  className="header-menu-item">
                  {this.props.translate(option.translateVariable)}
                </MenuItem>
              ))
            : null}
        </Popover>
        <div className="header-hidden-target" ref={this.target} />
      </div>
    );
  }

  get renderMobileLinks() {
    if (!isILogined()) {
      return menuProps.map((element, key) => {
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
    if (amIProfashional()) {
      return profashionalOptions.map((element, key) => {
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
    return null;
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
          style={{ color: this.props.color ? 'black' : 'white'}}
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
      <div className="nav-wrapper">
        <nav>
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
