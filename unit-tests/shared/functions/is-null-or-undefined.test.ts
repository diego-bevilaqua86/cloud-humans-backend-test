import { isNullOrUndefined } from "../../../src/shared/functions";

describe('isNullOrUndefined', () => {
  it('should resolve with true for undefined object', () => {
    const response = isNullOrUndefined(undefined);
    expect(response).toBe(true);
  });

  it('should resolve with true for null object', () => {
    const response = isNullOrUndefined(null);
    expect(response).toBe(true);
  });

  it('should resolve with false for an object which is neither null nor undefined', () => {
    const response = isNullOrUndefined({ key: 'value'});
    expect(response).toBe(false);
  })
});

