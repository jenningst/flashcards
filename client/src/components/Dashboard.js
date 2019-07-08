import React from 'react';
import styled from 'styled-components';
import LinkButton from './elements/LinkButton';
import { Title1 } from './elements/Text';
import { ReactComponent as MenuIcon } from '../components/icons/svg/menu.svg';
import PackCard from './PackCard';

import { GET_PACKS } from '../queries/';
import { Query } from 'react-apollo';

const UserPacks = () => (
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
  return (
    <DashboardWrapper className="Dashboard">
      <Header className="Dashboard__header">
        <IconButton
          className="Dashboard__button-menu"
          data-testid="button-menu"
          onClick={() => alert('you clicked the menu!')}
        />
      </Header>
      <PackList className="Dashboard__list">
        <CreatePackButton
          className="Dashboard__button-create-pack"
          data-testid="create-pack-button"
          type="button"
          to={"/create-pack"}
        >
          <Title1>+</Title1>
        </CreatePackButton>
        
        <UserPacks />

      </PackList>
    </DashboardWrapper>
  );
};

const DashboardWrapper = styled.div`
  box-sizing: border-box;
  height: 100vh;
  overflow-y: scroll;
  padding: 1rem;
  background: ${props => props.theme.background.primary};
`;

const Header = styled.header`
  display: flex;
  justify-content: flex-end;
  color: ${props => props.theme.font.primary};
  padding: .50rem;

`;

const IconButton = styled(MenuIcon)`
  height: 2rem;
  width: 2rem;
`;

const PackList = styled.section`
  display: grid;
  overflow: scroll;
  grid-template-columns: repeat(auto-fit, minmax(135px, 45%));
  grid-gap: 1rem;
`;

// TODO: finish hover and active states
const CreatePackButton = styled(LinkButton)`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;

  background: ${props => props.theme.background.primary};
  border: 2px solid ${props => props.theme.font.primary};
  outline: none;
  &:hover {

  }
  &:active {

  }
`;

export default Dashboard;