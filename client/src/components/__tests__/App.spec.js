import React from 'react';
import { shallow } from 'enzyme';
import { cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';

import App from '../App';

afterEach(cleanup);

describe('<App /> spec', () => {
  it.skip('assert component matches snapshot', () => {
    const tree = renderer
      .create(<App />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('assert primary div is present', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('div.app')).toHaveLength(1);
  });
});