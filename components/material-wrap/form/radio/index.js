import React from 'react';

import Radio from '@material-ui/core/Radio';

import Tephography from '../../typography';

export default class RadioCustom extends React.Component {
  render() {
    const {
      field: { name, value, onBlur },
      id,
      label,
      className = '',
      setFieldValue,
    } = this.props;
    return (
      <div>
        <div
          className={'flex-centering ' + className}
          onClick={() => setFieldValue(name, id)}>
          <Radio
            color="primary"
            value={value}
            checked={id === value}
            name={name}
            onBlur={onBlur}
            id={id}
          />
          <label className="pointer">
            <Tephography variant="subheading">{label}</Tephography>
          </label>
        </div>
      </div>
    );
  }
}
