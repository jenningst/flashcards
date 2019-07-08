import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from 'react-apollo/test-utils';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from '../../themes/theme';

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

const renderComponent = ({ mocks, theme, entries }) => 
  render(
    <ThemeProvider theme={theme}>
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter initialEntries={entries}>
          <ComposePack />
        </MemoryRouter>
      </MockedProvider>
    </ThemeProvider>
  );

describe('<ComposePack /> spec', () => {
  it('assert component matches snapshot', () => {
    const { asFragment } = renderComponent({ theme: lightTheme });
    expect(asFragment()).toMatchSnapshot();
  });

  it('assert page greeting is rendered', () => {
    const { getByText } = renderComponent({ theme: lightTheme });
    expect(getByText(/^create a pack$/i)).toBeInTheDocument();
  });

  it('assert new pack name input is rendered with default value', () => {
    const { getByLabelText } = renderComponent({ theme: lightTheme });
    const inputElement = getByLabelText(/^pack name:$/i);
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toBeEmpty();
  });

  it('assert a submit button is rendered', () => {
    const { getByText } = renderComponent({ theme: lightTheme });
    expect(getByText(/^submit$/i)).toBeInTheDocument();
  });

  it('assert submit button is initially disabled', () => {
    const { getByText } = renderComponent({ theme: lightTheme });
    expect(getByText(/^submit$/i)).toBeDisabled();
  });

  it('assert submit button is enabled upon valid input', async () => {
    const newValue = 'What do you call a fake noodle?';
    const mockEvent = { target: { value: newValue}}
    const { getByLabelText, findByText } = renderComponent({ theme: lightTheme });
    fireEvent.change(getByLabelText(/^pack name:$/i), mockEvent);
    expect(await findByText(/^submit$/i)).toBeEnabled();
  });

  it.todo('assert clicking on submit button routes');
  it.todo('assert clicking on submit button calls gql mutation');
});