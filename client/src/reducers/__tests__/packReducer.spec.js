import { packReducer, types, INITIAL_STATE } from '../packReducer';

describe('packReducer spec', () => {
  it('assert state is initialized on first invocation', () => {
    expect(packReducer(undefined, {})).toEqual(INITIAL_STATE);
  });

  it('assert state returned for invalid action and initial state', () => {
    const invalidAction = { type: 'BOOLI_BOOLI_BOOLI!' };
    expect(packReducer(INITIAL_STATE, invalidAction)).toEqual(INITIAL_STATE);
  });

  it('assert state returned for invalid action and populated state', () => {
    const newState = { mode: 'REVIEW_MODE' };
    const invalidAction = { type: 'BOOLI_BOOLI_BOOLI!' };
    expect(packReducer(newState, invalidAction)).toEqual(newState);
  });

  it('assert sets state for SET_REVIEW_MODE', () => {
    const newState = { mode: 'REVIEW_MODE' };
    expect(packReducer(INITIAL_STATE, { type: types.SET_REVIEW_MODE })).toEqual(newState);
  });

  it('assert sets state for SET_WRITE_MODE', () => {
    const newState = { mode: 'WRITE_MODE' };
    expect(packReducer(INITIAL_STATE, { type: types.SET_WRITE_MODE })).toEqual(newState);
  });

  it('assert resets state for RESET_MODE', () => {
    expect(packReducer(INITIAL_STATE, { type: types.RESET_MODE })).toEqual(INITIAL_STATE);
  });
});