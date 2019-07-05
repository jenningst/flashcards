import React, { useState } from 'react';
import styled from 'styled-components';
// import ThemeContext from '../contexts/themeContext';
import { Mutation } from 'react-apollo';
import { CREATE_PACK, GET_PACKS } from '../queries';
import LinkButton from './Elements/LinkButton';
import LinkBackIcon from './icons/LinkBackIcon';
import { Title1 } from './Elements/Text';

function ComposePack() {
  // const theme = useContext(ThemeContext);
  const [packName, setPackName] = useState('');

  const handleNameChange = (e) => setPackName(e.target.value);

  return (
    <StyledComposePack className="ComposePackWrapper">
      <header className="ComposePackWrapper__header">
        <LinkBackIcon className="Dashboard__menu-button" to="/"/>
      </header>
      <section className="ComposePackWrapper__form">
        <Title1 className="ComposePackWrapper__title">Create a Pack</Title1>
        <label htmlFor="pack-input-name">New Pack Name: </label>
        <input
          className="ComposePackWrapper__input-name"
          id="pack-input-name"
          placeholder="Enter a Pack Name"
          name="packname"
          value={packName}
          onChange={(e) => handleNameChange(e)}
          />
        <Mutation
          mutation={CREATE_PACK}
          update={(cache, { data }) => {
            // get our current packs from cache
            const { fetchPacks } = cache.readQuery({ query: GET_PACKS });

            // write back to the cache
            cache.writeQuery({
              query: GET_PACKS,
              data: { fetchPacks: [...fetchPacks, data.createPack.pack] },
            });
          }}
        >
          {(addPack) => (
            <LinkButton
              className="ComposePackWrapper__button-submit"
              type="submit"
              to={"/"}
              disabled={packName === '' ? true : false}
              onClick={e => {
                // prevent page refresh
                e.preventDefault();
                // add pack if input is not null
                if (packName !== '') {
                  addPack({ variables: { input: {
                    name: packName
                  }}});
                }
              }}
            >
              Submit
            </LinkButton>
          )}
        </Mutation>
      </section>
    </StyledComposePack>
  );
};

const StyledComposePack = styled.div`
  display: grid;
  grid-template-rows: minmax(11%, 13%) 1fr;
  grid-template-areas:
    "header"
    "form";
  height: 100%;

  .ComposePackWrapper__button-close {
    height: 2rem;
    widht: 2rem;
    background: red;
  }

  .ComposePackWrapper__header {
    grid-area: header;
    padding: 1rem 1.5rem 0rem 1.5rem;
  }

  .ComposePackWrapper__form {
    grid-area: form;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;

    h1 {
      margin-bottom: .50rem;
    }
  }

  .ComposePackWrapper__input-name {
    margin: 1rem 0rem 1rem 0rem;
    font-size: 1.25rem;
    text-align: center;
    height: 2rem;
    padding: .25rem;
  }

  .ComposePackWrapper__button-submit {
    width: 33%;
  }
`;

export default ComposePack;

// background: ${theme.background.primary};
// color: ${theme.font.primary};

// .ComposePackWrapper__button-close {
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