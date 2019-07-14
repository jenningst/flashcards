import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import { WaveSpinner } from 'react-spinners-kit';
import { Title2, Caption3 } from '../components/elements/Text';
import { Input } from '../components/elements/Input';
import { PrimaryButton } from './elements/Button';
import { loginWithEmail } from '../contexts/auth-context';

const Login = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const handleEmailChange = e => setEmail(e.target.value);
  const handlePasswordOneChange = e => setPassword(e.target.value);

  const handleLogin = async (e) => {
    e.preventDefault();
    // see if we get any errors from firebase
    setSubmitting(true);
    try {
      await loginWithEmail(email, password);
      history.push('/home');
    } catch (error) {
      switch (error.code) {
        case 'auth/user-not-found':
          setError(`No user found for email ${email}`);
          setPassword('');
          setSubmitting(false);
          break;
        case 'auth/wrong-password':
          setError(`Oops! The password you entered is incorrect.`);
          setPassword('');
          setSubmitting(false);
        default:
          break;
      }
    }
  };

  // TODO: provide tooltip for password requirements
  // TODO: probably shouldn't be validating their passwords just yet...
  const invalidInputs = !email || !password;

  return (
    <LoginPageWrapper className="Login">
      <FormWrapper 
        className={`form-wrapper${submitting ? '--submitting' : ''}`}
      >
        <LoginForm className="Login__form">
          <Title2 className="Login__title form-title">Login</Title2>
          <ErrorMessageBox className="Login__errors">
            <Caption3>{error}</Caption3>
          </ErrorMessageBox>
          <Input
            className="Login__input-email"
            aria-label="email"
            id="email"
            onChange={e => handleEmailChange(e)}
            placeholder="Email Address"
            value={email}
          />
          <Input
            className="Login__input-password"
            aria-label="password"
            id="password"
            onChange={e => handlePasswordOneChange(e)}
            placeholder="Password"
            value={password}
          />
          <div className="ancillary-form-controls">
            <div className="Login__toggle-remember-me">
              <Caption3>
                Remember me
              </Caption3>
            </div>
            <Link to={"/forgot-password"}><Caption3>Forgot Password</Caption3></Link>
          </div>
          <LoginButton
            className="Login__btn-submit"
            type="primary"
            ripple
            onClick={e => handleLogin(e)}
            disabled={invalidInputs ? true : false}
          >
            Log In
          </LoginButton>
        </LoginForm>
        <span>
          <Caption3>New to Flashcards? <Link to={"/signup"}>Sign up</Link></Caption3>
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
    </LoginPageWrapper>
  );
};

const LoginPageWrapper = styled.div`
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

  &[class*="submitting"] {
    opacity: 0.2;
  }
`;

const ErrorMessageBox = styled.span`
  width: 100%;
  color: ${props => props.theme.color.font.danger};
`;

const LoginForm = styled.form`
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

const LoginButton = styled(PrimaryButton)`
  margin: 1.5rem;
  width: 100%;
`;

export default withRouter(Login);