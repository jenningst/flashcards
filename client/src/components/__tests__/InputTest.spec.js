// import dependencies
import React from 'react';

// import react-testing methods
import {
  cleanup,
  render,
  fireEvent,
  waitForElem
} from '@testing-library/react';

// import component
import InputTest from '../InputTest';

afterEach(cleanup);

describe.skip('<InputTest /> spec', () => {
  test('assert input is rendered', () => {
    const { getByLabelText } = render(<InputTest />);
    const input = getByLabelText('Name:');
  
    expect(input).toHaveAttribute('type', 'text');
  });
  
  test('assert a disabled button is rendered', () => {
    const { getByText } = render(<InputTest />);
    const button = getByText('Submit');
  
    expect(button).toBeDisabled();
  });
  
  test('assert accepts valid input', () => {
    const newValue = 'React-testing-library rocks!';
    const mockEvent = { target: { value: newValue }};
    const { getByLabelText, getByText } = render(<InputTest />);
    const input = getByLabelText('Name:');
  
    fireEvent.change(input, mockEvent);
    expect(getByText(newValue)).toBeInTheDocument();
  });
  
  test('assert button enabled after valid input', () => {
    const { getByLabelText, getByText } = render(<InputTest />);
    const input = getByLabelText('Name:');
    const button = getByText('Submit');
  
    fireEvent.change(input, { target: { value: 'react testing library rocks!'} });
    expect(button).toBeEnabled();
  });
});
