import React from 'react';
import { CardNumberElement, CardExpiryElement, CardCVCElement, injectStripe, } from 'react-stripe-elements';
import { withFormik, Form, Field } from 'formik';
import Grid from '@material-ui/core/Grid';
import Input from "../../components/material-wrap/form/input";
import { bookingLabels } from '../../constants/bookingLabels';

const handleBlur = () => {
  console.log('[blur]');
};
const handleChange = change => {
  console.log('[change]', change);
  console.log('prpr', this.props);
};
const handleClick = () => {
  console.log('[click]');
};
const handleFocus = () => {
  console.log('[focus]');
};
const handleReady = () => {
  console.log('[ready]');
};

class _CardForm extends React.Component {
  handleSubmit = async ev => {
    ev.preventDefault();
    console.log('prppp', this.props);
    if (this.props.stripe) {
      const res = await this.props.stripe.createToken();
      console.log(res);
      this.props.handleSubmitFormik(ev, res);
    } else {
      console.log("Stripe.js hasn't loaded yet.");
    }
  };
  render() {
    const { inputFieldsForPaymentDetails } = bookingLabels;
    return (
      <form onSubmit={this.handleSubmit}>
        <Grid container>
          {inputFieldsForPaymentDetails.map((item, index) => {
            const { component, name, sm, additionalClass} = item;
            return (
              <Grid
                key={index}
                className="grid-field-input-gap"
                item
                xs={12}
                sm={sm || 6}>
                <Field
                  {...item}
                  component={component || Input}
                  fullWidth
                  setFieldValue={
                    /* ...this.initialValues ||*/
                    setFieldValue
                  }
                  error={translate(errors[name])}
                  touched={touched[name]}
                  className={`default-input ${additionalClass}`}
                />
              </Grid>
            );
          })}
        </Grid>
        <label>
          Card number
          <CardNumberElement
            onBlur={handleBlur}
            onChange={handleChange}
            onFocus={handleFocus}
            onReady={handleReady}
          />
        </label>
        <label>
          Expiration date
          <CardExpiryElement
            onBlur={handleBlur}
            onChange={handleChange}
            onFocus={handleFocus}
            onReady={handleReady}
          />
        </label>
        <label>
          CVC
          <CardCVCElement
            onBlur={handleBlur}
            onChange={handleChange}
            onFocus={handleFocus}
            onReady={handleReady}
          />
        </label>
      </form>
    );
  }
}
export default injectStripe(_CardForm);
