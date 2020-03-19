import React from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import axios from 'axios';

const roles = ['Front-End','Back-End','DB Manager','UX Designer'];

const Error = styled.p`
  color: red;
  font-size: 0.6rem;
  margin: 0;
`;

function UserForm(props) {
  return (
    <Form>
      <label htmlFor="uname">Name: </label><Field type="text" name="uname" placeholder="Name" /><br />
      {props.touched.uname && props.errors.uname?<Error>{props.errors.uname}</Error>:<></>}
      <label htmlFor="email">Email: </label><Field type="email" name="email" placeholder="Email" /><br />
      {props.touched.email && props.errors.email?<Error>{props.errors.email}</Error>:<></>}
      <label htmlFor="password">Password: </label><Field type="password" name="password" placeholder="Password" /><br />
      {props.touched.password && props.errors.password?<Error>{props.errors.password}</Error>:<></>}
      <label htmlFor="tos">Do you agree to the Terms of Service? </label><Field type="checkbox" name="tos" /><br />
      {props.errors.tos?<Error>{props.errors.tos}</Error>:<></>}
      <button disabled={!props.isValid}>Submit</button>
    </Form>
  );
}

const FormikUserForm = withFormik({
  mapPropsToValues(props) {
    return {
      uname: props.uname || "",
      email: props.email || "",
      role: props.role || "",
      password: props.password || "",
      tos: props.tos || false
    };
  },

  //======VALIDATION SCHEMA==========
  validationSchema: Yup.object().shape({
    uname: Yup.string()
      .required("Please include the user's name"),
    email: Yup.string()
      .email("Must be a valid email address")
      .required("Please enter the user's email"),
    role: Yup.string()
      .oneOf(roles),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters long")
      .required("Password is required"),
    tos: Yup.boolean()
      .required('Must Accept Terms and Conditions')
      .oneOf([true], 'Must Accept Terms and Conditions')
  }),
  //======END VALIDATION SCHEMA==========

  handleSubmit(values, formikBag) {
    console.log(values);

    axios.post('https://reqres.in/api/users', values)
      .then(response=>console.log(response))
      .catch(error=>console.log(error));

    formikBag.setStatus("Form Submitting!");
    formikBag.resetForm();

    //THIS IS WHERE YOU DO YOUR FORM SUBMISSION CODE... HTTP REQUESTS, ETC.
  }
})(UserForm);

export default FormikUserForm;
