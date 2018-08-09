import React from 'react';
import Paper from '@material-ui/core/Paper';
import Collapse from '@material-ui/core/Collapse';

import Typography from '../../components/material-wrap/typography';

import './transition.sass';

export default class SimpleCollapse extends React.Component {
  state = {
    checked: false,
  };

  handleChange = () => {
    this.setState(state => ({ checked: !state.checked }));
  };

  render() {
    const { title, content } = this.props;
    const { checked } = this.state;
    return (
      <div
        className="grid-field-input-gap-signature grid-field-input-gap-signature-wrapper"
        onClick={this.handleChange}
        checked={checked}
        aria-label="Collapse">
        <div className="header">
          <Collapse in={checked} collapsedHeight="40px">
            <Paper elevation={4} className="paper">
              {!checked ? (
                <Typography variant="title" fontSize="18px" className="title">
                  {title}
                </Typography>
              ) : (
                <Typography
                  variant="title"
                  fontSize="12px"
                  className="sub-title">
                  <p className="sub-sub-title">{title}</p>
                  {content}
                </Typography>
              )}
            </Paper>
          </Collapse>
        </div>
      </div>
    );
  }
}
