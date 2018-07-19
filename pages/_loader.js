import React from 'react';
import { get } from 'lodash';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';

import './main.sass';

const mapStateToProps = ({ runtime }, props) => ({
  loading: get(runtime, 'loading'),
});

@connect(mapStateToProps)
export default class Proxy extends React.Component {
  render() {
    if (this.props.loading) {
      return <CircularProgress className="circular" size={250} thickness={1} />;
    }
    return null;
  }
}
