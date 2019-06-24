import React, { useContext } from 'react';
import { PackProvider } from '../contexts/packContext';
import ThemeContext, { ThemeProvider } from '../contexts/themeContext';


import AppRouter from '../containers/AppRouter';

function App() {
  const theme = useContext(ThemeContext);

  return (
    <PackProvider>
      <ThemeProvider value={theme}>
        <AppRouter />
      </ThemeProvider>
    </PackProvider>
  );
};

export default App;
