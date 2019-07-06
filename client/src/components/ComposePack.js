import React, { useState } from 'react';
import styled from 'styled-components';
import { Mutation } from 'react-apollo';
import { CREATE_PACK, GET_PACKS } from '../queries';
import LinkButton from './Elements/LinkButton';
import LinkBackIcon from './icons/LinkBackIcon';
import { Title1 } from './Elements/Text';

function ComposePack() {
  const [packName, setPackName] = useState('');
  const handleNameChange = (e) => setPackName(e.target.value);

  return (
    <ComposePackWrapper className="ComposePack">
      <Header className="ComposePack__header">
        <IconButton className="ComposePack__button-back" to="/"/>
      </Header>
      <Form className="ComposePack__form Form">
        <Title1 className="Form__title">Create a Pack</Title1>
        <label htmlFor="pack-input-name">Pack Name: </label>
        <input
          className="Form__input"
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
              className="Form__button-submit"
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
  widht: 2rem;
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

  .Form__title {
    margin-bottom: .50rem;
  }
  .Form__input {
    margin: 1rem 0rem 1rem 0rem;
    font-size: 1.25rem;
    text-align: center;
    height: 2rem;
    padding: .25rem;
  }
  Form__button-submit {
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
