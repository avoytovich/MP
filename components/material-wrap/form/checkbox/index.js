import React from 'react';

import Checkbox from '@material-ui/core/Checkbox';

import Tephography from '../../typography';

export default class CheckboxCustom extends React.Component {
  render() {
    const {
      field: { name, value, onBlur },
      id,
      label,
      className = '',
      labelClassName = '',
      setFieldValue,
    } = this.props;
    return (
      <div>
        <div className={'flex-centering ' + className}>
          <Checkbox
            color="primary"
            value={value}
            checked={value}
            name={name}
            onChange={(e, val) => setFieldValue(name, val)}
            onBlur={onBlur}
            id={id}
          />
          <label className={labelClassName}>
            <Tephography variant="subheading">{this.props.label}</Tephography>
          </label>
        </div>
      </div>
    );
  }
}
