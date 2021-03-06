import React from 'react';

import Radio from '@material-ui/core/Radio';

import Tephography from '../../typography';

export default class RadioCustom extends React.Component {
  get style() {
    const { className = '', onlyClassName } = this.props;
    if (onlyClassName) return onlyClassName;
    return 'flex-centering ' + className;
  }

  render() {
    const {
      field: { name, value, onBlur },
      id,
      label,
      setFieldValue,
    } = this.props;
    return (
      <div>
        <div
          className={this.style}
          onClick={() =>
            setFieldValue
              ? setFieldValue(name, id)
              : this.props.form.setFieldValue(name, id)
          }>
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
