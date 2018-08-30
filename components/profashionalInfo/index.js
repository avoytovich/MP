import React from 'react';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '../material-wrap/typography';
import Rate from '../../components/rate/index';

import './profashionalInfo.sass';

export default class ProfashionalInfo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('props', this.props);

    return (
      <div className="profashional-info-container">
        <div className="inner-container">
          <Grid container justify="space-between" alignItems="center" item xs={12}>
            <Grid className="general-info" item sm={6} xs={12} container alignItems="center">
              <Grid className="pic-container" item sm={6} md={5} lg={4} xs={3}>
                <img className="avatar" style={{ backgroundImage: `url(${this.props.profAvatar})` }} src={this.props.profAvatar} alt="profashional-picture"/>
              </Grid>
              <Grid className="info-details-container" item sm={6} md={7} lg={8} xs={6}>
                <Typography className="name" variant="title" fontSize="24px">{this.props.profFirstName}</Typography>
                <Rate
                  className="booking-rating"
                  initialRating={this.props.rating}
                  readonly
                />
                <Typography className="price-container" variant="subheading" fontSize="16px">{this.props.rate} CHF/hour</Typography>
              </Grid>
            </Grid>
            <Grid className="time-info" item sm={3} xs={12} container>
              <Grid className="date-info" item sm={12} xs={4} container alignItems="center">
                <Grid className="date-pic" item xs={3}>
                  <img className="avatar" src="/static/svg/ic-today-24-px.svg" alt="profashional-picture"/>
                </Grid>
                <Grid className="date" item xs={9}>
                  <Typography variant="subheading" fontSize="18px">{this.props.date.replace(/-/g, '.')}</Typography>
                </Grid>
              </Grid>
              <Grid className="access-time-info" item sm={12} xs={4} container alignItems="center">
                <Grid className="access-time-pic" item xs={3}>
                  <img className="avatar" src="/static/svg/ic-access-time-24-px.svg" alt="access-time"/>
                </Grid>
                <Grid className="access-time" item xs={9}>
                  <Typography variant="subheading" fontSize="18px">{this.props.startTime.format('HH:mm')} - {this.props.endTime.format('HH:mm')}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}
