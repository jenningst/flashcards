import React, { useContext } from 'react';
import styled from 'styled-components';
import ThemeContext from '../contexts/themeContext';
import { usePackDispatch } from '../contexts/packContext';

import { GET_PACKS } from '../queries/';
import { Query } from 'react-apollo';

import PackCard from './PackCard';
import { Title1, Title4 } from './Elements/Text';

const PackList = () => (
  <Query query={GET_PACKS}>
    {({ loading, error, data }) => {
      if (loading) return 'Loading...';
      if (error) return `Error! ${error.message}`;

      const packs = data.fetchPacks;
      return (
        <React.Fragment>
          {packs.map(pack => {
            return <PackCard key={pack._id} {...pack} />
          })}
        </React.Fragment>
      );
    }}
  </Query>
);

function Dashboard({ allPacks }) {
  const theme = useContext(ThemeContext);
  const dispatch = usePackDispatch();
  const toggleCreatePack = () => dispatch({ type: 'TOGGLE_CREATE_PACK' });

  const DashboardWrapper = styled.div`
    padding: 1rem;
    background: ${theme.background.primary};

    .Dashboard__header {
      display: flex;
      justify-content: center;
      color: ${theme.font.primary};
      padding: .50rem;
    }

    .Dashboard__tiled-list {
      display: grid;
      overflow: scroll;
      grid-template-columns: repeat(auto-fit, minmax(135px, 45%));
      grid-gap: 1rem;
    }

    .Dashboard__add-collection {
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 1rem;

      background: ${theme.background.inactive};
      border: 2px solid ${theme.background.inactive};
      outline: none;
      &:hover {

      }
      &:active {

      }
    }
`;

  return (
    <DashboardWrapper className="Dashboard">
      <header className="Dashboard__header">
        <Title4>SOME HEADER CONTENT</Title4>
      </header>
      <section className="Dashboard__tiled-list">
        <button
          className="Dashboard__add-collection"
          onClick={e => toggleCreatePack()}
        >
          <Title1>+</Title1>
        </button>
        <PackList />
      </section>
    </DashboardWrapper>
  );
};

export default Dashboard;