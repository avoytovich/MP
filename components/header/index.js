import React, { Component } from 'react';
import Link from 'next/link';

import Reorder from '@material-ui/icons/Reorder';
import Close from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import i18n from '../../services/decorators/i18n';

import { menuProps } from '../../constants/landing/menu';

import './header.scss';

@i18n('menu')
export default class Header extends Component {
  state = {
    opened: false,
  };

  burgerToggle = () => {
    this.setState({
      opened: !this.state.opened,
    });
  };

  get renderDesktopLinks() {
    return menuProps.map((element, key) => {
      return (
        <Link href={element.href} key={key}>
          <Typography variant="subheading" className="menu-item">
            {this.props.translate(element.translateVariable)}
          </Typography>
        </Link>
      );
    });
  }

  get renderMobileLinks() {
    return menuProps.map((element, key) => {
      return (
        <Link href={element.href} key={key}>
          <Typography variant="subheading" className="menu-item mobile">
            {this.props.translate(element.translateVariable)}
          </Typography>
        </Link>
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
