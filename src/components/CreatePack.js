import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ThemeContext from '../contexts/themeContext';
import { usePackDispatch } from '../contexts/packContext';

import { MediumButton } from './Elements/Button';
import { Title1, Body } from './Elements/Text';
import { ReactComponent as CancelIcon } from '../icons/error.svg';

CreatePack.propTypes = {
  addPack: PropTypes.func.isRequired,
};

function CreatePack({ addPack }) {
  const [packName, setPackName] = useState('');
  const theme = useContext(ThemeContext);
  const dispatch = usePackDispatch();
  const toggleCreatePack = () => dispatch({ type: 'TOGGLE_CREATE_PACK' });

  function handleNameChange(e) {
    setPackName(e.target.value);  
  };

  function handleFormSubmit(e) {
    e.preventDefault();
    addPack(packName);
    toggleCreatePack();
  };

  return (
    <StyledCreatePack className="CreatePackWrapper">
      <header>
        <CancelIcon 
          className="CreatePackWrapper__button-close"
          onClick={toggleCreatePack}
        />
      </header>
      <form
        onSubmit={e => handleFormSubmit(e)}
      >
        <Title1 className="CreatePackWrapper__title">Create a Pack</Title1>
        <Body className="CreatePackWrapper__content">Enter a new pack name below:</Body>
        <input
          className="CreatePackWrapper__input-name"
          name="pack-name"
          value={packName}
          onChange={e => handleNameChange(e)}
        />
        <MediumButton
          className="CreatePackWrapper__button-submit"
          type="submit"
        >
          Submit
        </MediumButton>
      </form>
    </StyledCreatePack>
  );
};

const StyledCreatePack = styled.div`
  display: grid;
  grid-template-rows: minmax(11%, 13%) 1fr;
  grid-template-areas:
    "header"
    "form";
  height: 100%;

  .CreatePackWrapper__button-close {
    height: 2rem;
  }

  header {
    grid-area: header;
    padding: 1rem 1.5rem 0rem 1.5rem;
  }

  form {
    grid-area: form;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;

    h1 {
      margin-bottom: .50rem;
    }
  }

  .CreatePackWrapper__input-name {
    margin: 1rem 0rem 1rem 0rem;
    width: 50%;
    font-size: 1.5rem;
    height: 2rem;
    padding: .25rem;
  }

  .CreatePackWrapper__button-submit {
    width: 33%;
  }
`;

export default CreatePack;

// background: ${theme.background.primary};
// color: ${theme.font.primary};

// .CreatePackWrapper__button-close {
//   height: 2rem;
//   path {
//     fill: ${theme.button.default.greyed};
//   }
//   &:hover {
//     path {
//       fill: ${theme.button.default.alert};
//     }
//   }
// }