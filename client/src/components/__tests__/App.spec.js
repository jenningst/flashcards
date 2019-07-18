import React from 'react';
import { act } from 'react-dom/test-utils';
import {
  cleanup,
  container,
  render,
} from '@testing-library/react';

import { AuthProvider } from '../../contexts/auth-context';
import App from '../App';

afterEach(cleanup);

const user = {
  uid: '951affbb-af5e-4583-bc4d-e8e419a1e1cc',
  email: 'test@test.com',
};

describe('<App /> spec', () => {
  it('assert component matches snapshot', () => {
    const { container } = render(
      <AuthProvider user={user}>
        <App />
      </AuthProvider>
    );
    expect(container.firstChild).toMatchSnapshot()
  });
});