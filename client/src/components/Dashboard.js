import React from 'react';
import styled from 'styled-components';
import LinkButton from './elements/LinkButton';
import { Title1 } from './elements/Text';
import { ReactComponent as MenuIcon } from '../components/icons/svg/menu.svg';
import PackCard from './PackCard';
import Avatar from './Avatar';
import { GET_PACKS } from '../queries/';
import { Query } from 'react-apollo';

// TODO: dynamically get user info
const user = {
  id: '1',
  name: 'Troy Jennings',
  profilePhotoUrl: './assets/user.svg',
};

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
        <Avatar />
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
  background: ${props => props.theme.color.main.pureWhite};
  display: grid;
  grid-template-rows: 15%, 1fr;
`;

const Header = styled.header`
  grid-row: 1 / span 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${props => props.theme.color.fonts.eerieBlack};
  padding: 1.5rem 1.5rem 0 1.5rem;
`;

const IconButton = styled(MenuIcon)`
  height: 1.5rem;
  width: 1.5rem;
`;

const PackList = styled.section`
  grid-row: 2 / span 1;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(225px, 1fr));
  grid-gap: .50rem;
  overflow: auto;
  padding: 1.5rem;
`;

const CreatePackButton = styled(LinkButton)`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;

  background: ${props => props.theme.color.main.secondary};
  color: ${props => props.theme.color.main.primaryHover};
  outline: none;
  border: none;

  &:hover {
    background: ${props => props.theme.color.main.secondaryHover};
    color: ${props => props.theme.color.main.primary};
  }
  &:active {

  }
`;

export default Dashboard;