import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MediumButton } from './elements/Button';

const Login = () => {
  const [email, setEmail] = useState('');
  const [passwordOne, setPasswordOne] = useState('');
  const handleEmailChange = e => setEmail(e.target.value);
  const handlePasswordOneChange = e => setPasswordOne(e.target.value);
  const handleLogin = () => {};

  // TODO: provide tooltip for password requirements
  // TODO: probably shouldn't be validating their passwords just yet...
  const invalidInputs = !email || !passwordOne;

  return (
    <div className="Login">
      <label htmlFor="email">Email Address</label>
      <input
        className="Login__input-email"
        id="email"
        onChange={e => handleEmailChange(e)}
        placeholder="Enter Email Address"
        value={email}
      />
      <label htmlFor="password-one">Password</label>
      <input
        className="Login__input-password-one"
        id="password-one"
        onChange={e => handlePasswordOneChange(e)}
        placeholder="Enter Password"
        value={passwordOne}
      />
      <MediumButton
        className="Login__button-sign-up"
        type="button"
        onClick={handleLogin}
        disabled={invalidInputs ? true : false}
      >
        Log In
      </MediumButton>
      <Link to={"/signup"}>Don't have an account? Sign up here.</Link>
    </div>
  );
};

export default Login;