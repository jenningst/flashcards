import React from 'react';
import {
  cleanup,
  render,
} from '@testing-library/react';

import App from '../App';

afterEach(cleanup);

describe('<App /> spec', () => {
  it('assert component matches snapshot', () => {
    const { asFragment } = render(<App />);
    expect(asFragment()).toMatchSnapshot();
  });
});