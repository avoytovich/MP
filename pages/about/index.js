import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import { withRouter } from 'next/router';
import Link from 'next/link';

import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';

import TestForm from '../../forms/testForm';

import i18n from '../../services/decorators/i18n';

import './style.sass';

const mapStateToProps = ({ localization: { lang } }) => ({ lang });

@i18n()
@withRouter
@connect(mapStateToProps)
export default class About extends Component {
  handleChange = event => {
    this.props.dispatch({
      type: 'CHANGE_LANGUAGE',
      lang: event.target.value,
    });
    Cookies.set('lang', event.target.value);
    // window.location.reload();
  };

  render() {
    return (
      <div>
        <p className="test-style">About page</p>
        <Button>{this.props.translate('testString', 'objectTest')}</Button>
        <Link href="/">
          <Button>Hello world</Button>
        </Link>
        <Select onChange={this.handleChange} value={this.props.lang}>
          <MenuItem value="en">English</MenuItem>
          <MenuItem value="de">Dentmark</MenuItem>
        </Select>
        <TestForm />
      </div>
    );
  }
}
