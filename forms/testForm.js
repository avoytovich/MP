import React from 'react';
import { withFormik, Form } from 'formik';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

@withFormik({
  handleSubmit(values, { setErrors }) {
    console.log(values);
    setErrors({
      first: 'Тест',
    });
  },
})
export default class TestForm extends React.Component {
  render() {
    const { handleChange, errors } = this.props;
    return (
      <Form>
        <TextField
          label={errors.first || 'None'}
          name="first"
          error={!!errors.first}
          id="margin-none"
          onChange={handleChange}
          helperText="Some important text"
        />
        <TextField
          label="None"
          name="second"
          id="margin-none"
          error={!!errors.second}
          onChange={handleChange}
          helperText="Some important text"
        />
        <Button type="submit">SUBMIT</Button>
      </Form>
    );
  }
}
