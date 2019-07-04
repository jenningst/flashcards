import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { shallow, mount } from 'enzyme';
import { StaticRouter } from 'react-router';
import { MockedProvider } from 'react-apollo/test-utils';

import ComposePack from '../ComposePack';
import { CREATE_PACK } from '../../queries/index';

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

describe('<ComposePack />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <StaticRouter>
          <ComposePack />
        </StaticRouter>
      </MockedProvider>
      );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should render an input box', () => {
    expect(wrapper.find('input.ComposePackWrapper__input-name')).toHaveLength(1);
  });

  it('should render a submit button', () => {
    expect(wrapper.find('button.ComposePackWrapper__button-submit')).toHaveLength(1);
  });

  it('should initially render a disabled button', () => {
    const button = wrapper.find('button.ComposePackWrapper__button-submit');
    expect(button.prop('disabled')).toEqual(true);
  });

  // it('should render an enabled button on non-null input value', () => {
  //   const button = wrapper.find('button.ComposePackWrapper__button-submit');
  //   expect(button.prop('disabled')).toEqual(true);
  //   const input = wrapper.find('input.ComposePackWrapper__input-name');
  //   input.value = "fuck!";
  //   ReactTestUtils.Simulate.change(input);
  //   console.log(input.debug());
  //   expect(button.prop('disabled')).toEqual(false);
  // });

  it('should allow a user to submit a new pack', () => {
    
  });

  it('should allow a user to navigate back to the dashboard', () => {
    
  });

  it('should display a button for navigating back to the dashboard', () => {
    
  });
});