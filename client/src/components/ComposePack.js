import React, { useState } from 'react';
import styled from 'styled-components';
import { Mutation } from 'react-apollo';
import { CREATE_PACK, GET_PACKS } from '../queries';
import LinkButton from './elements/LinkButton';
import LinkBackIcon from './icons/LinkBackIcon';
import { Title1 } from './elements/Text';

function ComposePack() {
  const [packName, setPackName] = useState('');
  const handleNameChange = (e) => setPackName(e.target.value);

  return (
    <ComposePackWrapper className="ComposePack">
      <Header className="ComposePack__header">
        <IconButton
          className="ComposePack__button-back"
          data-testid="button-back"
          to="/"
        />
      </Header>
      <Form className="ComposePack__form form">
        <Title1 className="form__title">Create a Pack</Title1>
        <label htmlFor="pack-input-name">Pack Name: </label>
        <input
          className="form__input"
          id="pack-input-name"
          placeholder="Enter a Pack Name"
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
              className="form__button-submit"
              type="submit"
              to={"/"}
              disabled={packName === '' ? true : false}
              onClick={e => {
                e.preventDefault();
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

      </Form>
    </ComposePackWrapper>
  );
};

const ComposePackWrapper = styled.div`
  display: grid;
  grid-template-rows: minmax(11%, 13%) 1fr;
  grid-template-areas:
    "header"
    "form";
  height: 100%;
  background: ${props => props.theme.background.primary};
  color: ${props => props.theme.font.primary};
`;

const IconButton = styled(LinkBackIcon)`
  height: 2rem;
  width: 2rem;
`;

const Header = styled.header`
  grid-area: header;
  padding: 1rem 1.5rem 0rem 1.5rem;
`;

const Form = styled.section`
  grid-area: form;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;

  .form__title {
    margin-bottom: .50rem;
  }
  .form__input {
    margin: 1rem 0rem 1rem 0rem;
    font-size: 1.25rem;
    text-align: center;
    height: 2rem;
    padding: .25rem;
  }
  .form__button-submit {
    height: 2rem;
    width: 33%;
    path {
      fill: ${props => props.theme.button.default.greyed};
    }
    &:hover {
      path {
        fill: ${props => props.theme.button.default.alert};
      }
    }
  } 
`;

export default ComposePack;
