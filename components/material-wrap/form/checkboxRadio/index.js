import React from 'react';

import Checkbox from '@material-ui/core/Checkbox';

import Tephography from '../../typography';

export default class CheckboxRadio extends React.Component {
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
            checked={id === value}
            name={name}
            onChange={() => setFieldValue(name, id)}
            onBlur={onBlur}
            id={id}
          />
          <label className={labelClassName}>
            <Tephography variant="subheading">{label}</Tephography>
          </label>
        </div>
      </div>
    );
  }
}
