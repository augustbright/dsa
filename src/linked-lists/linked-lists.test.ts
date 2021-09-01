import {create} from './implementation';

describe('linked lists', () => {
  test('creation', () => {
    const list = create();
    expect(list).toBeDefined();
    expect(list.first).toBe(null);
  });
});