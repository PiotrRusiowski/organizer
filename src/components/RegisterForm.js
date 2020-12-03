import React from "react";
import { auth } from "../fireBaseConfig";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { connect } from "react-redux";
import {
  setUserEmail as setUserEmailAction,
  setUserPassword as setUserPasswordAction,
} from "../actions";

const RegisterForm = ({
  userEmail,
  userPassword,
  setUserEmail,
  setUserPassword,
}) => {
  const registerFormShema = yup.object().shape({
    userPassword: yup.string().required("musisz podać hasło"),
    userEmail: yup
      .string()
      .email("błędny email")
      .required("email jest wymagany"),
  });

  return (
    <div>
      <Formik
        validationSchema={registerFormShema}
        initialValues={{
          userEmail,
          userPassword,
        }}
        onSubmit={(values) => {
          console.log(values);
          auth
            .createUserWithEmailAndPassword(
              values.userEmail,
              values.userPassword
            )
            .then(() => alert("zarejstrowano pomyślnie"))
            .catch((err) => {
              alert(`${err}`);
            });
        }}
      >
        {({ values, handleChange }) => (
          <Form>
            <Field
              type="email"
              name="userEmail"
              placeholder="emial"
              handleChange={(e) => setUserEmail(e.target.value)}
              value={values.userEmail}
            />
            <ErrorMessage name="userEmail" component="div" />
            <Field
              type="password"
              name="userPassword"
              placeholder="password"
              handleChange={(e) => setUserPassword(e.target.value)}
              value={values.userPassword}
            />
            <ErrorMessage name="userPassword" component="div" />
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

// const mapStateToProps = (state) => {
//   return {
//     userEmail: state.userEmail,
//     userPassword: state.userPassword,
//   };
// };
//skrócona wersja ponizej

const mapStateToProps = ({ userEmail, userPassword }) => ({
  userEmail,
  userPassword,
});
const mapDispatchToProps = (dispatch) => ({
  setUserEmail: (email) => dispatch(setUserEmailAction(email)),
  setUserPassword: (password) => dispatch(setUserPasswordAction(password)),
});
export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);

// firebase.auth().createUserWithEmailAndPassword(email, password)
//     .catch(function(error) {
//   // Handle Errors here.
//   var errorCode = error.code;
//   var errorMessage = error.message;
//   if (errorCode == 'auth/weak-password') {
//     alert('The password is too weak.');
//   } else {
//     alert(errorMessage);
//   }
//   console.log(error);
// });   ????
