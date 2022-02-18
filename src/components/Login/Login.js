import React, { useEffect, useState, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const formACTIONS = {
  updateEnteredEmail: 'updateEnteredEmail',
  updateEnteredPassword: 'updateEnteredPassword'
}

function formReducer(state, action) {
  switch(action.type) {
    case formACTIONS.updateEnteredEmail :
      return {
        ...state,
        enteredEmail: action.value,
        emailIsValid: action.value.includes('@'),
        formIsValid: state.emailIsValid && state.passwordIsValid
      };
    case formACTIONS.updateEnteredPassword :
      return {
        ...state,
        enteredPassword: action.value,
        passwordIsValid: action.value.length > 6,
        formIsValid: state.passwordIsValid && state.emailIsValid
      };
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

  // useEffect(() => {
  //   const isFormValid = setTimeout(() => {
  //     console.log('validating form')
  //     setFormIsValid(enteredEmail.trim().includes('@') && enteredPassword.trim().length > 6)
  //   }, 500);

  //   return () => {
  //     console.log('cleanup')
  //     clearTimeout(isFormValid)
  //   }
  // }, [enteredEmail, enteredPassword])

  const emailChangeHandler = (event) => {
    dispatchForm({ type: formACTIONS.updateEnteredEmail, value: event.target.value})
  };

  const passwordChangeHandler = (event) => {
    dispatchForm({ type: formACTIONS.updateEnteredPassword, value: event.target.value})
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(formState.enteredEmail, formState.enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            formState.emailIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={formState.enteredEmail}
            onChange={emailChangeHandler}
            onBlur={emailChangeHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            formState.passwordIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={formState.enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={passwordChangeHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formState.formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
