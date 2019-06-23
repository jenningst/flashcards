import React, { useState } from 'react';

const dark = {
  font: {
    primary: '#FFFFFF',
    secondary: '#E0E0E0',
    tertiary: '#666666',
  },
  background: {
    primary: '#282626',
    secondary: '#313131',
    highlight: '#6121BF',
    special: '#7358F7',
  },
  button: {
    default: {
      primary: '#7358F7',
      border: '#4D18AE',
      alert: '#D55949',
      greyed: '#666666',
    },
    disabled: {
      primary: '',
      secondary: '',
      border: '',
    },
    hover: {
      primary: '#6121BF',
      border: '#6121BF',
    },
    active: {
      primary: '#8b90ff',
      border: '',
    },
  },
};

const ThemeContext = React.createContext(dark);

function ThemeProvider(props) {
  const [theme, setTheme] = useState(dark);
  return (
    <ThemeContext.Provider value={theme}>
      {props.children}
    </ThemeContext.Provider>
  );
};

function withTheme(Component) {
  return function ThemeComponent(props) {
    return (
      <ThemeContext.Consumer>
        {(contexts) => <Component {...props} {...contexts} />}
      </ThemeContext.Consumer>
    );
  };
};

export default ThemeContext;
export { ThemeProvider };