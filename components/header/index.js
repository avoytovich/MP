import React, { Component } from 'react';
import { withRouter } from 'next/router';

import Reorder from '@material-ui/icons/Reorder';
import Close from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import { Router } from '../../routes';

import i18n from '../../services/decorators/i18n';

import { menuProps } from '../../constants/landing/menu';

import './header.sass';

@i18n('menu')
@withRouter
export default class Header extends Component {
  state = {
    opened: false,
  };

  burgerToggle = () => {
    this.setState({
      opened: !this.state.opened,
    });
  };

  onClick = href => {
    Router.pushRoute(href);
  };

  get renderDesktopLinks() {
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

  get renderMobileLinks() {
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

  get stylesForMenu() {
    const opened = this.state.opened;
    return {
      backgroundColor: opened ? 'white' : 'none',
    };
  }

  get renderIcon() {
    const opened = this.state.opened;
    if (!opened) {
      return <Reorder color="secondary" onClick={this.burgerToggle} />;
    }
    return <Close color="primary" onClick={this.burgerToggle} />;
  }

  render() {
    const opened = this.state.opened;
    return (
      <div className="nav-wrapper">
        <nav>
          <div className="navWide">
            <Typography variant="subheading" className="menu-item logo">
              Logo
            </Typography>
            <div className="wideDiv">{this.renderDesktopLinks}</div>
          </div>
          <div
            className="navNarrow"
            style={{ backgroundColor: opened ? 'white' : 'unset' }}>
            <Typography variant="subheading" className="menu-item">
              Logo
            </Typography>
            <div className="icon-wrapper">
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
