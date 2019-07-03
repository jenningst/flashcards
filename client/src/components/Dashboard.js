import React, { useContext } from 'react';
import styled from 'styled-components';
import ThemeContext from '../contexts/themeContext';
import PackCard from './PackCard';
import LinkButton from './elements/LinkButton';
import { Title1 } from './elements/Text';
import { ReactComponent as MenuIcon } from '../components/icons/svg/menu.svg';

import { GET_PACKS } from '../queries/';
import { Query } from 'react-apollo';

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

function Dashboard() {
  const theme = useContext(ThemeContext);

  const DashboardWrapper = styled.div`
    box-sizing: border-box;
    height: 100vh;
    overflow-y: scroll;
    padding: 1rem;
    background: ${theme.background.primary};

    .Dashboard__header {
      display: flex;
      justify-content: flex-end;
      color: ${theme.font.primary};
      padding: .50rem;
    }

    .Dashboard__menu-button {
      height: 2rem;
      width: 2rem;
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
        <MenuIcon
          className="Dashboard__menu-button"
          onClick={() => alert('you clicked the menu!')}
        />
      </header>
      <section className="Dashboard__tiled-list">
        <LinkButton
          to={"/create-pack"}
          className="Dashboard__add-collection"
        >
          <Title1>+</Title1>
        </LinkButton>
        <PackList />
      </section>
    </DashboardWrapper>
  );
};

export default Dashboard;