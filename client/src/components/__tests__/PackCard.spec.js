import React from 'react';
import { MemoryRouter, BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';

import {
  cleanup,
  render,
} from '@testing-library/react';

import PackCard from '../PackCard';

afterEach(cleanup);

const renderComponent = ({ name, _id }) => 
  render(
    <MemoryRouter initialEntries={['/random-page']}>
      <BrowserRouter>
        <PackCard _id={_id} name={name}/>
      </BrowserRouter>
    </MemoryRouter>
  );

describe('<PackCard /> spec', () => {
  it('assert component matches snapshot', () => {
    const name = 'JavaScript';
    const _id = '1';
    const tree = renderer
      .create(
        <MemoryRouter>
          <BrowserRouter>
            <PackCard _id={_id} name={name}/>
          </BrowserRouter>
        </MemoryRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('assert the primary button is rendered', () => {
    const name = 'Vue';
    const _id = '1';
    const { getByTestId } = renderComponent({ name, _id });
    const wrapper = getByTestId('card');

    expect(wrapper).toBeInTheDocument();
  });

  it('assert card name is displayed', () => {
    const name = 'JavaScript';
    const _id = '1';
    const { getByText } = renderComponent({ name, _id });
    const title = getByText(name);

    expect(title).toBeInTheDocument();
  });

  it('assert re-renders with new props', () => {
    const inititalName = 'JavaScript';
    const newName = 'Angular';
    const _id = '1';
    const { getByText, rerender } = renderComponent({ name: inititalName, _id });
    const initialTitle = getByText(inititalName);

    expect(initialTitle).toBeInTheDocument();
    rerender(
      <MemoryRouter>
        <PackCard _id={_id} name={newName}/>
      </MemoryRouter>
    );
    const newTitle = getByText(newName);
    expect(initialTitle).not.toBeInTheDocument();
    expect(newTitle).toBeInTheDocument();
  });
});