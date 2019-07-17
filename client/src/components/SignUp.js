import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import { WaveSpinner } from 'react-spinners-kit';
import { createUserWithEmail } from '../contexts/auth-context';
import { PrimaryButton } from './elements/Button';
import { Input } from './elements/Input';
import { Title2, Caption3 } from './elements/Text';
import ROUTE_CONFIG from '../constants/route-config';

SignUp.propTypes = {
  history: PropTypes.object,
};

function SignUp({ history }) {
  const [email, setEmail] = useState('');
  const [passwordOne, setPasswordOne] = useState('');
  const [passwordTwo, setPasswordTwo] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const handleEmailChange = e => setEmail(e.target.value);
  const handlePasswordOneChange = e => setPasswordOne(e.target.value);
  const handlePasswordTwoChange = e => setPasswordTwo(e.target.value);

  const handleSignUp = async (e) => {
    e.preventDefault();
    // validate form...

    // render spinner and attempt user signup
    setSubmitting(true);
    try {
      await createUserWithEmail(email, passwordOne);
      history.push(ROUTE_CONFIG.auth.DASHBOARD);
    } catch (err) {
      switch (err.code) {
        case 'auth/email-already-in-use':
          setError(`It looks like ${email} is already in use. Try using a different email address or logging in.`);
          setEmail('');
          setPasswordOne('');
          setPasswordTwo('');
          setSubmitting(false);
          break;
        case 'auth/weak-password':
          setError(`The password you used is too short. Please use a password with a length of at least 6 characters.`);
          setPasswordOne('');
          setPasswordTwo('');
          setSubmitting(false);
          break;
        default:
          setError(err.message);
          setPasswordOne('');
          setPasswordTwo('');
          setSubmitting(false);
          break;
      }
    }
  };


  // TODO: provide tooltip for password requirements
  // TODO: probably shouldn't be validating their passwords just yet...
  const invalidInputs = 
    passwordOne !== passwordTwo ||
    !passwordOne ||
    email === '';

  return (
    <SignUpPageWrapper className="SignUp">
      <FormWrapper 
        className={`form-wrapper${submitting ? '--submitting' : ''}`}
      >
        <SignUpForm className="SignUp__form">
          <Title2 className="SignUp__title form-title">Sign Up</Title2>
          <ErrorMessageBox className="SignUp__errors">
            <Caption3>{error}</Caption3>
          </ErrorMessageBox>
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
      <SpinnerWrapper
        className={`loading-spinner-wrapper${submitting ? '--visible' : 'hidden'}`}
      >
        {submitting
          ? <>
              <WaveSpinner
                className="Login__spinner"
                size={30}
                loading={submitting}
                color={'#939CE8'}
              />
              <Title2>Logging In</Title2>
            </>
          : null
        }
      </SpinnerWrapper>
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

const SpinnerWrapper= styled.div`
  position: absolute;
  box-sizing: border-box;
  flex-grow: 1;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  opacity: 0.9;

  &[class*="hidden"] {
    z-index: -1;
  }

  &[class*="visible"] {
    z-index: 99999;
  }
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
  background: ${props => props.theme.color.background.pureWhite};

  a {
    color: ${props => props.theme.color.font.primary};
    text-decoration: none;
    outline: none;
    border-bottom: 1px solid transparent;

    &:hover {
      transition: color .2s ease-out, border-bottom-color .2s ease-out;
      border-bottom: 1px solid ${props => props.theme.color.border.primary};
    }
  }

  @media(min-width: 376px) {
    min-width: 320px;
    max-width: 450px;
    height: auto;
    box-shadow: 0px 10px 18px -11px rgba(120,119,120,1);
    border-radius: 1rem;
  }

  &[class*="submitting"] {
    opacity: 0.2;
  }
`;

const ErrorMessageBox = styled.span`
  width: 100%;
  height: 2rem;
  color: ${props => props.theme.color.font.danger};
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

export default withRouter(SignUp);