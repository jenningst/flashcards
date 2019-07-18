import React, { useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components'
import { darkTheme, lightTheme } from '../themes/theme';
import { useSession } from '../contexts/user-context';
import FullPageSpinner from './FullPageSpinner';

const AuthenticatedApp = lazy(() => import('./AuthenticatedApp'));
const UnAuthenticatedApp = lazy(() => import('./UnAuthenticatedApp'));

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const user = useSession();

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <Router>
        <div className="App" style={{ height: '100vh', width: '100vw' }}>
          <Suspense fallback={<FullPageSpinner loading={true} />}>
            {user ? <AuthenticatedApp /> : <UnAuthenticatedApp />}
          </Suspense>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
