import React, { useState } from 'react';

// const dark = {
//   font: {
//     primary: '#FFFFFF',
//     secondary: '#E0E0E0',
//     tertiary: '#666666',
//   },
//   background: {
//     primary: '#282626',
//     secondary: '#313131',
//     highlight: '#6121BF',
//     special: '#7358F7',
//     inactive: '#b1aeb7',
//   },
//   button: {
//     default: {
//       primary: '#7358F7',
//       border: '#4D18AE',
//       alert: '#D55949',
//       greyed: '#666666',
//     },
//     disabled: {
//       primary: '',
//       secondary: '',
//       border: '',
//     },
//     hover: {
//       primary: '#6121BF',
//       border: '#6121BF',
//     },
//     active: {
//       primary: '#8b90ff',
//       border: '',
//     },
//   },
// };

const light = {
  font: {
    primary: '#0d0d0d',
    secondary: '#262626',
    tertiary: '#666666',
  },
  background: {
    primary: '#f2f2f2',
    secondary: '#ffffff',
    highlight: '#6121BF',
    special: '#7358F7',
    inactive: '#b1aeb7',
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

const ThemeContext = React.createContext(light);

function ThemeProvider(props) {
  const [theme] = useState(light);
  return (
    <ThemeContext.Provider value={theme}>
      {props.children}
    </ThemeContext.Provider>
  );
};

// function withTheme(Component) {
//   return function ThemeComponent(props) {
//     return (
//       <ThemeContext.Consumer>
//         {(contexts) => <Component {...props} {...contexts} />}
//       </ThemeContext.Consumer>
//     );
//   };
// };

export default ThemeContext;
export { ThemeProvider };