import React from 'react';
// import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from 'react-apollo/test-utils';

import {
  cleanup,
  fireEvent,
  render,
} from '@testing-library/react';

import PackCarousel from '../PackCarousel';

afterEach(cleanup);

const renderComponent = () => 
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter initialEntries={['/']}>
        <ComposePack />
      </MemoryRouter>
    </MockedProvider>
  );

describe('<PackCarousel /> spec', () => {
  
});