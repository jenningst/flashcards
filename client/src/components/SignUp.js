import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import { useAuth } from '../contexts/auth-context';
import { PrimaryButton } from './elements/Button';
import { Input } from './elements/Input';
import { Title2, Caption3 } from './elements/Text';

const SignUp = ({ history }) => {
  const { register } = useAuth();
  const [email, setEmail] = useState('');
  const [passwordOne, setPasswordOne] = useState('');
  const [passwordTwo, setPasswordTwo] = useState('');
  const [error, setError] = useState(null);
  const handleEmailChange = e => setEmail(e.target.value);
  const handlePasswordOneChange = e => setPasswordOne(e.target.value);
  const handlePasswordTwoChange = e => setPasswordTwo(e.target.value);

  const signUpUser = async () => {
    let newUser;
    try {
      newUser = await register(email, passwordOne);
      history.push('/home');
      console.log(newUser);
    } catch (err) {
      // log error to state so we can display it to the user
      setError(err.message);
      console.log(err.message);
    }
  }

  const handleSignUp = (e) => {
    // validate form...
    // if invalid:
    // leave email but provide error message if improperly formatted
    // leave passwords but provide error message if not matching
    //
    // if valid:
    // doCreateUser
    signUpUser();
    // start a session
    // route to dashboard
    
    e.preventDefault();
  };


  // TODO: provide tooltip for password requirements
  // TODO: probably shouldn't be validating their passwords just yet...
  const invalidInputs = 
    passwordOne !== passwordTwo ||
    !passwordOne ||
    email === '';

  return (
    <SignUpPageWrapper className="SignUp">
      <FormWrapper className="form-wrapper">
        <SignUpForm className="SignUp__form">
          <Title2 className="SignUp__title form-title">Sign Up</Title2>
          <Input
            className="SignUp__input-email"
            aria-label="email"
            type="email"
            id="email"
            onChange={e => handleEmailChange(e)}
            placeholder="Email Address"
            value={email}
          />
          <Input
            className="SignUp__input-password-one"
            aria-label="password-one"
            id="password-one"
            onChange={e => handlePasswordOneChange(e)}
            placeholder="Password"
            value={passwordOne}
          />
          <Input
            className="SignUp__input-password-two"
            aria-label="password-two"
            id="password-two"
            onChange={e => handlePasswordTwoChange(e)}
            placeholder="Confirm Password"
            value={passwordTwo}
          />
          <SignUpButton
            className="SignUp__button-sign-up"
            type="button"
            onClick={e => handleSignUp(e)}
            disabled={invalidInputs}
          >
            Sign Up
          </SignUpButton>
        </SignUpForm>
        <span>
          <Caption3>Already have an account? <Link to={"/login"}>Log in</Link></Caption3>
        </span>
      </FormWrapper>
    </SignUpPageWrapper>
  );
};

const SignUpPageWrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const FormWrapper = styled.div`
  box-sizing: border-box;
  flex-grow: 1;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 2rem;
  background: ${props => props.theme.color.main.pureWhite};

  a {
    color: ${props => props.theme.color.main.primary};
    text-decoration: none;
    outline: none;
    border-bottom: 1px solid transparent;

    &:hover {
      transition: color .2s ease-out, border-bottom-color .2s ease-out;
      border-bottom: 1px solid ${props => props.theme.color.main.primaryHover};
    }
  }

  @media(min-width: 376px) {
    min-width: 320px;
    max-width: 450px;
    height: auto;
    box-shadow: 0px 10px 18px -11px rgba(120,119,120,1);
    border-radius: 1rem;
  }
`;

const SignUpForm = styled.form`
  box-sizing: border-box;
  flex-grow: 1;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  width: 100%;

  .form-title {
    width: 100%;
    text-align: left;
    margin-bottom: 1.5rem;
  }

  .ancillary-form-controls {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 2rem;
  }
`;

const SignUpButton = styled(PrimaryButton)`
  margin: 1.5rem;
  width: 100%;
`;

SignUp.propTypes = {
  firebase: PropTypes.object,
}

export default withRouter(SignUp);