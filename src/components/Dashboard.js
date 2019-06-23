import React, { useContext } from 'react';
import styled from 'styled-components';
import ThemeContext from '../contexts/themeContext';

import PackCard from './PackCard';
import { Title1, Title4 } from '../components/Elements/Text';

function Collections({ displayCollection }) {
  // Contecxt
  const theme = useContext(ThemeContext);

  const CollectionsWrapper = styled.div`
    height: 100%;
    padding: 1rem;
    background: ${theme.background.primary};

    .Collections__header {
      display: flex;
      justify-content: center;
      color: ${theme.font.primary};
      padding: .50rem;
    }

    .Collections__tiled-list {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(135px, 45%));
      grid-gap: 1rem;
    }

    .Collections__add-collection {
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 1rem;
    }
`;

  // get collections
  const collections = [
    { id: 2, name: 'JavaScript', pack: 'javscript', image: '', count: 1000,},
    { id: 3, name: 'CSS',  route: 'css', image: '', count: 999,},
    { id: 4, name: 'HTML',  route: 'html', image: '', count: 150,},
    { id: 5, name: 'React',  route: 'react', image: '', count: 42,},
    { id: 6, name: 'Theory',  route: 'theory', image: '', count: 1,},
  ];

  return (
    <CollectionsWrapper className="Collections">
      <header className="Collections__header">
        <Title4>SOME HEADER CONTENT</Title4>
      </header>
      <section className="Collections__tiled-list">
        <button className="Collections__add-collection">
          <Title1>+</Title1>
        </button>
        {collections.map(c => {
          const { id, ...rest } = c;
          return <PackCard key={id} {...rest} startCollection={displayCollection}/>
        })}
      </section>
    </CollectionsWrapper>
  );
};

export default Collections;