import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { PackProvider, usePackState, usePackDispatch } from '../pack-context';

afterEach(cleanup);

const TestComponent = () => 
  <div></div>

describe('pack-context spec', () => {
  it.todo('assert using usePackDispatch outside of PackProvider throws');
  it.todo('assert using usePackState outside of PackProvider throws');
  it.todo('assert children get passed context values');
  it.todo('assert usePackState provides valid state');
  it.todo('assert usePackDispatch sends a valid dispatch ');
});