import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Title2, Caption3 } from '../components/elements/Text';
import { MediumButton } from './elements/Button';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleEmailChange = e => setEmail(e.target.value);
  const handlePasswordOneChange = e => setPassword(e.target.value);
  const handleLogin = (e) => {
    e.preventDefault();
    alert('you tried to log in!');
  };

  // TODO: provide tooltip for password requirements
  // TODO: probably shouldn't be validating their passwords just yet...
  const invalidInputs = !email || !password;

  return (
    <LoginPageWrapper className="Login">
      <FormWrapper className="form-wrapper">
        <LoginForm className="Login__form">
          <Title2 className="Login__title form-title">Login</Title2>
          <FormInput
            className="Login__input-email"
            aria-label="email"
            id="email"
            onChange={e => handleEmailChange(e)}
            placeholder="Email Address"
            value={email}
          />
          <FormInput
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
        <SignUpLinkSpan>
          <Caption3>New to Flashcards? <Link to={"/signup"}>Sign up</Link></Caption3>
        </SignUpLinkSpan>
      </FormWrapper>
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
  

  @media(min-width: 376px) {
    min-width: 320px;
    max-width: 450px;
    height: auto;
    box-shadow: 0px 10px 18px -11px rgba(120,119,120,1);
    border-radius: 1rem;
  }
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
  }
`;

const FormInput = styled.input`
  box-sizing: border-box;
  width: 100%;
  margin: .50rem;
  padding: .50rem;
  font-family: 'Rubik', sans-serif;
  font-size: 15px;
  font-weight: 300;
  line-height: 20px;
  border-bottom: 2px solid #e9eaf0;
  border-left: none;
  border-right: none;
  border-top: none;

  &::placeholder {
    color: #e9eaf0;
  }

  &:focus {
    border-bottom: 2px solid ${props => props.theme.color.main.primaryHover};
    outline: none;
  }
`;

const LoginButton = styled(MediumButton)`
  margin: 1.5rem;
  width: 100%;
`;

const SignUpLinkSpan = styled.span`
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
`;

export default Login;