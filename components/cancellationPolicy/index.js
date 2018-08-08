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
        {this.state.expanded ? (
          <Typography variant="subheading" fontSize="16px">
            {this.props.translate('cancellationPolicyFullText')}
          </Typography>
        ) : (
          <Typography variant="subheading" fontSize="16px">
            {this.props.translate('cancellationPolicyShortText')}
            <span className="more-button" onClick={this.showMore}>
              {this.props.translate('more')}
            </span>
          </Typography>
        )}
      </div>
    );
  }
}
