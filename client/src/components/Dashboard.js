import React, { useState } from 'react';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import { useSession } from '../contexts/user-context';

import LinkButton from './elements/LinkButton';
import { Title1, Title3, Body, Caption3 } from './elements/Text';
import { ReactComponent as Menu } from '../components/icons/svg/menu.svg';
import { ReactComponent as Close } from '../components/icons/svg/error.svg';
import PackCard from './PackCard';
import Avatar from './Avatar';
import { GET_PACKS } from '../queries/';
import Sidebar from './Sidebar';

const UserPacks = ({ uid }) => (
  <Query query={GET_PACKS} variables={{ owner: uid }}>
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
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => setShowMenu(!showMenu);
  const user = useSession();

  return (
    <DashboardWrapper className="Dashboard">
      <Header className="Dashboard__header">
        <ButtonGroup className="button-label-group">
          <MenuIcon
            className="Dashboard__button-menu"
            data-testid="button-menu"
            onClick={toggleMenu}
          />
          <Caption3>Dashboard</Caption3>
        </ButtonGroup>
        <Avatar toggleMenu={toggleMenu}/>
      </Header>

      <GreetingSection className="Dashboard__greeting">
        <Caption3
          className="greeting-date"
          data-testid="greeting-date"
        >
          {"October 19th"}
        </Caption3>
        <Title3 className="greeting-title">Ready to learn?</Title3>
      </GreetingSection>

      <StatsSection className="Dashboard__stats">
        <Title3>Coming Soon</Title3>
      </StatsSection>

      <PackSection className="Dashboard__pack-section">
        <Body>Your Packs</Body>
        <PackList className="Dashboard__list">
          <CreatePackButton
            className="Dashboard__button-create-pack"
            data-testid="create-pack-button"
            type="button"
            to={"/create-pack"}
          >
            <Title1>+</Title1>
          </CreatePackButton>
          
          <UserPacks uid={user.uid}/>
          
        </PackList>

      </PackSection>
    </DashboardWrapper>
  );
};

/* Blocks */

const DashboardWrapper = styled.div`
  box-sizing: border-box;

  display: grid;
  grid-template-rows: repeat(2, auto) minmax(0, 1fr);
  height: 100%;
  overflow: hidden;

  background: ${props => props.theme.color.main.offWhite};
  color: ${props => props.theme.color.fonts.charleston};
`;

const Header = styled.header`
  grid-row: 1 / span 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem 1rem 1.5rem;

  background: ${props => props.theme.color.main.pureWhite};
  box-shadow: 0px 10px 18px -8px rgba(0,0,0,0.05);
  color: ${props => props.theme.color.fonts.eerieBlack};
`;

const GreetingSection = styled.section`
  grid-row: 2 / span 1;
  padding: 2rem 1.5rem .50rem 1.5rem;

  .greeting-date {
    color: ${props => props.theme.color.fonts.grey};
  }

  .greeting-title {
    font-weight: 500;
    color: ${props => props.theme.color.fonts.charleston};
  }
`;

const StatsSection = styled.section`
  height: 5rem;
`;

const PackSection = styled.section`
  display: flex;
  flex-flow: column nowrap;
  padding: 1.5rem;
  height: 100%;

  p {
    font-weight: 500;
    margin-bottom: 2rem;
  }
`;

/* Elements */

const ButtonGroup = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;

  svg {
    margin-right: 1rem;
  }

  h6 {
    color: ${props => props.theme.color.main.primary};
  }
`;

const MenuIcon = styled(Menu)`
  height: 1.5rem;
  width: 1.5rem;
`;

const CloseIcon = styled(Close)`
  height: 1.5rem;
  width: 1.5rem;
`;

const PackList = styled.div`
  grid-row: 3 / span 1;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(225px, 1fr));
  grid-gap: .50rem;
  overflow: auto;

  p {
    font-weight: 500;
    margin-bottom: 1rem;
  }
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
    h1 {
      font-weight: 500;
    }
  }
  &:active {

  }
`;

export default Dashboard;