import React from 'react';
import App, { Container } from 'next/app';
import { Provider } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';
import JssProvider from 'react-jss/lib/JssProvider';
import { NotificationContainer } from 'react-notifications';
import { StripeProvider } from 'react-stripe-elements';

import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';

import getPageContext from '../page-cotext';
import withReduxStore from '../redux-config/with-redux-store';
import Localization from '../containers/Localization';
import ModalContainer from '../containers/ModalContainer';
import Loader from './_loader';

import './main.sass';

@withReduxStore
export default class MyApp extends App {
  constructor(props) {
    super(props);
    this.pageContext = getPageContext();
  }

  state = {
    stripe: null,
  };

  pageContext = null;

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }

    if (window.Stripe) {
      this.setState({
        stripe: window.Stripe('pk_test_opVhyp1UCaDDjQ5riDJapXY3'),
      });
    }
  }

  render() {
    const { Component, pageProps, reduxStore } = this.props;
    return (
      <Container>
        {/* Wrap every page in Jss and Theme providers */}
        <JssProvider
          registry={this.pageContext.sheetsRegistry}
          generateClassName={this.pageContext.generateClassName}>
          {/* MuiThemeProvider makes the theme available down the React
                tree thanks to React context. */}
          <MuiThemeProvider
            theme={this.pageContext.theme}
            sheetsManager={this.pageContext.sheetsManager}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            {/* Pass pageContext to the _document though the renderPage enhancer
                  to render collected styles on server side. */}
            <StripeProvider stripe={this.state.stripe}>
              <Provider store={reduxStore}>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                  {/* Gives access to the Stripe object */}
                  <Localization>
                    <div>
                      <ModalContainer>
                        <Component
                          pageContext={this.pageContext}
                          {...pageProps}
                        />
                      </ModalContainer>
                      <NotificationContainer />
                      <Loader />
                    </div>
                  </Localization>
                </MuiPickersUtilsProvider>
              </Provider>
            </StripeProvider>
          </MuiThemeProvider>
        </JssProvider>
      </Container>
    );
  }
}
