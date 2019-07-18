import React, { useState } from 'react';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import { useSession } from '../contexts/user-context';
import { useAuth } from '../contexts/auth-context';

import LinkButton from './elements/LinkButton';
import { Title1, Title3, Body, Caption3, Title4 } from './elements/Text';
import { ReactComponent as Menu } from '../components/icons/svg/menu.svg';
import Avatar from './Avatar';
import { GET_PACKS } from '../queries/';

const UserPacks = ({ uid }) => (
  <Query query={GET_PACKS} variables={{ owner: uid }}>
    {({ loading, error, data }) => {
      if (loading) return 'Loading...';
      if (error) return `Error! ${error.message}`;

      const packs = data.fetchPacks;
      return (
        <React.Fragment>
          {packs.map(pack => {
            return <PackCardContent
              key={pack._id}
              to={`/pack/${pack._id}`}
              {...pack} 
            >
              {pack.name}
            </PackCardContent>
          })}
        </React.Fragment>
      );
    }}
  </Query>
);

function Dashboard() {
  const [showMenu, setShowMenu] = useState(false);
  const { logOut } = useAuth();
  // const toggleMenu = () => setShowMenu(!showMenu);
  const user = useSession();

  return (
    <DashboardWrapper className='Dashboard'>
      <Header className='Dashboard__header'>
        <ButtonGroup className='button-label-group'>
          <MenuIcon
            className='Dashboard__button-menu'
            data-testid='button-menu'
            onClick={logOut}
          />
          <Caption3>Dashboard</Caption3>
        </ButtonGroup>
        <Avatar toggleMenu={logOut} />
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
          <PackWrapper className="pack-section__list">
            <CreatePackButton
              className='Dashboard__button-create-pack'
              data-testid='create-pack-button'
              type='button'
              to={'/create-pack'}
            >
              <Title1>+</Title1>
            </CreatePackButton>
            
            <UserPacks uid={user.uid}/>
          </PackWrapper>
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

  background: ${props => props.theme.color.background.offWhite};
  color: ${props => props.theme.color.font.charleston};
`;

const Header = styled.header`
  grid-area: 'header';
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  margin-bottom: 1rem;

  background: ${props => props.theme.color.background.pureWhite};
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.05);
`;

const Main = styled.main`
  grid-area: 'main';

  display: grid;
  grid-template-rows: repeat(2, auto) 1fr;
  grid-gap: 1rem;

  padding: 1rem;

  background: ${props => props.theme.color.background.offWhite};
  color: ${props => props.theme.color.font.eerieBlack};

  @media screen and (min-width: 769px) {
   grid-template-rows: auto 1fr;
   grid-template-columns: 1fr 33%;
   grid-template-areas:
    'greeting greeting'
    'packs stats';
  }
`;

const GreetingSection = styled.section`
  grid-row: 1 / span 1;
  margin-bottom: 1rem;

  .greeting-date {
    color: ${props => props.theme.color.font.grey};
  }

  .greeting-title {
    font-weight: 500;
    color: ${props => props.theme.color.font.charleston};
  }

  @media screen and (min-width: 769px) {
   grid-area: greeting;
  }
`;

const StatsSection = styled.section`
  grid-row: 2 / span 1;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  background: ${props => props.theme.color.font.pureWhite};
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.05);
  border-radius: .50em;

  .stat-section__title {
    width: 100%;
    text-align: left;
    margin-bottom: 1rem;
    color: ${props => props.theme.color.font.blackCoral};
  }

  @media screen and (min-width: 769px) {
   grid-area: stats;
  }
`;

const PackSection = styled.section`
  box-sizing: border-box;
  grid-row: 3 / span 1;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
  padding: 1rem;
  background: ${props => props.theme.color.background.pureWhite};
  box-shadow: 0px 6px 10px 0px rgba(133,133,133,0.3);
  border-radius: .50em;

  .pack-section__title {
    width: 100%;
    text-align: left;
    margin-bottom: 1rem;
    color: ${props => props.theme.color.font.blackCoral};
  }

  @media screen and (min-width: 769px) {
   grid-area: packs;
  }
`;

const PackWrapper = styled.div`
  grid-row: 2 / span 1;
  display: grid;
  grid-template-rows: repeat(auto-fill, minmax(100px, 1fr));
  grid-row-gap: 1rem;
  width: 100%;

  @media screen and (min-width: 769px) {
    grid-template-columns: repeat(auto-fill, minmax(225px, 1fr));
    grid-gap: 1rem;
  }
`;

/* Elements */

const PackCardContent = styled(LinkButton)`
  min-height: 100px;
  text-align: center;
  font-weight: 400;
  word-break: break-word;
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

const MenuIcon = styled(Menu)`
  height: 1.5rem;
  width: 1.5rem;
`;

const StatCard = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 8rem;
  width: 100%;

  border: 1px dashed ${props => props.theme.color.border.charleston};
  border-radius: .50rem;
  color: ${props => props.theme.color.font.grey};
`;

const CreatePackButton = styled(LinkButton)`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: .50rem;
  width: 100%;
  min-height: 100px;
`;

export default Dashboard;