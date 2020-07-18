import parseStringAsArray from '../src/utils/parseStringAsArray';

describe('ParseStringAsArray', () => {
  it('should be able parse string as array if includes comma', () => {
    const tags = parseStringAsArray('javascript, react');

    expect(tags).toEqual(['javascript', 'react']);
  });

  it('should be able parse string as array not includes comma', () => {
    const tags = parseStringAsArray('javascript');

    expect(tags).toEqual(['javascript']);
  });
});
