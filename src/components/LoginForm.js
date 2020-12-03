import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { auth } from "../fireBaseConfig";
import * as Yup from "yup";
import {
  setUserEmail as setUserEmailAction,
  setUserPassword as setUserPasswordAction,
} from "../actions";

import { connect } from "react-redux";
const contactFormShema = Yup.object().shape({
  email: Yup.string()
    .email("email jest błędny")
    .required("email jest wynagany"),
  password: Yup.string().required("podaj hasło"),
});

const LoginForm = ({
  setUserEmail,
  setUserPassword,
  userEmail,
  userPassword,
}) => {
  return (
    <Formik
      validationSchema={contactFormShema}
      initialValues={{
        email: userEmail,
        password: userPassword,
      }}
      onSubmit={(values) => {
        auth
          .signInWithEmailAndPassword(values.email, values.password)
          .then(() => {
            alert("zalogowany");
          })
          .catch((err) => alert(`${err}`));
      }}
    >
      {({ values, handleChange }) => (
        <>
          <Form>
            {/* onSubmit={handleLoginSubmit} ??*/}
            <Field
              id="email"
              type="email"
              name="email"
              placeholder="email"
              value={values.email}
              handleChange={(e) => setUserEmail(e.target.value)}
            />
            <ErrorMessage name="email" component="div" />
            <Field
              type="password"
              name="password"
              placeholder="hasło"
              value={values.password}
              handleChange={(e) => setUserPassword(e.target.value)}
            />
            <ErrorMessage name="password" component="div" />
            <button type="submit">Submit</button>
          </Form>
          {/* {isLogged ? <h1>zalogowany</h1> : <h1> niezalogowany</h1>} */}
        </>
      )}
    </Formik>
  );
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     setUserEmail: (email) => dispatch(setUserEmailAction(email)),
//     setUserPassword: (password) => dispatch(setUserPasswordAction(password)),
//   };
// };

const mapDispatchToProps = (dispatch) => ({
  setUserEmail: (email) => dispatch(setUserEmailAction(email)),
  setUserPassword: (password) => dispatch(setUserPasswordAction(password)),
});
const mapStateToProps = ({ userEmail, userPassword }) => ({
  userEmail,
  userPassword,
});
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
