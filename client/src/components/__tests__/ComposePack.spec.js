import React from 'react';
// import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from 'react-apollo/test-utils';

import {
  cleanup,
  fireEvent,
  render,
} from '@testing-library/react';

import ComposePack from '../ComposePack';
import { CREATE_PACK } from '../../queries/index';

// TODO: mock out the gql provider
const mocks = [
  {
    request: {
      query: CREATE_PACK,
      variables: {
        name: 'React Testing',
      },
    },
    result: {
      data: {
        card: { _id: '1', name: 'React Testing' },
      },
    },
  },
];

afterEach(cleanup);

const renderComponent = () => 
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter initialEntries={['/']}>
        <ComposePack />
      </MemoryRouter>
    </MockedProvider>
  );

describe('<ComposePack /> spec', () => {
  it.todo('assert component matches snapshot');

  it('assert page greeting is rendered', () => {
    const { getByText } = renderComponent();

    expect(getByText(/^create a pack$/i)).toBeInTheDocument();
  });

  it('assert new pack name input is rendered with default value', () => {
    const { getByLabelText } = renderComponent();
    const inputElement = getByLabelText(/^new pack name:$/i);

    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toBeEmpty();
  });

  it('assert a submit button is rendered', () => {
    const { getByText } = renderComponent();

    expect(getByText(/^submit$/i)).toBeInTheDocument();
  });

  it('assert submit button is initially disabled', () => {
    const { getByText } = renderComponent();

    expect(getByText(/^submit$/i)).toBeDisabled();
  });

  it('assert submit button is enabled upon valid input', async () => {
    const newValue = 'What do you call a fake noodle?';
    const mockEvent = { target: { value: newValue}}
    const { getByLabelText, findByText } = renderComponent();
    
    fireEvent.change(getByLabelText(/^new pack name:$/i), mockEvent);

    expect(await findByText(/^submit$/i)).toBeEnabled();
  });

  it.todo('assert clicking on submit button calls gql mutation');
  it.todo('assert clicking on submit button routes');
});