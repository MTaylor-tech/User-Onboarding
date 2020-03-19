import React from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';

function UserForm() {
  return (
    <Form>
      <label htmlFor="uname">Name: </label><Field type="text" name="uname" placeholder="Name" /><br />
      <label htmlFor="email">Email: </label><Field type="email" name="email" placeholder="Email" /><br />
      <label htmlFor="password">Password: </label><Field type="password" name="password" placeholder="Password" /><br />
      <label htmlFor="tos">Do you agree to the Terms of Service? </label><Field type="checkbox" name="tos" /><br />
      <button>Submit</button>
    </Form>
  );
}

const FormikUserForm = withFormik({
  mapPropsToValues({ uname, email, password, tos }) {
    return {
      uname: uname || "",
      email: email || "",
      password: password || "",
      tos: tos || false
    };
  },

  //======VALIDATION SCHEMA==========
  validationSchema: Yup.object().shape({
    uname: Yup.string()
      .required(),
    email: Yup.string()
      .email()
      .required(),
    password: Yup.string()
      .min(8)
      .required(),
    tos: Yup.boolean()
      .oneOf([true], 'Must Accept Terms and Conditions')
  }),
  //======END VALIDATION SCHEMA==========

  handleSubmit(values) {
    console.log(values);
    //THIS IS WHERE YOU DO YOUR FORM SUBMISSION CODE... HTTP REQUESTS, ETC.
  }
})(UserForm);

export default FormikUserForm;
