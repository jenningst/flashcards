import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Mutation } from 'react-apollo';
import { CREATE_PACK, GET_PACKS } from '../queries';
import { ReactComponent as Back } from '../components/icons/svg/back.svg';
import { Link, withRouter } from 'react-router-dom';
import { PrimaryButton } from '../components/elements/Button';
import { Title2, Caption3 } from './elements/Text';
import { useSession } from '../contexts/user-context';
import ROUTE_CONFIG from '../constants/route-config';

function ComposePack({ history }) {
  const [packName, setPackName] = useState('');
  const handleNameChange = (e) => setPackName(e.target.value);
  const user = useSession();

  return (
    <ComposePackWrapper className="ComposePack">
      <Header className="ComposePack__header">
        {/* <IconButton
          className="ComposePack__button-back"
          data-testid="button-back"
          to="/"
        /> */}
        <ButtonGroup className="button-label-group">
          <Link className="button-label-group__link" to="/">
            <BackIcon
              className="ComposePack__button-back button-label-group__icon"
              data-testid="button-back"
            />
          </Link>
          <Caption3>Dashboard</Caption3>
        </ButtonGroup>
      </Header>
      <MainSection>

        <Form className="ComposePack__form form">
          <Title2 className="form__title">Create a Pack</Title2>
          <div className="input-group">
            <label
              className="form__label"
              htmlFor="pack-name"
            >
              Pack Name
            </label>
            <input
              className="form__input"
              id="pack-name"
              name="pack-name"
              value={packName}
              onChange={(e) => handleNameChange(e)}
              maxLength="30"
              />
          </div>
          
          <Mutation
            mutation={CREATE_PACK}
            update={(cache, { data }) => {
              // data; response payload from createPack
              if (data.createPack.details.success) {
                // get our current packs from cache
                const currentPacks = cache.readQuery({
                  query: GET_PACKS,
                  variables: { owner: user.uid }
                });
                // write back to the cache
                // destructure query name from cache
                const { fetchPacks } = currentPacks;
                console.log(`fetchPacks: ${JSON.stringify(currentPacks, null, 2)}`);
                console.log([...fetchPacks]);
                console.log(data.createPack.pack);
                cache.writeQuery({
                  query: GET_PACKS,
                  data: { fetchPacks: [...fetchPacks, data.createPack.pack ] },
                });
              }
              else {
                // TODO: provide error message to UI
                setPackName('');
              }
            }}
          >
            {(addPack) => (
              <FormFooter>
                <StyledSubmit
                  className="form__button-submit"
                  type="submit"
                  disabled={packName ? false : true}
                  onClick={e => {
                    if (packName !== '') {
                      addPack({ variables: { input: {
                        name: packName,
                        owner: user.uid,
                      }}});
                      history.push(ROUTE_CONFIG.auth.DASHBOARD);
                    }
                  }}
                >
                  Submit
                </StyledSubmit>
              </FormFooter>
            )}
          </Mutation>

        </Form>
      </MainSection>
    </ComposePackWrapper>
  );
};

const ComposePackWrapper = styled.div`
  box-sizing: border-box;
  display: grid;
  grid-template-rows: minmax(11%, 13%) 1fr;
  grid-template-areas:
    "header"
    "form";
  height: 100%;
  background: ${props => props.theme.color.background.offWhite};
  color: ${props => props.theme.color.font.charleston};
`;

const BackIcon = styled(Back)`
  height: 2rem;
  width: 2rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;

  svg {
    margin-right: 1rem;
  }

  h6 {
    color: ${props => props.theme.color.font.primary};
  }
`;

const Header = styled.header`
  grid-area: header;
  padding: 1.5rem;
`;

const MainSection = styled.section`
  grid-area: form;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  padding: 1.5rem;
`;

const Form = styled.form`
  padding: 3rem 1rem 2rem 1rem;
  background: ${props => props.theme.color.background.pureWhite};
  border-radius: 1rem;
  box-shadow: 0px 10px 18px -11px rgba(120,119,120,1);

  .form__title {
    margin-bottom: 2rem;
    font-weight: 500;
    color: ${props => props.theme.color.font.primary};
  }
  
  .form__label {
    font-family: 'Rubik', sans-serif;
    font-size: 15px;
    font-weight: 400;
    line-height: 20px;
    margin: 0;
    color: ${props => props.theme.color.font.grey};
  }
  .input-group {
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    margin-bottom: 2rem;

    .form__input {
      height: 2rem;
      margin-top: .50rem;
      padding: .25rem 1rem .25rem 1rem;
      font-size: 1rem;
      border: 1px solid ${props => props.theme.color.border.inputDefault};
      border-radius: .30rem;

      &:focus {
        outline: 2px solid ${props => props.theme.color.border.primary};
      }
    }
  }
`;

const FormFooter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledSubmit = styled(PrimaryButton)`
  max-width: 20rem;
`;

ComposePack.propTypes = {
  history: PropTypes.object,
}

export default withRouter(ComposePack);
