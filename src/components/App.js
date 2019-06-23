import React, { useContext } from 'react';
import styled from 'styled-components';
import CollectionContext, { CollectionProvider } from '../contexts/collectionContext';
import FlashcardContainer from '../containers/FlashcardContainer';
import ThemeContext, { ThemeProvider } from '../contexts/themeContext';

function App() {
  const { dispatch } = useContext(CollectionContext);
  const { theme } = useContext(ThemeContext);

  return (
    <CollectionProvider value={dispatch}>
      <ThemeProvider value={theme}>
        <AppWrapper className="app">
          <FlashcardContainer />
        </AppWrapper>
      </ThemeProvider>
    </CollectionProvider>
  );
};

const AppWrapper = styled.div`
  height: 100%;
`;

export default App;
