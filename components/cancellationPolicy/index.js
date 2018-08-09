import React from 'react';
import Typography from '../material-wrap/typography';
import i18n from '../../services/decorators/i18n';

@i18n('booking')
export default class CancellationPolicy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
  }

  showMore = () => {
    this.setState({
      expanded: true,
    });
  };

  render() {
    console.log('props', this.props);

    return (
      <div>
          <Typography variant="subheading" fontSize="16px">
            {this.props.translate('learnmore', 'booking')}
            <a href="#">{this.props.translate('learnmoreclick', 'booking')}</a>
          </Typography>
      </div>
    );
  }
}
