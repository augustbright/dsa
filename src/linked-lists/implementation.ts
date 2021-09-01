import {h1, h2, output} from '../utils';
import type {
  Create,
  Display,
  Insert,
  RemoveByKey,
  At,
  Shift,
  Unshift,
  LinkedList,
  Link
} from './types';

const create: Create = <E extends unknown>() => {
  const list: LinkedList<E> = {
    first: null,
    [Symbol.iterator]: () => {
      let item = list.first;
      return {
        next: () => {
          if (!item) {
            return {
              done: true,
              value: null
            };
          }
          const result = {
            done: false as const,
            value: item.data
          };
          item = item.next;
          return result;
        }
      }
    }
  };

  return list;
}

const display: Display = <E extends unknown>(list: LinkedList<E>) => {
  for (let item of list) {
    output(item);
  }
}

const unshift: Unshift = <E extends unknown>(list: LinkedList<E>, element: E) => {
  const first: Link<E> = {
    data: element,
    next: list.first
  };
  list.first = first;
};

const insert: Insert = <E extends unknown>(list: LinkedList<E>, element: E, key: number) => {
  if (key < 0) {
    throw new RangeError(`The value of key cannot be negative`);
  }
  if (key === 0) {
    return unshift(list, element);
  }

  let previousKey = 0;
  let previousItem: Link<E> | null | undefined = list.first;
  while (previousKey < key - 1) {
    previousItem = previousItem?.next;
    previousKey += 1;
  }
  if (!previousItem) {
    throw new RangeError(`LinkedList doesn't contain key ${key - 1}`);
  }

  const newLink: Link<E> = {
    data: element,
    next: previousItem.next
  };
  previousItem.next = newLink;
};

const shift: Shift = <E extends unknown>(list: LinkedList<E>) => {
  list.first = list.first?.next || null;
};

const removeByKey: RemoveByKey = <E extends unknown>(list: LinkedList<E>, key: number) => {
  if (key < 0) {
    throw new RangeError('The value of key cannot be negative');
  }
  if (key === 0) {
    return shift(list);
  }

  let previousKey = 0;
  let previousItem: Link<E> | null | undefined = list.first;
  while (previousKey < key - 1) {
    previousItem = previousItem?.next;
    previousKey += 1;
  }
  if (!previousItem) {
    throw new RangeError(`LinkedList doesn't contain key ${key - 1}`);
  }
  previousItem.next = previousItem.next?.next || null;
};

const at: At = <E extends unknown>(list: LinkedList<E>, key: number) => {
  let currentKey = 0;
  let currentItem: Link<E> | null | undefined = list.first;
  while (currentKey < key) {
    currentItem = currentItem?.next;
    currentKey += 1;
  }
  if (!currentItem) {
    throw new RangeError(`LinkedList doesn't contain key ${key}`);
  }
  
  return currentItem.data;
};

export const run = () => {
  h1('Linked Lists');

  let list = create<number>();

  h2('unshift 7, 4');
  unshift(list, 7);
  unshift(list, 4);
  display(list);

  h2('to array');
  output([...list]);

  h2('insert');
  insert(list, 10, 1);
  insert(list, 11, 1);
  insert(list, 12, 1);
  output([...list]);

  h2('shift');
  shift(list);
  output([...list]);

  h2('delete');
  removeByKey(list, 1);
  output([...list]);

  h2('at 2');
  output(at(list,2));
};
