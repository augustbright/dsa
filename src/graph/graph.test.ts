import { breadthTraverse, connect, create, deepTraverse } from "./implementation";

describe('graph', () => {
  describe('create', () => {
    it('should create graph edge', () => {
      expect(create(1)).toEqual({
        value: 1,
        next: new Set([])
      });
    });
  });

  describe('connect', () => {
    it('should connect graph edges', () => {
      const ed1 = create(1);
      const ed2 = create(2);
      connect(ed1, ed2);
      expect(ed1).toEqual({
        value: 1,
        next: new Set([{
          value: 2,
          next: new Set([ed1])
        }])
      });
    });
  });

  test('breadth traversal', () => {
    const ed1 = create(1);
    const ed2 = create(2);
    const ed3 = create(3);
    const ed4 = create(4);
    const ed5 = create(5);
    connect(ed1, ed2);
    connect(ed1, ed3);
    connect(ed1, ed4);
    connect(ed2, ed5);
    connect(ed3, ed5);
    connect(ed4, ed5);
    expect([...breadthTraverse(ed1)]).toEqual([1, 2, 3, 4, 5]);
  });
  test('deep traversal', () => {
    const ed1 = create(1);
    const ed2 = create(2);
    const ed3 = create(3);
    const ed4 = create(4);
    const ed5 = create(5);
    connect(ed1, ed2);
    connect(ed1, ed3);
    connect(ed1, ed4);
    connect(ed2, ed5);
    connect(ed3, ed5);
    connect(ed4, ed5);
    expect([...deepTraverse(ed1)]).toEqual([1, 2, 5, 3, 4]);
  });
});