import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MediumButton } from './elements/Button';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [passwordOne, setPasswordOne] = useState('');
  const [passwordTwo, setPasswordTwo] = useState('');
  const handleEmailChange = e => setEmail(e.target.value);
  const handlePasswordOneChange = e => setPasswordOne(e.target.value);
  const handlePasswordTwoChange = e => setPasswordTwo(e.target.value);
  const handleSignUp = () => {};

  // TODO: provide tooltip for password requirements
  // TODO: probably shouldn't be validating their passwords just yet...
  const invalidInputs = 
    passwordOne !== passwordTwo ||
    !passwordOne ||
    !passwordTwo;

  return (
    <div className="SignUp">
      <label htmlFor="email">Email Address</label>
      <input
        className="SignUp__input-email"
        id="email"
        onChange={e => handleEmailChange(e)}
        placeholder="Enter Email Address"
        value={email}
      />
      <label htmlFor="password-one">Password</label>
      <input
        className="SignUp__input-password-one"
        id="password-one"
        onChange={e => handlePasswordOneChange(e)}
        placeholder="Enter Password"
        value={passwordOne}
      />
      <label htmlFor="password-two">Confirm Password</label>
      <input
        className="SignUp__input-password-two"
        id="password-two"
        onChange={e => handlePasswordTwoChange(e)}
        placeholder="Confirm Password"
        value={passwordTwo}
      />
      <MediumButton
        className="SignUp__button-sign-up"
        type="button"
        onClick={handleSignUp}
        disabled={invalidInputs ? true : false}
      >
        Sign Up
      </MediumButton>
      <Link to={"/login"}>Already have an account? Log in here.</Link>
    </div>
  );
};

export default SignUp;