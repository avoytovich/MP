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
      return (
        <div className="spinner">
          <div className="bounce1" />
          <div className="bounce2" />
          <div className="bounce3" />
        </div>
      );
    }
    return null;
  }
}
