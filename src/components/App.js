import React, { useContext } from 'react';
import { PackProvider } from '../contexts/packContext';
import ThemeContext, { ThemeProvider } from '../contexts/themeContext';


import AppRouter from '../containers/AppRouter';
import PackHome from '../components/PackHome';

import { data } from '../constants/sampleQuestions';

function App() {
  const theme = useContext(ThemeContext);
  const questions = data.javascript.questions;

  return (
    <PackProvider>
      <ThemeProvider value={theme}>
        <AppRouter />
      </ThemeProvider>
    </PackProvider>
  );
};

export default App;
