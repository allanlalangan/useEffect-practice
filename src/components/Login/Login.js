import React, { useEffect, useState, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const formACTIONS = {
  updateEnteredEmail: 'updateEnteredEmail',
  updateEnteredPassword: 'updateEnteredPassword',
  validateForm: 'validateForm'
}

function formReducer(state, action) {
  switch(action.type) {
    case formACTIONS.updateEnteredEmail :
      return {
        ...state,
        enteredEmail: action.value,
        emailIsValid: action.value.includes('@'),
      };
    case formACTIONS.updateEnteredPassword :
      return {
        ...state,
        enteredPassword: action.value,
        passwordIsValid: action.value.length > 6,
      };
    case formACTIONS.validateForm :
      return {
        ...state,
        formIsValid: state.passwordIsValid && state.emailIsValid ? true : false
      }
    default: return state
  }
}

const Login = (props) => {
  const initialFormState = {
    enteredEmail: '',
    emailIsValid: null,
    enteredPassword: '',
    passwordIsValid: null,
    formIsValid: null
  };

  const [formState, dispatchForm] = useReducer(formReducer, initialFormState);
  const { enteredEmail, emailIsValid, enteredPassword, passwordIsValid, formIsValid } = formState

  useEffect(() => {
    const isFormValid = setTimeout(() => {
      console.log('validating form')
      dispatchForm({ type: formACTIONS.validateForm})
    }, 500);

    return () => {
      console.log('cleanup')
      clearTimeout(isFormValid)
    }
  }, [emailIsValid, passwordIsValid])

  const emailChangeHandler = (event) => {
    dispatchForm({ type: formACTIONS.updateEnteredEmail, value: event.target.value})
  };

  const passwordChangeHandler = (event) => {
    dispatchForm({ type: formACTIONS.updateEnteredPassword, value: event.target.value})
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(enteredEmail, enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={emailChangeHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={passwordChangeHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
