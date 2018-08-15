import React from 'react';
import Grid from '@material-ui/core/Grid';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { find, get } from 'lodash';
import { withRouter } from 'next/router';
import InfiniteScroll from 'react-infinite-scroll-component';

import Transition from '../../components/transition';
import Typography from '../../components/material-wrap/typography';
import Header from '../../components/header/index';
import Rate from '../../components/rate/index';
import { listOfProfashionals } from '../../constants/texts';
import { Router } from '../../routes';
import { profashionals } from '../../services/cruds';
import loading from '../../services/decorators/loading';
import i18n from '../../services/decorators/i18n';

import './list-of-profashionals.sass';

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

const mapStateToProps = ({ runtime }) => ({
  profashionalsList: runtime.profashionalsListData,
  // profashionalPrivateInfo: runtime.profashionalPrivateInfoData,
});
@connect(
  mapStateToProps,
  mapDispatchToProps,
)
@withRouter
/* @withModal(
  'Thank you for filling the information! Admin will contact you shortly',
  props => Router.pushRoute(`/profashional/${props.router.query.id}`),
)*/
/* @withConfirmModal('editPrivateInfo', 'no', 'yes', props =>
  Router.pushRoute(`/profashional/${props.router.query.id}`),
)*/
@loading(/*['profashionalProfile']*/)
@i18n('common')
export default class ListOfProfashionals extends React.Component {
  constructor(props) {
    super(props);
    this.animation = React.createRef();
    this.state = {
      elements: [],
    };
    this.page = -1;
  }

  componentWillMount() {
    if (!this.props.router.query.id) {
      Router.pushRoute('/');
    }
    this.loadAndSaveProfashionalsList();
  }

  handleAnimation = () => {
    const element = this.animation.current;
    element.classList[1] !== 'animation'
      ? element.classList.add('animation')
      : element.classList.remove('animation');
  };

  loadAndSaveProfashionalsList = async () => {
    const resp = await this.props.loadData(
      profashionals.get({
        profashionalId: this.props.router.query.id,
        page: ++this.page,
        size: 9,
      }),
      {
        saveTo: 'profashionalsList',
      },
    );
    this.setState({
      elements: this.state.elements.concat(resp.data.data),
    });
  };

  render() {
    // console.log('this props', this.props);
    // console.log('this state', this.state);
    const { translate, profashionalsList } = this.props;
    if (!profashionalsList) return null;
    const data = this.state.elements;
    const { images } = listOfProfashionals;
    return (
      <div className="list-of-profashionals list-of-profashionals-form-wrapper">
        <Grid container spacing={0} justify="center">
          <Grid item xs={12} sm={8}>
            <Header color />
            <Typography variant="button" fontSize="24px" className="header">
              {translate('title', 'listOfProfashionals')}
            </Typography>
            <Grid container spacing={40} direction="row">
              {images.map((item, index) => {
                const { name, alt, src } = item;
                return (
                  <Grid key={index} item xs={4} sm={4}>
                    <div
                      className="grid-field-image-gap"
                      style={{ backgroundImage: `url(${src})` }}>
                      <Transition
                        title={translate(`${name}`, 'listOfProfashionalsTitle')}
                        content={translate(
                          `${name}`,
                          'listOfProfashionalsContent',
                        )}
                      />
                    </div>
                  </Grid>
                );
              })}
            </Grid>
            <Grid container spacing={40} direction="row" justify="center">
              <Grid item xs={12} sm={12}>
                <Typography
                  variant="button"
                  fontSize="24px"
                  className="location">
                  {translate('location', 'listOfProfashionals')}
                </Typography>
                <InfiniteScroll
                  next={this.loadAndSaveProfashionalsList}
                  dataLength={this.state.elements.length}
                  hasMore={
                    this.state.elements.length <
                    profashionalsList.pagination.total
                  }
                  className="infinite-scroll-component">
                  <Grid container spacing={40} direction="row" justify="center">
                    {data.map((item, index) => {
                      const {
                        icon,
                        username,
                        rating,
                        currentRate,
                        currency,
                        slogan,
                      } = item;
                      return (
                        <Grid key={index} item xs={4} sm={4}>
                          <div
                            style={{ backgroundImage: `url(${icon.path})` }}
                            className="grid-field-list"
                          />
                          <div className="info">
                            <Typography
                              variant="button"
                              fontSize="16px"
                              className="info-name">
                              {username}
                            </Typography>
                            <div className="info-rate-left">
                              <Rate
                                className="flex-with-margin"
                                initialRating={rating}
                                readonly
                              />
                              <div className="info-rate-right">
                                <Typography
                                  variant="subheading"
                                  fontSize="14px"
                                  className="info-rate-current">
                                  {currency && currentRate / 100}
                                  {currency &&
                                    ` ${get(
                                      currency,
                                      'name',
                                    )}`}/{this.props.translate('hour')}
                                </Typography>
                              </div>
                              <div className="info-rate-left">
                                <Typography
                                  variant="subheading"
                                  fontSize="14px"
                                  className="info-slogan">
                                  {slogan}
                                </Typography>
                              </div>
                            </div>
                          </div>
                        </Grid>
                      );
                    })}
                  </Grid>
                </InfiniteScroll>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}
