import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withFormik, Form, Field } from 'formik';

import Stepper from '../../../components/stepper/index';
import ModalHeader from '../../../components/modalHeader';
import Typography from '../../../components/material-wrap/typography';
import { privateInfo } from '../../../constants/texts';
import Input from '../../../components/material-wrap/form/input';
import i18n from '../../../services/decorators/i18n';

import './private-info.sass';
import { SignUpSchema, SocialSignUpSchema } from '../../../services/validateSchemas';

@withFormik({
  handleSubmit: (values, options) => {
    console.log('values', values);
    console.log('options', options);
    return options.props.handleSubmit(values, options);
  },

  validationSchema: props => {
    if (props.signUpInfoData.type !== 'email') return SocialSignUpSchema;
    return SignUpSchema;
  },
})
@i18n('errors')
export default class PrivateInfo extends React.Component {
  /* constructor(props) {
    super(props);
    this.state = {
      private-info: true,
    };
  }*/

  render() {
    const { inputFields } = privateInfo;
    const { touched, errors, translate } = this.props;
    return (
      <div className="private-info">
        <Grid container spacing={0} justify="center">
          <Grid item xs={12} sm={12}>
            <ModalHeader title="Private Info" className="test" />
            <div className="grid-stepper">
              <Grid className="grid" item xs={12} sm={10}>
                <Stepper />
              </Grid>
            </div>
            <div className="grid-header">
              <Grid className="grid-header-title" item xs={12} sm={10}>
                <Typography variant="title" fontSize="20px">
                  Please provide your Private information
                </Typography>
              </Grid>
            </div>
            <div className="grid-field">
              <Grid className="grid-field-input" item xs={12} sm={10}>
                {inputFields.map((item, index) => {
                  const { name } = item;
                  return (
                    <Grid
                      key={index}
                      className="grid-field-input-gap"
                      item
                      xs={12}
                      sm={6}>
                      <Field
                        {...item}
                        component={Input}
                        fullWidth
                        error={translate(errors[name])}
                        touched={touched[name]}
                        className="default-input "
                      />
                    </Grid>
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
