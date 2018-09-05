import React from 'react';
import { withRouter } from 'next/router';
// import Head from 'next/head';

import { Router } from '../../routes';

import Header from '../../components/header/index';

// import { metaTags } from '../../services/cruds';

import '../style.sass';

@withRouter
export default class App extends React.Component {


  // static async getInitialProps({ req, query }) {
  //   let mustReturn = {};
  //   try {
  //     const response = await metaTags.get({ name: 'index' }, '/public');
  //     mustReturn = response.data;
  //   } catch (error) {
  //     console.error(error);
  //   }
  //   return mustReturn;
  // }


  render() {
    return (
      <div>
        {/* <Head>*/}
        {/* <meta name="description" content={this.props.description} />*/}
        {/* <meta name="keywords" content={this.props.keywords} />*/}
        {/* <meta name="title" content={this.props.title} />*/}
        {/* <title>{this.props.title}</title>*/}
        {/* </Head>*/}
        <div className="landing-wrapper">
          <Header />
        </div>
      </div>
    );
  }
}
