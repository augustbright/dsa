import type {
  Create,
  Insert,
  RemoveByKey,
  At,
  Shift,
  Unshift,
  LinkedList,
  
} from './types';

export const create: Create = <E extends unknown>() => {
  const list: LinkedList<E> = {
    first: null,
    [Symbol.iterator]: () => {
      let item = list.first;
      return {
        next: () => {
          if (!item) {
            return {
              done: true,
              value: null,
            };
          }
          const result = {
            done: false as const,
            value: item.data,
          };
          item = item.next;
          return result;
        },
      };
    },
  };

  return list;
};

export const unshift: Unshift = <E extends unknown>(list: LinkedList<E>, element: E) => {
  const first: Link<E> = {
    data: element,
    next: list.first,
  };
  list.first = first;
};

export const insert: Insert = <E extends unknown>(list: LinkedList<E>, element: E, key: number) => {
  if (key < 0) {
    throw new RangeError('The value of key cannot be negative');
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
    next: previousItem.next,
  };
  previousItem.next = newLink;
};

export const shift: Shift = <E extends unknown>(list: LinkedList<E>) => {
  if (!list.first) {
    throw new RangeError('Cannot shift empty list');
  }
  list.first = list.first.next;
};

export const removeByKey: RemoveByKey = <E extends unknown>(list: LinkedList<E>, key: number) => {
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
  if (!previousItem || !previousItem.next) {
    throw new RangeError(`LinkedList doesn't contain key ${key}`);
  }
  previousItem.next = previousItem.next.next;
};

export const at: At = <E extends unknown>(list: LinkedList<E>, key: number) => {
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
