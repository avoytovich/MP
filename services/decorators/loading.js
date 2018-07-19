import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { pick } from 'lodash';

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
      loadData = async (
        promise,
        options = {
          unsetLoading: true,
        },
      ) => {
        this.setLoader(true);
        let data;
        try {
          data = await promise;
          if (options.saveTo) {
            options.saveTo &&
              this.props.updateSpecData(data.data, options.saveTo);
          }
        } catch (e) {
          this.setLoader(false);
          return Promise.reject(e);
        }
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
