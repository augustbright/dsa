import {
  create, insert, removeByKey, shift, unshift, at,
} from './implementation';
import { LinkedList } from './types';

describe('linked lists', () => {
  test('creation', () => {
    const list = create();
    expect(list).toBeDefined();
    expect(list.first).toBe(null);
  });
  test('unshifting', () => {
    const list = create<number>();
    unshift(list, 1);
    expect(list.first?.data).toBe(1);
    expect(list.first?.next).toBe(null);
  });
  test('shifting', () => {
    const list = create<number>();
    unshift(list, 1);
    shift(list);
    expect(list.first).toBe(null);
  });
  test('shifting empty list should throw RangeError', () => {
    const list = create();
    expect(() => {
      shift(list);
    }).toThrow(RangeError);
  });
  test('iteration', () => {
    const list = create<number>();
    unshift(list, 1);
    unshift(list, 2);
    unshift(list, 3);
    expect([...list]).toEqual([3, 2, 1]);
  });

  describe('insert', () => {
    let list: LinkedList<string>;
    beforeEach(() => {
      list = create();
      unshift(list, 'c');
      unshift(list, 'b');
      unshift(list, 'a');
    });

    it('should throw RangeError when key is negative', () => {
      expect(() => {
        insert(list, 'never', -1);
      }).toThrow(RangeError);
    });
    it('should insert element at zero', () => {
      insert(list, 'test', 0);
      expect([...list]).toEqual(['test', 'a', 'b', 'c']);
    });
    it('should insert item at given position', () => {
      insert(list, 'test', 2);
      expect([...list]).toEqual(['a', 'b', 'test', 'c']);
    });
    it('should throw RangeError when key exceeds list\'s size', () => {
      expect(() => {
        insert(list, 'error', 10000);
      }).toThrow(RangeError);
    });
  });

  describe('removeByKey', () => {
    let list: LinkedList<string>;
    beforeEach(() => {
      list = create();
      unshift(list, 'c');
      unshift(list, 'b');
      unshift(list, 'a');
    });

    it('should throw RangeError when key is negative', () => {
      expect(() => {
        removeByKey(list, -1);
      }).toThrow(RangeError);
    });
    it('should remove element at zero', () => {
      removeByKey(list, 0);
      expect([...list]).toEqual(['b', 'c']);
    });
    it('should remove item at given position', () => {
      removeByKey(list, 1);
      expect([...list]).toEqual(['a', 'c']);
    });
    it('should remove last item', () => {
      removeByKey(list, 2);
      expect([...list]).toEqual(['a', 'b']);
    });
    it('should throw RangeError when key exceeds list\'s size', () => {
      expect(() => {
        removeByKey(list, 10000);
      }).toThrow(RangeError);
    });
  });

  describe('at', () => {
    let list: LinkedList<string>;
    beforeEach(() => {
      list = create();
      unshift(list, 'c');
      unshift(list, 'b');
      unshift(list, 'a');
    });

    it('should return data at given position', () => {
      expect(at(list, 1)).toEqual('b');
    });
    it('should throw RangeError when key exceeds list\' size', () => {
      expect(() => {
        at(list, 10000);
      }).toThrow(RangeError);
    });
  });
});
