import React from 'react';

import CustomTypography from '../material-wrap/typography/index';

import './style.sass';

export default function Label(props) {
  console.log(props.name);
  return (
    <span className="label-button">
      <CustomTypography variant="subheading" fontSize="18px">
        {props.name}
      </CustomTypography>
    </span>
  );
}
