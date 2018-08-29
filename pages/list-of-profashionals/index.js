import React from 'react';
import Grid from '@material-ui/core/Grid';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { find, get } from 'lodash';
import { withRouter } from 'next/router';
import { withFormik, Form, Field } from 'formik';
import InfiniteScroll from 'react-infinite-scroll-component';
import moment from 'moment/moment';

import { updateSpecData, setData } from '../../actions/updateData';
import Transition from '../../components/transition';
import Typography from '../../components/material-wrap/typography';
import Header from '../../components/header/index';
import Rate from '../../components/rate/index';
import { listOfProfashionals } from '../../constants/texts';
import { Router } from '../../routes';
import { profashionals } from '../../services/cruds';
import loading from '../../services/decorators/loading';
import i18n from '../../services/decorators/i18n';
import Input from '../../components/material-wrap/form/input';

import './list-of-profashionals.sass';

const mapDispatchToProps = dispatch =>
  bindActionCreators({ updateSpecData, setData }, dispatch);

const mapStateToProps = ({ runtime }) => ({
  profashionalsList: runtime.profashionalsListData,
  profashionalsListScrollTo: runtime.scrollToData,
  profashionalsListElements: runtime.elementsNew || runtime.elementsData,
  // profashionalPrivateInfo: runtime.profashionalPrivateInfoData,
});
@connect(
  mapStateToProps,
  mapDispatchToProps,
)
@withFormik({
  handleSubmit: (values, options) => {
    options.props.handleSubmit(values, options);
  },

  // validationSchema: props => PrivateInfoSchemaStepTwo,
})
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
    this.profashional = React.createRef();
    this.state = {
      elements: [],
      profashional: {},
    };
    this.page = -1;
  }

  componentWillMount() {
    if (!this.props.router.query.id) {
      Router.pushRoute('/');
    }
    this.loadAndSaveProfashionalsList();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      (this.props.values.dayPicker &&
        prevProps.values.dayPicker &&
        prevProps.values.dayPicker._d !== this.props.values.dayPicker._d) ||
      (this.props.values.dayPicker &&
        this.props.values.dayPicker._d &&
        !prevProps.values.dayPicker)
    ) {
      this.page = -1;
      this.loadAndSaveProfashionalsList();
    }
  }

  handleClick = id => {
    this.props.updateSpecData(
      {
        elements: this.state.elements,
      },
      'elements',
    );
    Router.pushRoute(`/profashional/${id}`);
  };

  loadAndSaveProfashionalsList = async condition => {
    const date =
      (this.props.values &&
        this.props.values.dayPicker &&
        moment(this.props.values.dayPicker._d).format('YYYY-MM-DD')) ||
      null;
    const resp = await this.props.loadData(
      profashionals.get({
        date: date,
        profashionalId: this.props.router.query.id,
        page: ++this.page,
        size: 9,
      }),
      {
        saveTo: 'profashionalsList',
      },
    );
    if (date) {
      if (condition) {
        this.setState({
          elements: this.state.elements.concat(resp.data.data),
        });
        this.props.setData(
          this.state.elements.concat(resp.data.data),
          'elementsNew',
        );
      } else {
        this.setState({
          elements: resp.data.data,
        });
        this.props.setData(resp.data, 'elementsNew');
      }
    } else {
      this.setState({
        elements: this.state.elements.concat(resp.data.data),
      });
    }
  };

  render() {
    // console.log('this props', this.props);
    // console.log('this state', this.state);
    const {
      translate,
      profashionalsList,
      profashionalsListElements,
      setFieldValue,
      errors,
      touched,
    } = this.props;
    if (!profashionalsList) return null;
    let data = this.state.elements;
    if (profashionalsListElements) {
      data =
        profashionalsListElements.elements ||
        profashionalsListElements.data ||
        profashionalsListElements ||
        this.state.elements;
    }
    const { images, addition } = listOfProfashionals;
    return (
      <div className="list-of-profashionals list-of-profashionals-form-wrapper">
        <Grid container spacing={0} justify="center">
          <Grid item xs={12} sm={12}>
            <Header color />
          </Grid>
          <Grid container spacing={0} justify="center">
            <Grid item xs={12} sm={8}>
              <Typography variant="button" fontSize="24px" className="header">
                {translate('title', 'listOfProfashionals')}
              </Typography>
              <Grid
                container
                spacing={16}
                direction="row"
                className="header-image">
                {images.map((item, index) => {
                  const { name, alt, src } = item;
                  return (
                    <Grid key={index} item xs={12} sm={4}>
                      <div
                        className={`grid-field-image-gap grid-field-image-gap-${index}`}
                        style={{ backgroundImage: `url(${src})` }}>
                        <Transition
                          title={translate(
                            `${name}`,
                            'listOfProfashionalsTitle',
                          )}
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
              <Grid container spacing={16} direction="row" justify="center">
                <Grid item xs={12} sm={12}>
                  <Typography
                    variant="button"
                    fontSize="24px"
                    className="location">
                    {translate('location', 'listOfProfashionals')}
                  </Typography>
                  <Grid
                    container
                    spacing={0}
                    direction="row"
                    justify="flex-start">
                    {addition.map((item, index) => {
                      const { component, name } = item;
                      return (
                        <Grid key={index} item xs={12} sm={4}>
                          <Field
                            {...item}
                            component={component || Input}
                            setFieldValue={setFieldValue}
                            fullWidth
                            infoReset={false}
                            error={translate(errors[name])}
                            touched={touched[name]}
                            className="default-input "
                          />
                        </Grid>
                      );
                    })}
                  </Grid>
                  <InfiniteScroll
                    next={() => this.loadAndSaveProfashionalsList('scroll')}
                    dataLength={this.state.elements.length}
                    hasMore={
                      this.state.elements.length <
                      profashionalsList.pagination.total
                    }
                    className="infinite-scroll-component">
                    <Grid
                      container
                      spacing={16}
                      direction="row"
                      justify="flex-start"
                      className="infinite-scroll-component-photo">
                      {data.map((item, index) => {
                        const {
                          id,
                          icon,
                          username,
                          rating,
                          currentRate,
                          currency,
                          slogan,
                        } = item;
                        return (
                          <Grid key={index} item xs={6} sm={4}>
                            <div
                              ref={this.profashional}
                              onClick={() => this.handleClick(id)}
                              style={{
                                backgroundImage: `url(${get(icon, 'path') ||
                                  '/static/svg/placeholder.svg'})`,
                              }}
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
        </Grid>
      </div>
    );
  }
}
