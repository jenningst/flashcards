import { reducer, types, INITIAL_STATE } from '../pack-reducer';

describe('reducer spec', () => {
  it('assert state is initialized on first invocation', () => {
    expect(reducer(undefined, {})).toEqual(INITIAL_STATE);
  });

  it('assert state returned for invalid action and initial state', () => {
    const invalidAction = { type: 'BOOLI_BOOLI_BOOLI!' };
    expect(reducer(INITIAL_STATE, invalidAction)).toEqual(INITIAL_STATE);
  });

  it('assert state returned for invalid action and populated state', () => {
    const newState = { mode: 'REVIEW_MODE' };
    const invalidAction = { type: 'BOOLI_BOOLI_BOOLI!' };
    expect(reducer(newState, invalidAction)).toEqual(newState);
  });

  it('assert sets state for SET_REVIEW_MODE', () => {
    const newState = { mode: 'REVIEW_MODE' };
    expect(reducer(INITIAL_STATE, { type: types.SET_REVIEW_MODE })).toEqual(newState);
  });

  it('assert sets state for SET_WRITE_MODE', () => {
    const newState = { mode: 'WRITE_MODE' };
    expect(reducer(INITIAL_STATE, { type: types.SET_WRITE_MODE })).toEqual(newState);
  });

  it('assert resets state for RESET_MODE', () => {
    expect(reducer(INITIAL_STATE, { type: types.RESET_MODE })).toEqual(INITIAL_STATE);
  });
});