import React from 'react';
// import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from 'react-apollo/test-utils';

import {
  cleanup,
  render,
} from '@testing-library/react';

import Dashboard from '../Dashboard';

beforeEach(() => {
});

afterEach(cleanup);

const renderComponent = () =>
  render(
    <MockedProvider>
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    </MockedProvider>
  );

describe('<Dashboard /> spec', () => {
  it.todo('assert component matches snapshot');
  
  it('assert the add collection button renders', () => {
    const { getByTestId } = renderComponent();
    expect(getByTestId('create-pack-button')).toBeEnabled();
  });

  it.todo('assert a menu icon renders');
  it.todo('assert menu icon handler is called');
  it.todo('assert user avatar renders');
  it.todo('assert user avatar handled is called');

  it.todo('assert can receive packs from gql query');
  it.todo('assert renders PackCards from gql query');
});