import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { pick, get, merge } from 'lodash';

import { createNotification } from '../notification';

import { updateSpecData, setData } from '../../actions/updateData';

export default function loading(runtimeNames = []) {
  return function(Child) {
    const mapStateToProps = ({ runtime }) => {
      const returnObj = {
        loading: runtime.loading || false,
      };
      runtimeNames.forEach(name => (returnObj[name] = runtime[name]));
      return returnObj;
    };

    const mapDispatchToProps = dispatch =>
      bindActionCreators({ updateSpecData, setData, dispatch }, dispatch);

    @connect(
      mapStateToProps,
      mapDispatchToProps,
    )
    class Loading extends Component {
      defOptions = {
        showError: false,
        showSuccess: false,
        unsetLoading: true,
      };

      loadData = async (promise, opts = {}) => {
        const options = merge(this.defOptions, opts);
        this.setLoader(true);
        let data;
        try {
          data = await promise;
          if (options.saveTo) {
            options.saveTo &&
              this.props.updateSpecData(data.data, options.saveTo);
          }
          if (options.showSuccess) {
            createNotification({
              type: 'success',
              title: options.showSuccess,
              message: '',
            });
          }
        } catch (e) {
          if (options.showError)
            createNotification({
              type: 'error',
              title: get(e, 'response.data.title'),
              message: '',
            });
          this.setLoader(false);
          return Promise.reject(e);
        }
        console.log(options.unsetLoading);
        if (options.unsetLoading) this.setLoader(false);
        return Promise.resolve(data);
      };

      setLoader = value => this.props.setData(value, 'loading');

      render() {
        return (
          <Child
            {...this.props}
            loadData={this.loadData}
            setLoader={this.setLoader}
            {...pick(this.props, runtimeNames)}
          />
        );
      }
    }
    return Loading;
  };
}
