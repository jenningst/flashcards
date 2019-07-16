import React, { useState } from 'react';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import { useSession } from '../contexts/user-context';

import LinkButton from './elements/LinkButton';
import { Title1, Title3, Body, Caption3, Title4 } from './elements/Text';
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
    <DashboardWrapper className='Dashboard'>
      <Header className='Dashboard__header'>
        <ButtonGroup className='button-label-group'>
          <MenuIcon
            className='Dashboard__button-menu'
            data-testid='button-menu'
            onClick={toggleMenu}
          />
          <Caption3>Dashboard</Caption3>
        </ButtonGroup>
        <Avatar toggleMenu={toggleMenu}/>
      </Header>

      <Main className='Dashboard__main'>
        <GreetingSection className='Dashboard__greeting'>
          <Caption3
            className='greeting-date'
            data-testid='greeting-date'
          >
            {'October 19th'}
          </Caption3>
          <Title3 className='greeting-title'>Ready to learn?</Title3>
        </GreetingSection>

        <StatsSection className='Dashboard__stats stat-section'>
          <Title4 className='stat-section__title'>Your Stats</Title4>
          <StatCard className='Dashboard__stats-card stat-section__card'>
            <Body className='stat-section__body'>Coming Soon!</Body>
          </StatCard>
        </StatsSection>

        <PackSection className='Dashboard__packs pack-section'>
          <Title4 className='pack-section__title'>Your Packs</Title4>
          <CreatePackButton
            className='Dashboard__button-create-pack'
            data-testid='create-pack-button'
            type='button'
            to={'/create-pack'}
          >
            <Title1>+</Title1>
          </CreatePackButton>
          
          <UserPacks uid={user.uid}/>
          {/* <PackList className='Dashboard__pack-list'>
          </PackList> */}
        </PackSection>

      </Main>
    </DashboardWrapper>
  );
};

/* Blocks */

const DashboardWrapper = styled.div`
  box-sizing: border-box;
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-areas:
    'header'
    'main';

  height: 100%;
  /* overflow: hidden; */

  background: ${props => props.theme.color.main.offWhite};
  color: ${props => props.theme.color.fonts.charleston};
`;

const Header = styled.header`
  grid-area: 'header';
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  margin-bottom: 1rem;

  background: ${props => props.theme.color.main.pureWhite};
  box-shadow: 0px 6px 10px 0px rgba(133,133,133,0.3);
  color: ${props => props.theme.color.fonts.eerieBlack};
`;

const Main = styled.main`
  grid-area: 'main';

  display: grid;
  grid-template-rows: repeat(2, auto) 1fr;
  grid-row-gap: 1rem;

  padding: 1rem;

  background: ${props => props.theme.color.main.offWhite};
  color: ${props => props.theme.color.fonts.eerieBlack};

  /* @media screen and (min-width: 321px) {
    
  } */
`;

const GreetingSection = styled.section`
  grid-row: 1 / span 1;
  margin-bottom: 1rem;

  .greeting-date {
    color: ${props => props.theme.color.fonts.grey};
  }

  .greeting-title {
    font-weight: 500;
    color: ${props => props.theme.color.fonts.charleston};
  }
`;

const StatsSection = styled.section`
  grid-row: 2 / span 1;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  background: ${props => props.theme.color.main.pureWhite};
  box-shadow: 0px 6px 10px 0px rgba(133,133,133,0.3);
  border-radius: .50em;

  .stat-section__title {
    width: 100%;
    text-align: left;
    margin-bottom: 1rem;
    color: ${props => props.theme.color.fonts.blackCoral};
  }
`;

const PackSection = styled.section`
  grid-row: 3 / span 1;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  background: ${props => props.theme.color.main.pureWhite};
  box-shadow: 0px 6px 10px 0px rgba(133,133,133,0.3);
  border-radius: .50em;

  .pack-section__title {
    width: 100%;
    text-align: left;
    margin-bottom: 1rem;
    color: ${props => props.theme.color.fonts.blackCoral};
  }

  & button:first-of-type {
    margin-bottom: 1rem;
  }

  & a:not(:last-child) {
    margin-bottom: 1rem;
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

const StatCard = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 5rem;
  width: 100%;

  border: 1px dashed ${props => props.theme.color.border.charleston};
  border-radius: .50rem;
  color: ${props => props.theme.color.fonts.grey};
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
  border-radius: .50rem;
  width: 100%;

  background: ${props => props.theme.color.main.secondary};
  color: ${props => props.theme.color.main.primaryHover};
  box-shadow: 0px 10px 16px -8px rgba(0,0,0,0.12);
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