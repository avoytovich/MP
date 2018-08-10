import React from 'react';
import Grid from '@material-ui/core/Grid';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { find, get } from 'lodash';
import { withRouter } from 'next/router';
import moment from 'moment';

import Transition from '../../components/transition';
import ModalHeader from '../../components/modalHeader';
import Typography from '../../components/material-wrap/typography';
import Header from '../../components/header/index';
import { listOfProfashionals } from '../../constants/texts';
import PrivateInfoStepOne from '../../forms/privateInfo/privateInfoStepOne';
import PrivateInfoStepTwo from '../../forms/privateInfo/privateInfoStepTwo';
import { updateSpecData, resetData } from '../../actions/updateData';
import { Router } from '../../routes';
import { account, profashionals } from '../../services/cruds';
import loading from '../../services/decorators/loading';

import './list-of-profashionals.sass';
import { amIProfashional, isILogined } from '../../services/accountService';
import withConfirmModal from '../../services/decorators/withConfirmModal';
import i18n from '../../services/decorators/i18n';
// import withModal from '../../services/decorators/withModal';

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      /* updateSpecData, resetData*/
    },
    dispatch,
  );

const mapStateToProps = ({ runtime }) => ({
  // privateInfo: runtime.privateInfoData,
  // countryList: runtime.countryList,
  // currencyList: runtime.currencyList,
  // profashionalAccount: runtime.profashionalAccountData,
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
@i18n()
export default class ListOfProfashionals extends React.Component {
  constructor(props) {
    super(props);
    this.animation = React.createRef();
  }

  handleAnimation = () => {
    const element = this.animation.current;
    element.classList[1] !== 'animation'
      ? element.classList.add('animation')
      : element.classList.remove('animation');
  };

  render() {
    //console.log('this props', this.props);
    const { translate } = this.props;
    const { images } = listOfProfashionals;
    return (
      <div className="list-of-profashionals list-of-profashionals-form-wrapper">
        <Grid container spacing={0} justify="center">
          <Grid item xs={12} sm={12}>
            <Header color />
            <Typography variant="button" fontSize="24px" className="header">
              {translate('title', 'listOfProfashionals')}
            </Typography>
            <div className="grid-field">
              <Grid className="grid-field-image" item xs={12} sm={12}>
                {images.map((item, index) => {
                  const { name, alt, src } = item;
                  return (
                    <div key={index} className="grid-field-input-gap">
                      <img alt={alt} src={src} />
                      <Transition
                        title={translate(`${name}`, 'listOfProfashionalsTitle')}
                        content={translate(
                          `${name}`,
                          'listOfProfashionalsContent',
                        )}
                      />
                    </div>
                  );
                })}
              </Grid>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}